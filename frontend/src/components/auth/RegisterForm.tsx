"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  validateconfirmPassword,
  validatename,
  validatePassword,
  validatePhone,
} from "@/utils/validation";
import { registerUser } from "@/lib/api/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const router = useRouter();

  useEffect(() => {
    if (!success) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [success]);

  useEffect(() => {
    if (success && countdown <= 0) {
      router.push("/login");
    }
  }, [success, countdown, router]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const Pherr = validatePhone(phone);
    const Nerr = validatename(name);
    const Perr = validatePassword(password);
    const perr2 = validateconfirmPassword(password, confirmPassword);

    setNameError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setServerError(false);
    setSuccess(false);

    if (Nerr) {
      setNameError(Nerr);
      return;
    }
    if (Pherr) {
      setPhoneError(Pherr);
      return;
    }
    if (Perr) {
      setPasswordError(Perr);
      return;
    }
    if (perr2) {
      setConfirmPasswordError(perr2);
      return;
    }

    try {
      const result = await registerUser({
        name,
        phone,
        password,
        confirm_password: confirmPassword,
      });

      if (!result.ok) {
        const { fieldErrors } = result;

        if (fieldErrors.name) {
          setNameError(fieldErrors.name[0]);
          return;
        }
        if (fieldErrors.phone) {
          setPhoneError(fieldErrors.phone[0]);
          return;
        }
        if (fieldErrors.password) {
          setPasswordError(fieldErrors.password[0]);
          return;
        }
        if (fieldErrors.confirm_password) {
          setConfirmPasswordError(fieldErrors.confirm_password[0]);
          return;
        }
        if (fieldErrors.detail) {
          setServerError(true);
          return;
        }
        return;
      }

      setCountdown(2);
      setSuccess(true);
    } catch (error) {
      console.error("خطا در اتصال به سرور:", error);
      setServerError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        {serverError && (
          <div className="text-center mb-5 rounded-2xl border border-red-300 bg-red-200 px-4 py-3 text-sm text-red-600">
            ثبت نام انجام نشد لطفا دوباره تلاش کنید.
          </div>
        )}
        {success && (
          <div className="text-center mb-5 rounded-2xl border border-green-300 bg-green-200 px-4 py-3 text-sm text-green-600">
            ثبت نام با موفقیت انجام شد.
          </div>
        )}

        <label
          htmlFor="name"
          className="mb-2 block text-base font-medium text-gray-700"
        >
          نام و نام خانوادگی
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError("");
          }}
          placeholder="نام و نام خانوادگی"
          className={`w-full rounded-xl border px-4 py-3 text-right outline-none transition focus:ring-2 ${
            nameError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {nameError && <p className="mt-2 text-sm text-red-500">{nameError}</p>}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-base font-medium text-gray-700"
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
          className="mb-2 block text-base font-medium text-gray-700"
        >
          رمز عبور
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setPasswordError("");
          }}
          className={`w-full rounded-xl border px-4 py-3 text-right outline-none transition focus:ring-2 ${
            passwordError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {passwordError && (
          <p className="mt-2 text-sm text-red-500">{passwordError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-base font-medium text-gray-700"
        >
          تکرار رمز عبور
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setConfirmPasswordError("");
          }}
          className={`w-full rounded-xl border px-4 py-3 text-right outline-none transition focus:ring-2 ${
            confirmPasswordError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {confirmPasswordError && (
          <p className="mt-2 text-sm text-red-500">{confirmPasswordError}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-4xl bg-blue-600 py-3 font-medium text-md text-white transition hover:bg-blue-700"
      >
        ثبت نام
      </button>

      <p className="mt-1 text-center text-sm text-gray-600">
        حساب کاربری دارید؟{" "}
        <button
          type="button"
          onClick={() => router.replace("/login")}
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          ورود
        </button>
      </p>
    </form>
  );
}