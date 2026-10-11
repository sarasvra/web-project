"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validatePhone } from "@/utils/validation";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/api/auth";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPhoneError("");
    setLoginError(false);

    const err = validatePhone(phone);

    if (err) {
      setPhoneError(err);
      return;
    }

    try {
      const result = await loginUser({ phone, password });

      if (!result.ok) {
        const { fieldErrors } = result;

        if (fieldErrors.phone) {
          setPhoneError(fieldErrors.phone[0]);
          return;
        }
        if (fieldErrors.detail) {
          setLoginError(true);
          return;
        }
        return;
      }

      await refreshUser();
      router.push("/");
    } catch (error) {
      console.error("خطا در اتصال به سرور:", error);
      setLoginError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {loginError && (
        <div className="text-center mb-5 rounded-2xl border border-red-300 bg-red-200 px-4 py-3 text-sm text-red-600">
          شماره تلفن یا رمز عبور صحیح نیست.
        </div>
      )}

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block font-medium text-gray-700"
        >
          شماره موبایل
        </label>

        <input
          id="phone"
          type="tel"
          dir="rtl"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            setPhoneError("");
            setLoginError(false);
          }}
          placeholder=" 09123456789"
          className={`w-full rounded-xl border px-4 py-3 text-right outline-none transition focus:ring-2 ${
            phoneError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {phoneError && <p className="mt-2 text-sm text-red-500">{phoneError}</p>}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-medium text-gray-700"
        >
          رمز عبور
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setLoginError(false);
          }}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-4xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-900"
      >
        ورود
      </button>

      <div className="text-center">
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
          فراموشی رمز عبور؟
        </a>
      </div>

      <p className="mt-5 text-center text-sm text-gray-600">
        حساب کاربری ندارید؟{" "}
        <button
          type="button"
          onClick={() => router.replace("/register")}
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          ثبت‌نام
        </button>
      </p>
    </form>
  );
}