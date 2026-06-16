import Link from "next/link";
import { DeleteIcon, EditIcon, ViewIcon } from "@/components/ui/ActionIcons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import { removeInvestment, upsertInvestment } from "@/modules/investimentos/actions";
import { investmentsRepository } from "@/repositories/investments";

export const dynamic = "force-dynamic";

type PageProps = { searchParams?: Promise<{ acao?: string; editar?: string; visualizar?: string; busca?: string; status?: string }> };

const statusOptions = [{ value: "ACTIVE", label: "Ativo" }, { value: "REDEEMED", label: "Resgatado" }];

export default async function InvestmentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const investments = await investmentsRepository.list();
  const editing = params?.editar ? investments.find((item) => item.id === params.editar) : null;
  const viewing = params?.visualizar ? investments.find((item) => item.id === params.visualizar) : null;
  const showForm = params?.acao === "novo" || Boolean(editing);
  const search = params?.busca?.trim().toLowerCase() ?? "";
  const status = params?.status ?? "";
  const filteredInvestments = investments.filter((item) => {
    const matchesSearch = !search || [String(item.code), item.type, item.institution, item.description].some((value) => value.toLowerCase().includes(search));
    const matchesStatus = !status || item.status === status;
    return matchesSearch && matchesStatus;
  });

  if (viewing) {
    return (
      <>
        <div className="header"><div><h1>Investimentos</h1><p className="muted">Cadastro inicial para evolucao do modulo.</p></div></div>
        <section className="panel">
          <div className="table-toolbar"><h2>Visualizar investimento</h2><Link className="button secondary" href="/investimentos">Voltar</Link></div>
          <div className="detail-grid">
            <div className="detail-item"><span>Codigo</span><strong>{viewing.code}</strong></div>
            <div className="detail-item"><span>Tipo</span><strong>{viewing.type}</strong></div>
            <div className="detail-item"><span>Instituicao</span><strong>{viewing.institution}</strong></div>
            <div className="detail-item"><span>Descricao</span><strong>{viewing.description}</strong></div>
            <div className="detail-item"><span>Valor aplicado</span><strong>{formatCurrency(viewing.amount.toString())}</strong></div>
            <div className="detail-item"><span>Data da aplicacao</span><strong>{formatDate(viewing.applicationDate)}</strong></div>
            <div className="detail-item"><span>Data de vencimento</span><strong>{formatDate(viewing.maturityDate)}</strong></div>
            <div className="detail-item"><span>Rentabilidade</span><strong>{viewing.profitability ?? "-"}</strong></div>
            <div className="detail-item"><span>Situacao</span><strong>{viewing.status === "ACTIVE" ? "Ativo" : "Resgatado"}</strong></div>
            <div className="detail-item"><span>Observacao</span><strong>{viewing.notes ?? "-"}</strong></div>
          </div>
        </section>
      </>
    );
  }

  if (showForm) {
    return (
      <>
        <div className="header"><div><h1>Investimentos</h1><p className="muted">Cadastro inicial para evolucao do modulo.</p></div></div>
        <section className="panel">
          <div className="table-toolbar"><h2>{editing ? "Editar investimento" : "Novo investimento"}</h2><Link className="button secondary" href="/investimentos">Voltar</Link></div>
          <form className="form grid grid-2" action={upsertInvestment}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <Input label="Tipo" name="type" defaultValue={editing?.type ?? ""} required />
            <Input label="Instituicao" name="institution" defaultValue={editing?.institution ?? ""} required />
            <Input label="Descricao" name="description" defaultValue={editing?.description ?? ""} required />
            <Input label="Valor aplicado" name="amount" type="number" step="0.01" min="0.01" defaultValue={editing?.amount.toString() ?? ""} required />
            <Input label="Data da aplicacao" name="applicationDate" type="date" defaultValue={editing?.applicationDate.toISOString().slice(0, 10) ?? ""} required />
            <Input label="Data de vencimento" name="maturityDate" type="date" defaultValue={editing?.maturityDate?.toISOString().slice(0, 10) ?? ""} />
            <Input label="Rentabilidade" name="profitability" defaultValue={editing?.profitability ?? ""} />
            <Select label="Situacao" name="status" defaultValue={editing?.status ?? "ACTIVE"} options={statusOptions} />
            <Textarea label="Observacao" name="notes" defaultValue={editing?.notes ?? ""} />
            <div className="field actions-field"><Button type="submit">Salvar</Button></div>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="header"><div><h1>Investimentos</h1><p className="muted">Cadastro inicial para evolucao do modulo.</p></div></div>
      <section className="panel">
        <form className="filters" action="/investimentos">
          <Input label="Buscar" name="busca" defaultValue={params?.busca ?? ""} />
          <Select label="Situacao" name="status" defaultValue={status} options={[{ value: "", label: "Todas" }, ...statusOptions]} />
          <div className="field actions-field"><Button type="submit">Filtrar</Button><Link className="button secondary" href="/investimentos">Limpar</Link></div>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-toolbar"><h2>Lista de investimentos</h2><Link className="button" href="/investimentos?acao=novo">Inserir</Link></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Acoes</th><th>Codigo</th><th>Tipo</th><th>Instituicao</th><th>Descricao</th><th>Valor</th><th>Aplicacao</th><th>Situacao</th></tr></thead>
            <tbody>
              {filteredInvestments.map((item) => (
                <tr key={item.id}>
                  <td className="row-actions">
                    <Link className="table-action" href={`/investimentos?visualizar=${item.id}`} aria-label="Visualizar" title="Visualizar"><ViewIcon /></Link>
                    <Link className="table-action" href={`/investimentos?editar=${item.id}`} aria-label="Editar" title="Editar"><EditIcon /></Link>
                    <form action={removeInvestment}><input type="hidden" name="id" value={item.id} /><button className="table-action danger" type="submit" aria-label="Excluir" title="Excluir"><DeleteIcon /></button></form>
                  </td>
                  <td>{item.code}</td><td>{item.type}</td><td>{item.institution}</td><td>{item.description}</td><td>{formatCurrency(item.amount.toString())}</td><td>{formatDate(item.applicationDate)}</td><td><span className="badge">{item.status === "ACTIVE" ? "Ativo" : "Resgatado"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
