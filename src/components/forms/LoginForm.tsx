"use client";

import { useActionState } from "react";
import { authenticate } from "@/modules/auth/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ActionState } from "@/types/common";

const initialState: ActionState = { ok: true };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(authenticate, initialState);

  return (
    <form className="form" action={formAction}>
      <Input label="Usuario" name="login" autoComplete="username" required />
      <Input label="Senha" name="password" type="password" autoComplete="current-password" required />
      {!state.ok && <p className="error">{state.message}</p>}
      <Button type="submit" disabled={pending}>
        Entrar
      </Button>
    </form>
  );
}
