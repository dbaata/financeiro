"use client";

import { useActionState, useState } from "react";
import { authenticate } from "@/modules/auth/actions";
import { Button } from "@/components/ui/Button";
import type { ActionState } from "@/types/common";

const initialState: ActionState = { ok: true };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(authenticate, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="form login-form" action={formAction}>
      <div className="login-field">
        <label className="sr-only" htmlFor="login">
          Usuario
        </label>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <input id="login" name="login" autoComplete="username" placeholder="Usuario" required />
      </div>
      <div className="login-field">
        <label className="sr-only" htmlFor="password">
          Senha
        </label>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Senha"
          required
        />
        <button
          className="login-icon-button"
          type="button"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          onClick={() => setShowPassword((current) => !current)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M2.1 12s3.6-6 9.9-6 9.9 6 9.9 6-3.6 6-9.9 6-9.9-6-9.9-6Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>
      <a className="forgot-link" href="/login">
        Esqueci a senha
      </a>
      {!state.ok && <p className="error">{state.message}</p>}
      <Button className="login-submit" type="submit" disabled={pending}>
        {pending ? "Entrando..." : "Iniciar sessao"}
      </Button>
    </form>
  );
}
