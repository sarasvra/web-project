"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/context/AuthContext";
import { getCart, saveCart } from "@/lib/api/cart";
import type { Product } from "@/types/product";

let cartRequest: ReturnType<typeof getCart> | null = null;

function getCartOnce() {
  if (!cartRequest) {
    cartRequest = getCart().finally(() => {
      cartRequest = null;
    });
  }
  return cartRequest;
}

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isInitialized: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = "nell-cart:guest";
const USER_CART_PREFIX = "nell-cart:user:";
const SAVE_DELAY = 1000;

const getUserCartKey = (userId: number) => `${USER_CART_PREFIX}${userId}`;
const getDirtyKey = (cartKey: string) => `${cartKey}:dirty`;

function isValidItem(item: unknown): item is CartItem {
  const i = item as CartItem;

  return (
    !!i &&
    typeof i.quantity === "number" &&
    i.quantity > 0 &&
    !!i.product &&
    typeof i.product.id === "number" &&
    typeof i.product.slug === "string" &&
    typeof i.product.price === "number" &&
    typeof i.product.stock === "number"
  );
}

function readCart(key: string): CartItem[] {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : [];
  } catch (error) {
    console.error("خطا در خواندن سبد خرید:", error);
    try {
      localStorage.removeItem(key);
    } catch {}
    return [];
  }
}

function writeCart(key: string, items: CartItem[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error("خطا در ذخیره سبد خرید:", error);
  }
}

function isCartDirty(key: string) {
  try {
    return localStorage.getItem(getDirtyKey(key)) === "1";
  } catch {
    return false;
  }
}

function setCartDirty(key: string, value: boolean) {
  try {
    if (value) {
      localStorage.setItem(getDirtyKey(key), "1");
    } else {
      localStorage.removeItem(getDirtyKey(key));
    }
  } catch (error) {
    console.error("خطا در وضعیت همگام‌سازی سبد خرید:", error);
  }
}

function cartToPayload(items: CartItem[]) {
  return items.map((item) => ({
    product_id: item.product.id,
    quantity: item.quantity,
  }));
}

