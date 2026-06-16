import { formatCurrency, referenceMonthInput, toReferenceMonth } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const referenceMonth = toReferenceMonth(referenceMonthInput());
  const [accounts, investments] = await Promise.all([
    prisma.payableAccount.findMany({ where: { deletedAt: null, referenceMonth } }),
    prisma.investment.findMany({ where: { deletedAt: null, status: "ACTIVE" } })
  ]);
  const total = accounts.reduce((sum, item) => sum + Number(item.amount), 0);
  const paid = accounts.filter((item) => item.paid).reduce((sum, item) => sum + Number(item.amount), 0);
  const pending = total - paid;
  const invested = investments.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <>
      <div className="header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Resumo do mes atual e investimentos ativos.</p>
        </div>
      </div>
      <section className="grid grid-4">
        <div className="card"><strong>{formatCurrency(total)}</strong><p className="muted">Contas do mes</p></div>
        <div className="card"><strong>{formatCurrency(paid)}</strong><p className="muted">Total pago</p></div>
        <div className="card"><strong>{formatCurrency(pending)}</strong><p className="muted">Total pendente</p></div>
        <div className="card"><strong>{accounts.filter((item) => !item.paid).length}</strong><p className="muted">Contas pendentes</p></div>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Investimentos</h2>
        <p className="muted">Resumo simples dos investimentos ativos.</p>
        <div className="grid grid-2">
          <div className="card"><strong>{investments.length}</strong><p className="muted">Aplicacoes ativas</p></div>
          <div className="card"><strong>{formatCurrency(invested)}</strong><p className="muted">Valor aplicado</p></div>
        </div>
      </section>
    </>
  );
}
