import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-box">
        <h1>Entrar</h1>
        <p className="muted">Acesse sua area financeira privada.</p>
        <LoginForm />
      </section>
    </main>
  );
}
