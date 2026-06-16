import { Button } from "@/components/ui/Button";
import { DuplicateMonthForm } from "@/components/forms/DuplicateMonthForm";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { formatCurrency, formatDate, referenceMonthInput, toReferenceMonth } from "@/lib/format";
import { markPayable, removePayableAccount, upsertPayableAccount } from "@/modules/contas-pagar/actions";
import { expensesRepository } from "@/repositories/expenses";
import { payableAccountsRepository } from "@/repositories/payable-accounts";

export const dynamic = "force-dynamic";

type PageProps = { searchParams?: Promise<{ mes?: string }> };

export default async function PayablesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedMonth = params?.mes ?? referenceMonthInput();
  const [accounts, expenses] = await Promise.all([
    payableAccountsRepository.listByMonth(toReferenceMonth(selectedMonth)),
    expensesRepository.active()
  ]);
  const total = accounts.reduce((sum, item) => sum + Number(item.amount), 0);
  const paid = accounts.filter((item) => item.paid).reduce((sum, item) => sum + Number(item.amount), 0);
  const pending = total - paid;

  return (
    <>
      <div className="header">
        <div><h1>Contas a pagar</h1><p className="muted">Controle mensal de despesas pagas e pendentes.</p></div>
        <form action="/contas-pagar" className="actions">
          <input className="input" type="month" name="mes" defaultValue={selectedMonth} />
          <Button type="submit">Filtrar</Button>
        </form>
      </div>
      <section className="grid grid-4">
        <div className="card"><strong>{formatCurrency(total)}</strong><p className="muted">Total do mes</p></div>
        <div className="card"><strong>{formatCurrency(paid)}</strong><p className="muted">Total pago</p></div>
        <div className="card"><strong>{formatCurrency(pending)}</strong><p className="muted">Total pendente</p></div>
        <div className="card"><strong>{accounts.filter((item) => !item.paid).length}</strong><p className="muted">Pendentes</p></div>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Novo lancamento</h2>
        <form className="form grid grid-2" action={upsertPayableAccount}>
          <input type="hidden" name="referenceMonth" value={selectedMonth} />
          <Input label="Data da despesa" name="expenseDate" type="date" required />
          <Input label="Descricao" name="description" required />
          <Select label="Despesa vinculada" name="expenseId" options={[{ value: "", label: "Sem vinculo" }, ...expenses.map((item) => ({ value: item.id, label: item.description }))]} />
          <Input label="Ou nova despesa" name="newExpenseDescription" />
          <Input label="Valor" name="amount" type="number" step="0.01" min="0.01" required />
          <Select label="Pago" name="paid" options={[{ value: "false", label: "Nao" }, { value: "true", label: "Sim" }]} />
          <Input label="Data de pagamento" name="paymentDate" type="date" />
          <Textarea label="Observacao" name="notes" />
          <Button type="submit">Salvar</Button>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <DuplicateMonthForm referenceMonth={selectedMonth} />
        <div className="table-wrap" style={{ marginTop: 16 }}>
          <table>
            <thead><tr><th>Codigo</th><th>Data</th><th>Descricao</th><th>Despesa</th><th>Valor</th><th>Status</th><th>Pagamento</th><th>Acoes</th></tr></thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className={account.paid ? "" : "pending"}>
                  <td>{account.code}</td>
                  <td>{formatDate(account.expenseDate)}</td>
                  <td>{account.description}</td>
                  <td>{account.expense?.description ?? "-"}</td>
                  <td>{formatCurrency(account.amount.toString())}</td>
                  <td><span className="badge">{account.paid ? "Pago" : "Pendente"}</span></td>
                  <td>{formatDate(account.paymentDate)}</td>
                  <td className="actions">
                    <details>
                      <summary>Editar</summary>
                      <form className="form" action={upsertPayableAccount}>
                        <input type="hidden" name="id" value={account.id} />
                        <input type="hidden" name="referenceMonth" value={selectedMonth} />
                        <Input label="Data da despesa" name="expenseDate" type="date" defaultValue={account.expenseDate.toISOString().slice(0, 10)} required />
                        <Input label="Descricao" name="description" defaultValue={account.description} required />
                        <Select label="Despesa vinculada" name="expenseId" defaultValue={account.expenseId ?? ""} options={[{ value: "", label: "Sem vinculo" }, ...expenses.map((item) => ({ value: item.id, label: item.description }))]} />
                        <Input label="Valor" name="amount" type="number" step="0.01" min="0.01" defaultValue={account.amount.toString()} required />
                        <Select label="Pago" name="paid" defaultValue={String(account.paid)} options={[{ value: "false", label: "Nao" }, { value: "true", label: "Sim" }]} />
                        <Input label="Data de pagamento" name="paymentDate" type="date" defaultValue={account.paymentDate?.toISOString().slice(0, 10)} />
                        <Textarea label="Observacao" name="notes" defaultValue={account.notes ?? ""} />
                        <Button type="submit">Atualizar</Button>
                      </form>
                    </details>
                    <form action={markPayable}><input type="hidden" name="id" value={account.id} /><input type="hidden" name="paid" value={String(!account.paid)} /><Button type="submit">{account.paid ? "Nao pago" : "Pagar"}</Button></form>
                    <form action={removePayableAccount}><input type="hidden" name="id" value={account.id} /><Button type="submit" variant="danger">Excluir</Button></form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
