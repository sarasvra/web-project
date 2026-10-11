import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="ایجاد حساب کاربری">
      <RegisterForm />
    </AuthLayout>
  );
}