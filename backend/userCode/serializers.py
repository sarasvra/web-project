from rest_framework import serializers
from .models import User
import re


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["name", "phone", "password", "confirm_password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "نام الزامی است.",
                code="custom_validation"
            )

        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "نام باید حداقل ۲ کاراکتر باشد.",
                code="custom_validation"
            )

        return value.strip()

    def validate_phone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError(
                "شماره موبایل باید فقط شامل اعداد باشد.",
                code="custom_validation"
            )

        if len(value) != 11 or not value.startswith("09"):
            raise serializers.ValidationError(
                "شماره موبایل معتبر نیست.",
                code="custom_validation"
            )

        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                "ثبت‌نام انجام نشد.",
                code="duplicate_phone"
            )

        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "رمز عبور باید حداقل ۸ کاراکتر باشد.",
                code="custom_validation"
            )

        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError(
                "رمز عبور باید حداقل یک حرف کوچک داشته باشد.",
                code="custom_validation"
            )

        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError(
                "رمز عبور باید حداقل یک حرف بزرگ داشته باشد.",
                code="custom_validation"
            )

        if not re.search(r"\d", value):
            raise serializers.ValidationError(
                "رمز عبور باید حداقل یک عدد داشته باشد.",
                code="custom_validation"
            )

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password": serializers.ErrorDetail(
                        "رمز عبور و تکرار آن یکسان نیستند.",
                        code="custom_validation"
                    )
                }
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        return User.objects.create_user(
            phone=validated_data["phone"],
            name=validated_data["name"],
            password=validated_data["password"],
        )



class LoginSerializer(serializers.ModelSerializer):
    phone = serializers.CharField()

    class Meta:
        model = User
        fields = ["phone", "password"]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_phone(self, value):
        if not value or not value.isdigit() or len(value) != 11 or not value.startswith("09"):
            raise serializers.ValidationError(
                "شماره موبایل معتبر نیست.",
                code="custom_validation"
            )

        return value

    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError(
                "رمز را وارد کنید.",
                code="custom_validation"
            )

        return value

    def validate(self, attrs):
        phone = attrs["phone"]
        password = attrs["password"]

        try:
            user = User.objects.get(phone=phone)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "شماره موبایل یا رمز عبور اشتباه است.",
                code="login_failed"
            )

        if not user.check_password(password):
            raise serializers.ValidationError(
                "شماره موبایل یا رمز عبور اشتباه است.",
                code="login_failed"
            )

        attrs["user"] = user

        return attrs
            
    