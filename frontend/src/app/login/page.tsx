import LoginForm from "@/components/auth/LginForm";
import AuthLayout from "@/components/layout/AuthLayout";




export default function LoginPage() {
  return (
       <AuthLayout  title="خوش آمدید">
            <LoginForm />
        </AuthLayout>
  );
}