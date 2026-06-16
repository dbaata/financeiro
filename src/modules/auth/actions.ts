"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import type { ActionState } from "@/types/common";

export async function authenticate(_state: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await signIn("credentials", {
      login: formData.get("login"),
      password: formData.get("password"),
      redirectTo: "/dashboard"
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, message: "Usuario ou senha invalidos." };
    }
    throw error;
  }
}
