import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { disableExpense, upsertExpense } from "@/modules/despesas/actions";
import { expensesRepository } from "@/repositories/expenses";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const expenses = await expensesRepository.list();

  return (
    <>
      <div className="header"><div><h1>Despesas</h1><p className="muted">Mantenha o cadastro usado nas contas a pagar.</p></div></div>
      <section className="panel">
        <form className="form grid grid-2" action={upsertExpense}>
          <Input label="Descricao" name="description" required />
          <Select label="Situacao" name="status" options={[{ value: "ACTIVE", label: "Ativa" }, { value: "INACTIVE", label: "Inativa" }]} />
          <Button type="submit">Salvar</Button>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Codigo</th><th>Descricao</th><th>Situacao</th><th>Acoes</th></tr></thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.code}</td><td>{expense.description}</td><td><span className="badge">{expense.status === "ACTIVE" ? "Ativa" : "Inativa"}</span></td>
                  <td>
                    <details>
                      <summary>Editar</summary>
                      <form className="form" action={upsertExpense}>
                        <input type="hidden" name="id" value={expense.id} />
                        <Input label="Descricao" name="description" defaultValue={expense.description} required />
                        <Select label="Situacao" name="status" defaultValue={expense.status} options={[{ value: "ACTIVE", label: "Ativa" }, { value: "INACTIVE", label: "Inativa" }]} />
                        <Button type="submit">Atualizar</Button>
                      </form>
                    </details>
                    <form action={disableExpense}><input type="hidden" name="id" value={expense.id} /><Button variant="secondary" type="submit">Inativar</Button></form>
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
