import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import { upsertInvestment } from "@/modules/investimentos/actions";
import { investmentsRepository } from "@/repositories/investments";

export const dynamic = "force-dynamic";

export default async function InvestmentsPage() {
  const investments = await investmentsRepository.list();

  return (
    <>
      <div className="header"><div><h1>Investimentos</h1><p className="muted">Cadastro inicial para evolucao do modulo.</p></div></div>
      <section className="panel">
        <form className="form grid grid-2" action={upsertInvestment}>
          <Input label="Tipo" name="type" required />
          <Input label="Instituicao" name="institution" required />
          <Input label="Descricao" name="description" required />
          <Input label="Valor aplicado" name="amount" type="number" step="0.01" min="0.01" required />
          <Input label="Data da aplicacao" name="applicationDate" type="date" required />
          <Input label="Data de vencimento" name="maturityDate" type="date" />
          <Input label="Rentabilidade" name="profitability" />
          <Select label="Situacao" name="status" options={[{ value: "ACTIVE", label: "Ativo" }, { value: "REDEEMED", label: "Resgatado" }]} />
          <Textarea label="Observacao" name="notes" />
          <Button type="submit">Salvar</Button>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Codigo</th><th>Tipo</th><th>Instituicao</th><th>Descricao</th><th>Valor</th><th>Aplicacao</th><th>Situacao</th><th>Acoes</th></tr></thead>
            <tbody>
              {investments.map((item) => (
                <tr key={item.id}>
                  <td>{item.code}</td><td>{item.type}</td><td>{item.institution}</td><td>{item.description}</td><td>{formatCurrency(item.amount.toString())}</td><td>{formatDate(item.applicationDate)}</td><td><span className="badge">{item.status === "ACTIVE" ? "Ativo" : "Resgatado"}</span></td>
                  <td>
                    <details>
                      <summary>Editar</summary>
                      <form className="form" action={upsertInvestment}>
                        <input type="hidden" name="id" value={item.id} />
                        <Input label="Tipo" name="type" defaultValue={item.type} required />
                        <Input label="Instituicao" name="institution" defaultValue={item.institution} required />
                        <Input label="Descricao" name="description" defaultValue={item.description} required />
                        <Input label="Valor aplicado" name="amount" type="number" step="0.01" min="0.01" defaultValue={item.amount.toString()} required />
                        <Input label="Data da aplicacao" name="applicationDate" type="date" defaultValue={item.applicationDate.toISOString().slice(0, 10)} required />
                        <Input label="Data de vencimento" name="maturityDate" type="date" defaultValue={item.maturityDate?.toISOString().slice(0, 10)} />
                        <Input label="Rentabilidade" name="profitability" defaultValue={item.profitability ?? ""} />
                        <Select label="Situacao" name="status" defaultValue={item.status} options={[{ value: "ACTIVE", label: "Ativo" }, { value: "REDEEMED", label: "Resgatado" }]} />
                        <Textarea label="Observacao" name="notes" defaultValue={item.notes ?? ""} />
                        <Button type="submit">Atualizar</Button>
                      </form>
                    </details>
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
