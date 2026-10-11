from rest_framework import generics
from .models import Product , Category , Favorite ,  Cart , CartItem
from rest_framework.exceptions import NotFound
from .serializers import ProductSerializer , CategorySerializer , FavoriteSerializer , CartSerializer , CartItemSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from userCode.authentication import CookieJWTAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.views import APIView
from django.db import transaction



class ProductPagination(PageNumberPagination):
    page_size = 12

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    def get_queryset(self):
     latest = (
        self.request.query_params.get("latest", "false").lower()
        == "true"
    )

     category = self.request.query_params.get("category")
     search = self.request.query_params.get("search")

     minimum_price = self.request.query_params.get("minimum_price")
     maximum_price = self.request.query_params.get("maximum_price")

     sort = self.request.query_params.get("sort")

     discounted = (
        self.request.query_params.get("discounted", "false").lower()
        == "true"
    )

     products = Product.objects.all()

     if category:
        products = products.filter(category__slug=category)

     if search:
        products = products.filter(
            Q(name__icontains=search)
            | Q(description__icontains=search)
            | Q(category__name__icontains=search)
        )

     if minimum_price:
        products = products.filter(price__gte=minimum_price)

     if maximum_price:
        products = products.filter(price__lte=maximum_price)

     if discounted:
        products = products.filter(discount__gt=0)

     if sort == "price_asc":
        products = products.order_by("price")

     elif sort == "price_desc":
        products = products.order_by("-price")

     elif sort == "latest":
        products = products.order_by("-created_at")

     elif sort == "name":
        products = products.order_by("name")

     elif latest:
        products = products.order_by("-created_at")

     if latest:
        products = products[: self.pagination_class.page_size * 5]

     return products


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_object(self):
        try:
            return Product.objects.get(slug=self.kwargs["slug"])
        except Product.DoesNotExist:
            raise NotFound("محصول مورد نظر پیدا نشد!")
        
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    pagination_class = ProductPagination

class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = "slug"


class FavoriteListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get_queryset(self):
        return Favorite.objects.filter(
            user=self.request.user
        ).select_related("product")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteDeleteView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def destroy(self, request, *args, **kwargs):
        favorite = get_object_or_404(
            Favorite,
            user=request.user,
            product__slug=kwargs["slug"],
        )

        favorite.delete()

        return Response(
            {"detail": "از علاقه‌مندی‌ها حذف شد."},
            status=status.HTTP_204_NO_CONTENT,
        )

class CartView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def get(self, request):
      cart = self.get_cart(request.user)

      serializer = CartSerializer(
        cart,
        context={"request": request},
    )

      return Response(serializer.data)

    @transaction.atomic
    def put(self, request):
        cart = self.get_cart(request.user)

        items = request.data.get("items")

        if not isinstance(items, list):
            return Response(
                {"detail": "items باید یک لیست باشد."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_items = []
        product_ids = set()

        for item in items:
            if not isinstance(item, dict):
                return Response(
                    {"detail": "فرمت آیتم سبد خرید صحیح نیست."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer = CartItemSerializer(data=item)
            serializer.is_valid(raise_exception=True)

            product = serializer.validated_data["product"]
            quantity = serializer.validated_data["quantity"]

            if product.id in product_ids:
                return Response(
                    {
                        "detail": (
                            f"محصول {product.name} بیشتر از یک بار "
                            "در سبد ارسال شده است."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if quantity > product.stock:
                return Response(
                    {
                        "detail": (
                            f"موجودی {product.name} فقط "
                            f"{product.stock} عدد است."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            product_ids.add(product.id)

            validated_items.append(
                {
                    "product": product,
                    "quantity": quantity,
                }
            )

        if not validated_items:
            cart.items.all().delete()
        else:
            cart.items.exclude(
                product_id__in=product_ids
            ).delete()

            for item in validated_items:
                CartItem.objects.update_or_create(
                    cart=cart,
                    product=item["product"],
                    defaults={
                        "quantity": item["quantity"],
                    },
                )

        serializer = CartSerializer(
          cart,
          context={"request": request},
         )

        return Response(serializer.data)