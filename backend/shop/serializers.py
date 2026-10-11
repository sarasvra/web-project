from rest_framework import serializers
from .models import Product, Category, Favorite, Cart, CartItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "category",
            "image",
            "stock",
            "discount",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]

class FavoriteSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_slug = serializers.SlugRelatedField(
        source="product",
        slug_field="slug",
        queryset=Product.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Favorite
        fields = ["id", "product", "product_slug", "created_at"]
        read_only_fields = ["id", "created_at"]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        source="product",
        queryset=Product.objects.all(),
        write_only=True,
    )

    class Meta:
        model = CartItem
        fields = ["product", "product_id", "quantity"]
        read_only_fields = ["product"]

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "تعداد باید حداقل ۱ باشد."
            )
        return value


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items", "updated_at"]
        read_only_fields = ["id", "items", "updated_at"]