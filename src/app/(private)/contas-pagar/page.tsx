import Link from "next/link";
import { DeleteIcon, EditIcon, ViewIcon } from "@/components/ui/ActionIcons";
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

type PageProps = { searchParams?: Promise<{ mes?: string; acao?: string; editar?: string; visualizar?: string; busca?: string; status?: string }> };

export default async function PayablesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedMonth = params?.mes ?? referenceMonthInput();
  const [accounts, expenses] = await Promise.all([
    payableAccountsRepository.listByMonth(toReferenceMonth(selectedMonth)),
    expensesRepository.active()
  ]);
  const editing = params?.editar ? accounts.find((account) => account.id === params.editar) : null;
  const viewing = params?.visualizar ? accounts.find((account) => account.id === params.visualizar) : null;
  const showForm = params?.acao === "novo" || Boolean(editing);
  const search = params?.busca?.trim().toLowerCase() ?? "";
  const status = params?.status ?? "";
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = !search || [String(account.code), account.description, account.expense?.description ?? ""].some((value) => value.toLowerCase().includes(search));
    const matchesStatus = !status || (status === "PAID" ? account.paid : !account.paid);
    return matchesSearch && matchesStatus;
  });
  const total = accounts.reduce((sum, item) => sum + Number(item.amount), 0);
  const paid = accounts.filter((item) => item.paid).reduce((sum, item) => sum + Number(item.amount), 0);
  const pending = total - paid;

  return (
    <>
      <div className="header"><div><h1>Contas a pagar</h1><p className="muted">Controle mensal de despesas pagas e pendentes.</p></div></div>
      <section className="grid grid-4">
        <div className="card"><strong>{formatCurrency(total)}</strong><p className="muted">Total do mes</p></div>
        <div className="card"><strong>{formatCurrency(paid)}</strong><p className="muted">Total pago</p></div>
        <div className="card"><strong>{formatCurrency(pending)}</strong><p className="muted">Total pendente</p></div>
        <div className="card"><strong>{accounts.filter((item) => !item.paid).length}</strong><p className="muted">Pendentes</p></div>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <form className="filters" action="/contas-pagar">
          <Input label="Mes" type="month" name="mes" defaultValue={selectedMonth} />
          <Input label="Buscar" name="busca" defaultValue={params?.busca ?? ""} />
          <Select label="Status" name="status" defaultValue={status} options={[{ value: "", label: "Todos" }, { value: "PENDING", label: "Pendente" }, { value: "PAID", label: "Pago" }]} />
          <div className="field actions-field"><Button type="submit">Filtrar</Button><Link className="button secondary" href={`/contas-pagar?mes=${selectedMonth}`}>Limpar</Link></div>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-toolbar"><h2>Lista de contas</h2><div className="actions"><DuplicateMonthForm referenceMonth={selectedMonth} /><Link className="button" href={`/contas-pagar?mes=${selectedMonth}&acao=novo`}>Inserir</Link></div></div>
        <div className="table-wrap" style={{ marginTop: 16 }}>
          <table>
            <thead><tr><th>Acoes</th><th>Codigo</th><th>Data</th><th>Descricao</th><th>Despesa</th><th>Valor</th><th>Status</th><th>Pagamento</th></tr></thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className={account.paid ? "" : "pending"}>
                  <td className="row-actions">
                    <Link className="table-action" href={`/contas-pagar?mes=${selectedMonth}&visualizar=${account.id}`} aria-label="Visualizar" title="Visualizar"><ViewIcon /></Link>
                    <Link className="table-action" href={`/contas-pagar?mes=${selectedMonth}&editar=${account.id}`} aria-label="Editar" title="Editar"><EditIcon /></Link>
                    <form action={removePayableAccount}><input type="hidden" name="id" value={account.id} /><input type="hidden" name="referenceMonth" value={selectedMonth} /><button className="table-action danger" type="submit" aria-label="Excluir" title="Excluir"><DeleteIcon /></button></form>
                  </td>
                  <td>{account.code}</td><td>{formatDate(account.expenseDate)}</td><td>{account.description}</td><td>{account.expense?.description ?? "-"}</td><td>{formatCurrency(account.amount.toString())}</td><td><span className="badge">{account.paid ? "Pago" : "Pendente"}</span></td><td>{formatDate(account.paymentDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {viewing ? (
        <section className="panel" style={{ marginTop: 16 }}>
          <div className="table-toolbar"><h2>Visualizar conta</h2><Link className="button secondary" href={`/contas-pagar?mes=${selectedMonth}`}>Voltar</Link></div>
          <div className="detail-grid">
            <div className="detail-item"><span>Codigo</span><strong>{viewing.code}</strong></div>
            <div className="detail-item"><span>Data da despesa</span><strong>{formatDate(viewing.expenseDate)}</strong></div>
            <div className="detail-item"><span>Descricao</span><strong>{viewing.description}</strong></div>
            <div className="detail-item"><span>Despesa vinculada</span><strong>{viewing.expense?.description ?? "-"}</strong></div>
            <div className="detail-item"><span>Valor</span><strong>{formatCurrency(viewing.amount.toString())}</strong></div>
            <div className="detail-item"><span>Status</span><strong>{viewing.paid ? "Pago" : "Pendente"}</strong></div>
            <div className="detail-item"><span>Data de pagamento</span><strong>{formatDate(viewing.paymentDate)}</strong></div>
            <div className="detail-item"><span>Observacao</span><strong>{viewing.notes ?? "-"}</strong></div>
          </div>
        </section>
      ) : null}
      {showForm ? (
        <section className="panel" style={{ marginTop: 16 }}>
          <div className="table-toolbar">
            <h2>{editing ? "Editar conta" : "Novo lancamento"}</h2>
            <div className="actions">
              {editing ? (
                <form action={markPayable}>
                  <input type="hidden" name="id" value={editing.id} />
                  <input type="hidden" name="referenceMonth" value={selectedMonth} />
                  <input type="hidden" name="paid" value={String(!editing.paid)} />
                  <Button type="submit" variant="secondary">{editing.paid ? "Marcar nao pago" : "Marcar pago"}</Button>
                </form>
              ) : null}
              <Link className="button secondary" href={`/contas-pagar?mes=${selectedMonth}`}>Voltar</Link>
            </div>
          </div>
          <form className="form grid grid-2" action={upsertPayableAccount}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <input type="hidden" name="referenceMonth" value={selectedMonth} />
            <Input label="Data da despesa" name="expenseDate" type="date" defaultValue={editing?.expenseDate.toISOString().slice(0, 10) ?? ""} required />
            <Input label="Descricao" name="description" defaultValue={editing?.description ?? ""} required />
            <Select label="Despesa vinculada" name="expenseId" defaultValue={editing?.expenseId ?? ""} options={[{ value: "", label: "Sem vinculo" }, ...expenses.map((item) => ({ value: item.id, label: item.description }))]} />
            {editing ? null : <Input label="Ou nova despesa" name="newExpenseDescription" />}
            <Input label="Valor" name="amount" type="number" step="0.01" min="0.01" defaultValue={editing?.amount.toString() ?? ""} required />
            <Select label="Pago" name="paid" defaultValue={String(editing?.paid ?? false)} options={[{ value: "false", label: "Nao" }, { value: "true", label: "Sim" }]} />
            <Input label="Data de pagamento" name="paymentDate" type="date" defaultValue={editing?.paymentDate?.toISOString().slice(0, 10) ?? ""} />
            <Textarea label="Observacao" name="notes" defaultValue={editing?.notes ?? ""} />
            <div className="field actions-field"><Button type="submit">Salvar</Button></div>
          </form>
        </section>
      ) : null}
    </>
  );
}
