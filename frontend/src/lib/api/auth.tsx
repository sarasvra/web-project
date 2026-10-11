const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type RegisterPayload = {
  name: string;
  phone: string;
  password: string;
  confirm_password: string;
};

export type RegisterFieldErrors = {
  name?: string[];
  phone?: string[];
  password?: string[];
  confirm_password?: string[];
  detail?: string;
};

export type RegisterResult =
  | { ok: true }
  | { ok: false; fieldErrors: RegisterFieldErrors };

export type LoginPayload = {
  phone: string;
  password: string;
};

export type LoginFieldErrors = {
  phone?: string[];
  detail?: string;
};

export type LoginResult =
  | { ok: true }
  | { ok: false; fieldErrors: LoginFieldErrors };

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResult> {
  const response = await fetch(`${API_URL}/api/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    return { ok: false, fieldErrors: data };
  }

  return { ok: true };
}

export async function loginUser(payload: LoginPayload): Promise<LoginResult> {
  const response = await fetch(`${API_URL}/api/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    return { ok: false, fieldErrors: data };
  }

  return { ok: true };
}