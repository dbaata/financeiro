import Image from "next/image";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-bg-shape auth-bg-shape-left" />
      <div className="auth-bg-shape auth-bg-shape-right" />
      <section className="auth-box">
        <div className="auth-brand">
          <Image
            className="auth-hero"
            src="/images/login-finance.png"
            alt="Dashboard financeiro com graficos de investimento"
            width={540}
            height={338}
            priority
            unoptimized
          />
          <div>
            <p className="auth-kicker">Gestao financeira</p>
            <h1>Financeiro</h1>
          </div>
        </div>
        <LoginForm />
        <div className="auth-secure">
          <span />
          <strong>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 3 5 6v5c0 4.5 2.9 8.7 7 10 4.1-1.3 7-5.5 7-10V6l-7-3Z" />
              <path d="m9.5 12 1.8 1.8 3.7-4" />
            </svg>
            Acesso seguro
          </strong>
          <span />
        </div>
      </section>
    </main>
  );
}
