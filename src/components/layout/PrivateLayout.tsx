import Link from "next/link";
import { signOut } from "@/lib/auth";

export function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <strong>Financeiro</strong>
        <nav>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/usuarios">Usuarios</Link>
          <Link href="/despesas">Despesas</Link>
          <Link href="/contas-pagar">Contas a pagar</Link>
          <Link href="/investimentos">Investimentos</Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button type="submit">Sair</button>
          </form>
        </nav>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
