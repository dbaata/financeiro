import Link from "next/link";
import { DeleteIcon, EditIcon, ViewIcon } from "@/components/ui/ActionIcons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { disableExpense, upsertExpense } from "@/modules/despesas/actions";
import { expensesRepository } from "@/repositories/expenses";

export const dynamic = "force-dynamic";

type PageProps = { searchParams?: Promise<{ acao?: string; editar?: string; visualizar?: string; busca?: string; status?: string }> };

const statusOptions = [{ value: "ACTIVE", label: "Ativa" }, { value: "INACTIVE", label: "Inativa" }];

export default async function ExpensesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const expenses = await expensesRepository.list();
  const editing = params?.editar ? expenses.find((expense) => expense.id === params.editar) : null;
  const viewing = params?.visualizar ? expenses.find((expense) => expense.id === params.visualizar) : null;
  const showForm = params?.acao === "novo" || Boolean(editing);
  const search = params?.busca?.trim().toLowerCase() ?? "";
  const status = params?.status ?? "";
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = !search || expense.description.toLowerCase().includes(search) || String(expense.code).includes(search);
    const matchesStatus = !status || expense.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="header"><div><h1>Despesas</h1><p className="muted">Mantenha o cadastro usado nas contas a pagar.</p></div></div>
      <section className="panel">
        <form className="filters" action="/despesas">
          <Input label="Buscar" name="busca" defaultValue={params?.busca ?? ""} />
          <Select label="Situacao" name="status" defaultValue={status} options={[{ value: "", label: "Todas" }, ...statusOptions]} />
          <div className="field actions-field"><Button type="submit">Filtrar</Button><Link className="button secondary" href="/despesas">Limpar</Link></div>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-toolbar"><h2>Lista de despesas</h2><Link className="button" href="/despesas?acao=novo">Inserir</Link></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Acoes</th><th>Codigo</th><th>Descricao</th><th>Situacao</th></tr></thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="row-actions">
                    <Link className="table-action" href={`/despesas?visualizar=${expense.id}`} aria-label="Visualizar" title="Visualizar"><ViewIcon /></Link>
                    <Link className="table-action" href={`/despesas?editar=${expense.id}`} aria-label="Editar" title="Editar"><EditIcon /></Link>
                    <form action={disableExpense}><input type="hidden" name="id" value={expense.id} /><button className="table-action danger" type="submit" aria-label="Excluir" title="Excluir"><DeleteIcon /></button></form>
                  </td>
                  <td>{expense.code}</td><td>{expense.description}</td><td><span className="badge">{expense.status === "ACTIVE" ? "Ativa" : "Inativa"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {viewing ? (
        <section className="panel" style={{ marginTop: 16 }}>
          <div className="table-toolbar"><h2>Visualizar despesa</h2><Link className="button secondary" href="/despesas">Voltar</Link></div>
          <div className="detail-grid">
            <div className="detail-item"><span>Codigo</span><strong>{viewing.code}</strong></div>
            <div className="detail-item"><span>Descricao</span><strong>{viewing.description}</strong></div>
            <div className="detail-item"><span>Situacao</span><strong>{viewing.status === "ACTIVE" ? "Ativa" : "Inativa"}</strong></div>
          </div>
        </section>
      ) : null}
      {showForm ? (
        <section className="panel" style={{ marginTop: 16 }}>
          <div className="table-toolbar"><h2>{editing ? "Editar despesa" : "Nova despesa"}</h2><Link className="button secondary" href="/despesas">Voltar</Link></div>
          <form className="form grid grid-2" action={upsertExpense}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <Input label="Descricao" name="description" defaultValue={editing?.description ?? ""} required />
            <Select label="Situacao" name="status" defaultValue={editing?.status ?? "ACTIVE"} options={statusOptions} />
            <Button type="submit">Salvar</Button>
          </form>
        </section>
      ) : null}
    </>
  );
}
