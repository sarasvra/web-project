from django.urls import path

from .views import (
    ProductListView,
    ProductDetailView,
    CategoryListView,
    CategoryDetailView,
    FavoriteListCreateView,
    FavoriteDeleteView,
    CartView,
)

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("categories/<slug:slug>/", CategoryDetailView.as_view(), name="category-detail"),
    path(
        "favorites/",
        FavoriteListCreateView.as_view(),
        name="favorite-list-create",
    ),
    path(
        "favorites/<slug:slug>/",
        FavoriteDeleteView.as_view(),
        name="favorite-delete",
    ),
    path(
        "cart/",
        CartView.as_view(),
        name="cart",
    ),
]