function mergeGuestCart(
  baseItems: CartItem[],
  guestItems: CartItem[]
): CartItem[] {
  const map = new Map<number, CartItem>();

  for (const item of baseItems) {
    map.set(item.product.id, item);
  }

  for (const guestItem of guestItems) {
    const existing = map.get(guestItem.product.id);

    if (!existing) {
      map.set(guestItem.product.id, {
        product: guestItem.product,
        quantity: Math.min(guestItem.quantity, guestItem.product.stock),
      });
      continue;
    }

    map.set(guestItem.product.id, {
      product: existing.product,
      quantity: Math.min(
        Math.max(existing.quantity, guestItem.quantity),
        existing.product.stock
      ),
    });
  }

  return Array.from(map.values()).filter(
    (item) => item.quantity > 0 && item.product.stock > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedRef = useRef<string | null>(null);
  const hydratedKeyRef = useRef<string | null>(null);

  const userId = user?.id ?? null;
  const storageKey = userId !== null ? getUserCartKey(userId) : GUEST_CART_KEY;

  const clearSaveTimer = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
  };

  useEffect(() => {
  if (isLoading) return;

  let cancelled = false;

  const hydrateCart = async () => {
    hydratedKeyRef.current = null;
    lastSyncedRef.current = null;
    setIsInitialized(false);

    const localItems = readCart(storageKey);

    if (userId === null) {
      if (cancelled) return;
      setItems(localItems);
      hydratedKeyRef.current = storageKey;
      setIsInitialized(true);
      return;
    }

    try {
      const serverCart = await getCartOnce();
      if (cancelled) return;

      const serverItems: CartItem[] = serverCart.items
        .map((item) => ({ product: item.product, quantity: item.quantity }))
        .filter(isValidItem);

      const localIsDirty = isCartDirty(storageKey);
      const guestItems = readCart(GUEST_CART_KEY);

      
      const hasGuestItems = guestItems.length > 0;

      let finalItems = localIsDirty ? localItems : serverItems;
      if (hasGuestItems) {
        finalItems = mergeGuestCart(finalItems, guestItems);
      }

      const payload = JSON.stringify(cartToPayload(finalItems));
      const needsPush = localIsDirty || hasGuestItems;

      lastSyncedRef.current = payload;

      writeCart(storageKey, finalItems);
      setItems(finalItems);
      hydratedKeyRef.current = storageKey;
      setIsInitialized(true);

      if (needsPush) {
        try {
          await saveCart(cartToPayload(finalItems));
          setCartDirty(storageKey, false);
          if (hasGuestItems) localStorage.removeItem(GUEST_CART_KEY);
        } catch (error) {
          console.error("خطا در همگام‌سازی سبد خرید:", error);
          setCartDirty(storageKey, true); 
        }
      } else {
        setCartDirty(storageKey, false);
      }
    } catch (error) {
      console.error("خطا در دریافت سبد خرید از سرور:", error);
      if (cancelled) return;

      lastSyncedRef.current = JSON.stringify(cartToPayload(localItems));
      setItems(localItems);
      hydratedKeyRef.current = storageKey;
      setIsInitialized(true);
    }
  };

  hydrateCart();

  return () => {
    cancelled = true;
    clearSaveTimer();
  };
}, [isLoading, userId, storageKey]);
  
  useEffect(() => {
    if (!isInitialized || hydratedKeyRef.current !== storageKey) return;

    writeCart(storageKey, items);
  }, [items, isInitialized, storageKey]);


  
  useEffect(() => {
  if (
    !isInitialized ||
    userId === null ||
    hydratedKeyRef.current !== storageKey
  ) {
    return;
  }

  const payload = JSON.stringify(cartToPayload(items));

  
  if (payload === lastSyncedRef.current) return;

  clearSaveTimer();

  saveTimeoutRef.current = setTimeout(async () => {
    try {
      await saveCart(JSON.parse(payload));
      lastSyncedRef.current = payload;
      setCartDirty(storageKey, false);
    } catch (error) {
      console.error("خطا در ذخیره سبد خرید:", error);
      setCartDirty(storageKey, true);
    }
  }, SAVE_DELAY);

  return clearSaveTimer;
}, [items, isInitialized, userId, storageKey]);

  const markDirty = useCallback(() => {
    if (userId !== null) setCartDirty(storageKey, true);
  }, [userId, storageKey]);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      if (product.stock <= 0) return;

      markDirty();

      setItems((current) => {
        const existing = current.find(
          (item) => item.product.slug === product.slug
        );

        if (existing) {
          return current.map((item) =>
            item.product.slug === product.slug
              ? {
                  ...item,
                  product,
                  quantity: Math.min(item.quantity + quantity, product.stock),
                }
              : item
          );
        }

        return [
          ...current,
          { product, quantity: Math.min(quantity, product.stock) },
        ];
      });
    },
    [markDirty]
  );

  const removeFromCart = useCallback(
    (slug: string) => {
      markDirty();
      setItems((current) =>
        current.filter((item) => item.product.slug !== slug)
      );
    },
    [markDirty]
  );

  const updateQuantity = useCallback(
    (slug: string, quantity: number) => {
      markDirty();
      setItems((current) =>
        current.map((item) =>
          item.product.slug === slug
            ? {
                ...item,
                quantity: Math.max(1, Math.min(quantity, item.product.stock)),
              }
            : item
        )
      );
    },
    [markDirty]
  );

  const clearCart = useCallback(() => {
    markDirty();
    setItems([]);
  }, [markDirty]);

  const { totalItems, totalPrice } = useMemo(() => {
    let count = 0;
    let price = 0;

    for (const { product, quantity } of items) {
      const unitPrice =
        product.discount > 0
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price;

      count += quantity;
      price += unitPrice * quantity;
    }

    return { totalItems: count, totalPrice: price };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      isInitialized,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      isInitialized,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart باید داخل CartProvider استفاده شود.");
  }

  return context;
}