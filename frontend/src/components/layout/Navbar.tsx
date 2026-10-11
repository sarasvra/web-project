"use client";

import Image from "next/image";
import Link from "next/link";

import { Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  Package,
  MapPin,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import { useCart } from "@/context/CartContext";

export default function Navbar() {
  console.log("NAVBAR MOUNTED");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
 
  const { user, isLoading, logout } = useAuth();
  const { totalItems, isInitialized } = useCart();

   const cartBadge = isInitialized && totalItems > 0? totalItems.toLocaleString("fa-IR") : undefined;

console.log("NAVBAR AUTH:", {
  user,
  isLoading,
});

  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname.startsWith(href);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateOverflow = () => {
      if (window.innerWidth < 768 && isMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    updateOverflow();

    window.addEventListener("resize", updateOverflow);

    return () => {
      window.removeEventListener("resize", updateOverflow);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header dir="rtl" className="relative z-[500] w-full bg-[#E3E4FA] shadow-[0_6px_24px_rgba(48,48,48,0.07)] backdrop-blur-xl">
      <nav>
        {/* ================= Desktop ================= */}
        <div className="mx-auto hidden h-[76px] max-w-[1500px] items-center gap-6 px-6 lg:flex xl:px-10">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="relative flex h-11 items-center justify-center overflow-hidden rounded-[14px] shadow-[0_4px_14px_rgba(48,48,48,0.08)] ring-1 ring-[#E5E2DF] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_7px_20px_rgba(48,48,48,0.12)]">
              <Image src="/images/logo.png" alt="Nell clayArt" width={44} height={44} className="h-full w-full object-contain" priority />
            </div>

            <div className="hidden leading-none xl:block">
              <span className="block text-[18px] font-extrabold tracking-[-0.03em] text-[#303030]">
                Nell clayArt
              </span>

              <span className="mt-1.5 block text-[9px] font-medium tracking-wide text-[#777777]">
                     هنر دست ، برای خونه تو
              </span>
            </div>
          </Link>

          <div className="flex flex-1 items-center justify-center gap-1">
            <DesktopNavLink href="/" active={isActive("/")}>
              خانه
            </DesktopNavLink>

            <DesktopNavLink href="/products" active={isActive("/products") || isActive("/product")}>
              محصولات
            </DesktopNavLink>

            <DesktopNavLink href="/categories" active={isActive("/categories")}>
              دسته‌بندی‌ها
            </DesktopNavLink>

            <DesktopNavLink href="/about" active={isActive("/about")}>
              درباره ما
            </DesktopNavLink>
          </div>

         
          <Suspense fallback={<div className="h-11 w-[220px] shrink-0 xl:w-[260px]" />}>
            <SearchBox />
          </Suspense>


          <div className="flex shrink-0 items-center gap-1">
            {!isLoading && (
              <HeaderIconLink href="/favorites" label="علاقه‌مندی‌ها" active={isActive("/favorites")}>
                <Heart size={19} strokeWidth={1.8} />
              </HeaderIconLink>
            )}

            <HeaderIconLink href="/cart" label="سبد خرید" badge={cartBadge} active={isActive("/cart")}>
              <ShoppingBag size={19} strokeWidth={1.8} />
            </HeaderIconLink>

            {isLoading ? (
              <div className="mr-1 h-10 w-10" />
            ) : user ? (
              <UserMenu user={user} isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} onLogout={handleLogout} />
            ) : (
              <Link href="/login" className="mr-1 flex h-10 items-center gap-2 rounded-full bg-[#8FB8C7] px-4 text-xs font-bold text-white shadow-[0_4px_14px_rgba(184,107,125,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6F9EAF] hover:shadow-[0_6px_18px_rgba(184,107,125,0.24)]">
                <UserRound size={16} strokeWidth={1.9} />
                <span>ورود / ثبت‌نام</span>
              </Link>
            )}
          </div>
        </div>

        {/* ================= Mobile ================= */}
        <div className="lg:hidden">
          <div className="flex h-[64px] items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setIsMenuOpen((prev) => !prev)} className="flex h-10 w-10 items-center justify-center rounded-full text-[#555555] transition-all duration-200 hover:bg-[#EDEDE9] hover:text-[#5B7C8D]" aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"} aria-expanded={isMenuOpen}>
                {isMenuOpen ? <X size={23} strokeWidth={1.8} /> : <Menu size={23} strokeWidth={1.8} />}
              </button>

              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[12px] shadow-sm ring-1 ring-[#E5E2DF]">
                  <Image src="/images/logo.png" alt="Nell clayArt" width={36} height={36} className="h-full w-full object-contain" />
                </div>

                <span className="text-[17px] font-extrabold tracking-[-0.03em] text-[#303030]">
                  Nell clayArt
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-0.5">
              {!isLoading && (
                <HeaderIconLink href="/favorites" label="علاقه‌مندی‌ها" active={isActive("/favorites")} mobile>
                  <Heart size={19} strokeWidth={1.8} />
                </HeaderIconLink>
              )}

              <HeaderIconLink href="/cart" label="سبد خرید" badge={cartBadge} active={isActive("/cart")} mobile>
                <ShoppingBag size={19} strokeWidth={1.8} />
              </HeaderIconLink>
            </div>
          </div>

          
          <Suspense fallback={<div className="px-4 pb-3"><div className="h-11 w-full rounded-full bg-white/70" /></div>}>
            <SearchBox mobile onSearchDone={closeMenu} />
          </Suspense>

         
          <div className={`${isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"} fixed inset-0 z-[200000000000] flex flex-col bg-[#F8F8F6] transition-transform duration-300 ease-out`} style={{ height: "100dvh" }} role="dialog" aria-modal="true">
           
            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#E5E2DF] bg-[#E3E4FA] px-4">
              <button type="button" onClick={closeMenu} aria-label="بستن منو" className="flex h-10 w-10 items-center justify-center rounded-full text-[#555555] transition-all duration-200 hover:bg-white/60 hover:text-[#5B7C8D]">
                <X size={23} strokeWidth={1.8} />
              </button>

              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[12px] shadow-sm ring-1 ring-[#E5E2DF]">
                  <Image src="/images/logo.png" alt="Nell clayArt" width={36} height={36} className="h-full w-full object-contain" />
                </div>

                <span className="text-[16px] font-extrabold tracking-[-0.03em] text-[#303030]">
                  Nell clayArt
                </span>
              </Link>

              <div className="h-10 w-10" />
            </div>

            
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {user && (
                <div className="mb-3 rounded-[18px] border border-[#E5E2DF] bg-white p-3 shadow-[0_5px_18px_rgba(48,48,48,0.05)]">
                  <Link href="/profile" onClick={closeMenu} className="flex items-center gap-3">
                    <UserAvatar user={user} size="large" />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#303030]">
                        {user.name}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-[#777777]">
                        مشاهده حساب کاربری
                      </p>
                    </div>

                    <ChevronDown size={17} className="rotate-90 text-[#5B7C8D]" />
                  </Link>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <MobileLink href="/" active={isActive("/")} onClick={closeMenu}>خانه</MobileLink>
                <MobileLink href="/products" active={isActive("/products") || isActive("/product")} onClick={closeMenu}>محصولات</MobileLink>
                <MobileLink href="/categories" active={isActive("/categories")} onClick={closeMenu}>دسته‌بندی‌ها</MobileLink>
                <MobileLink href="/about" active={isActive("/about")} onClick={closeMenu}>درباره ما</MobileLink>

                {!isLoading && user && (
                  <>
                    <div className="my-3 h-px bg-[#E5E2DF]" />

                    <AccountLink href="/profile" icon={<User size={17} />}>پروفایل</AccountLink>
                    <AccountLink href="/orders" icon={<Package size={17} />}>سفارش‌های من</AccountLink>
                    <AccountLink href="/addresses" icon={<MapPin size={17} />}>آدرس‌های من</AccountLink>
                    <AccountLink href="/favorites" icon={<Heart size={17} />}>علاقه‌مندی‌ها</AccountLink>

                    <button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center justify-center gap-2 rounded-[14px] border border-[#E5E2DF] bg-white px-4 py-3.5 text-sm font-semibold text-[#777777] transition-all duration-200 hover:border-[#E8CDD3] hover:bg-[#FBF3F5] hover:text-[#8FB8C7]">
                      <LogOut size={17} />
                      خروج از حساب
                    </button>
                  </>
                )}

                {!isLoading && !user && (
                  <>
                    <div className="my-3 h-px bg-[#E5E2DF]" />

                    <Link href="/login" onClick={closeMenu} className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#8FB8C7] px-4 py-3.5 text-sm font-bold text-white shadow-[0_6px_18px_rgba(184,107,125,0.18)] transition-all duration-200 hover:bg-[#6F9EAF]">
                      <UserRound size={17} strokeWidth={1.9} />
                      ورود / ثبت‌نام
                    </Link>
                  </>
                )}

                {isLoading && <div className="mt-4 h-12" />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function SearchBox({ mobile = false, onSearchDone }: { mobile?: boolean; onSearchDone?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSearch = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      router.push("/products");
      onSearchDone?.();
      return;
    }

    router.push(`/products?search=${encodeURIComponent(value)}`);
    onSearchDone?.();
  };

  return (
    <form onSubmit={handleSearch} className={mobile ? "w-full px-4 pb-3" : "w-[220px] shrink-0 xl:w-[260px]"}>
      <div className="group flex h-11 w-full items-center rounded-full border border-[#E5E2DF] bg-white px-4 shadow-[0_3px_12px_rgba(48,48,48,0.05)] transition-all duration-200 focus-within:border-[#5B7C8D] focus-within:ring-4 focus-within:ring-[#5B7C8D]/10">
        <button type="submit" aria-label="جستجو" className="ml-2 shrink-0 text-[#5B7C8D]">
          <Search size={18} strokeWidth={1.8} className="transition-transform duration-200 group-focus-within:scale-105" />
        </button>

        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="جستجوی محصولات..." className="w-full bg-transparent text-xs text-[#303030] outline-none placeholder:text-[#999999]" />
      </div>
    </form>
  );
}

function DesktopNavLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link href={href} className={`relative rounded-xl px-4 py-2.5 text-[13px] transition-all duration-200 ${active ? "font-bold text-[#8FB8C7]" : "font-medium text-[#555555] hover:bg-[#EDEDE9] hover:text-[#8FB8C7]"}`}>
      {children}

      {active && (
        <span className="absolute bottom-0 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#8FB8C7]" />
      )}
    </Link>
  );
}

function HeaderIconLink({ href, label, badge, mobile = false, active = false, children }: { href: string; label: string; badge?: string; mobile?: boolean; active?: boolean; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${active ? "bg-[#F3ECFA] text-[#7C3AED]" : "text-[#555555] hover:bg-[#EDEDE9] hover:text-[#8FB8C7]"} ${mobile ? "h-10 w-10" : ""}`}>
      {children}

      {badge && (
        <span className="absolute right-0 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border-2 border-[#F5F5F3] bg-[#C9825B] px-1 text-[8px] font-extrabold leading-none text-white shadow-sm">
          {badge}
        </span>
      )}
    </Link>
  );
}

function UserMenu({ user, isOpen, setIsOpen, onLogout }: { user: { name: string; phone: string }; isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; onLogout: () => Promise<void> }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside, true);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
    };
  }, [setIsOpen]);

  return (
    <div ref={menuRef} className="relative mr-1">
      <button type="button" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen} aria-haspopup="menu" className={`flex h-10 items-center gap-2 rounded-full border bg-white px-2 pr-2.5 shadow-sm transition-all duration-200 ${isOpen ? "border-[#D9E6EB] shadow-[0_6px_18px_rgba(48,48,48,0.12)]" : "border-[#E5E2DF] hover:border-[#D9E6EB] hover:shadow-[0_5px_16px_rgba(48,48,48,0.09)]"}`}>
        <UserAvatar user={user} />

        <div className="hidden max-w-[95px] text-right xl:block">
          <p className="truncate text-[11px] font-bold text-[#303030]">
            {user.name}
          </p>
        </div>

        <ChevronDown size={14} strokeWidth={2} className={`text-[#5B7C8D] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute left-0 top-full z-[100000] mt-3 w-[285px] overflow-hidden rounded-[20px] border border-[#E5E2DF] bg-white p-2 shadow-[0_20px_55px_rgba(48,48,48,0.14)]">
          <div className="rounded-[15px] bg-gradient-to-l from-[#D9E6EB] via-[#F8F7F4] to-[#F0D8C9] p-3">
            <div className="flex items-center gap-3">
              <UserAvatar user={user} size="large" />

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#303030]">
                  {user.name}
                </p>

                {user.phone && (
                  <p className="mt-1 text-[10px] text-[#777777]">
                    {user.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="my-2 h-px bg-[#E5E2DF]" />

          <UserDropdownLink href="/profile" icon={<User size={17} />}>
            پروفایل من
          </UserDropdownLink>

          <UserDropdownLink href="/orders" icon={<Package size={17} />}>
            سفارش‌های من
          </UserDropdownLink>

          <UserDropdownLink href="/favorites" icon={<Heart size={17} />}>
            علاقه‌مندی‌ها
          </UserDropdownLink>

          <UserDropdownLink href="/addresses" icon={<MapPin size={17} />}>
            آدرس‌های من
          </UserDropdownLink>

          <div className="my-2 h-px bg-[#E5E2DF]" />

          <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#8FB8C7] transition-all duration-200 hover:bg-[#FBF3F5] hover:text-[#6F9EAF]">
            <LogOut size={17} />
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  );
}

function UserAvatar({ user, size = "small" }: { user: { name: string; phone?: string }; size?: "small" | "large" }) {
  const isLarge = size === "large";
  const firstLetter = user.name?.trim()?.charAt(0) || "؟";

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9E6EB] font-bold text-[#5B7C8D] ring-1 ring-[#C9DCE2] ${isLarge ? "h-11 w-11 text-sm" : "h-7 w-7 text-[10px]"}`}>
      {firstLetter}
    </div>
  );
}

function MobileLink({ href, active, onClick, children }: { href: string; active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className={`relative flex items-center rounded-[14px] px-4 py-3.5 text-sm transition-all duration-200 ${active ? "bg-[#F0D8C9] font-bold text-[#C9825B]" : "font-medium text-[#555555] hover:bg-white hover:text-[#8FB8C7]"}`}>
      {active && (
        <span className="absolute right-1.5 h-5 w-[3px] rounded-full bg-[#C9825B]" />
      )}

      {children}
    </Link>
  );
}

function AccountLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-center gap-2 rounded-[13px] border border-[#E5E2DF] bg-white py-3 text-xs font-semibold text-[#777777] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D9E6EB] hover:bg-[#FAFAF9] hover:text-[#5B7C8D]">
      {icon}
      {children}
    </Link>
  );
}

function UserDropdownLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link href={href} role="menuitem" className="group flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#777777] transition-all duration-200 hover:bg-[#FAFAF9] hover:text-[#8FB8C7]">
      <span className="text-[#5B7C8D] transition-all duration-200 group-hover:scale-105 group-hover:text-[#8FB8C7]">
        {icon}
      </span>

      {children}
    </Link>
  );
}