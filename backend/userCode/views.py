from django.db import IntegrityError
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.throttling import ScopedRateThrottle
from django.utils import timezone
from .serializers import RegisterSerializer , LoginSerializer
from .authentication import CookieJWTAuthentication



class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)

        except serializers.ValidationError as error:
            detail = error.detail

            for field, errors in detail.items():
                for validation_error in errors:
                    code = getattr(validation_error, "code", None)

                    if code == "custom_validation":
                        return Response(
                            {field: [str(validation_error)]},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

            return Response(
                {"detail": "ثبت‌نام انجام نشد."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            self.perform_create(serializer)

        except IntegrityError:
            return Response(
                {"detail": "ثبت‌نام انجام نشد."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception:
            return Response(
                {"detail": "ثبت‌نام انجام نشد."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )




class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)

        except serializers.ValidationError as error:
            detail = error.detail

            for field, errors in detail.items():
                for validation_error in errors:
                    code = getattr(validation_error, "code", None)

                    if code == "custom_validation":
                        return Response(
                            {field: [str(validation_error)]},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

            return Response(
                {"detail": "ورود انجام نشد."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.validated_data["user"]
       
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        

        response = Response(
            {
                "name": user.name,
                "phone": user.phone,
            },
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="access_token",
            value=str(access),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 15,
            path="/",
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 7,
            
            path="/",
        )

        return response




class RefreshView(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "ورود انجام نشده است."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)
            access = refresh.access_token

            response = Response(
                {"detail": "توکن با موفقیت تازه شد."},
                status=status.HTTP_200_OK,
            )

            response.set_cookie(
                key="access_token",
                value=str(access),
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=60 * 15,
                path="/",
            )

            return response

        except TokenError:
            return Response(
                {"detail": "ورود انجام نشده است."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
class ProfileView(generics.GenericAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "id": request.user.pk,
                "name": request.user.name,
                "phone": request.user.phone,
            },
            status=status.HTTP_200_OK,
        )

class LogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        response = Response(
            {"detail": "با موفقیت خارج شدید."},
            status=status.HTTP_200_OK,
        )

        response.delete_cookie("access_token", path="/")
        response.delete_cookie("refresh_token", path="/")

        return response