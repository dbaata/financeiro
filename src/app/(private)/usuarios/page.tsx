import Link from "next/link";
import { DeleteIcon, EditIcon, ViewIcon } from "@/components/ui/ActionIcons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { disableUser, upsertUser } from "@/modules/usuarios/actions";
import { usersRepository } from "@/repositories/users";

export const dynamic = "force-dynamic";

type PageProps = { searchParams?: Promise<{ acao?: string; editar?: string; visualizar?: string; busca?: string; status?: string }> };

const statusOptions = [{ value: "ACTIVE", label: "Ativo" }, { value: "INACTIVE", label: "Inativo" }];

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const users = await usersRepository.list();
  const editing = params?.editar ? users.find((user) => user.id === params.editar) : null;
  const viewing = params?.visualizar ? users.find((user) => user.id === params.visualizar) : null;
  const showForm = params?.acao === "novo" || Boolean(editing);
  const search = params?.busca?.trim().toLowerCase() ?? "";
  const status = params?.status ?? "";
  const filteredUsers = users.filter((user) => {
    const matchesSearch = !search || [String(user.code), user.login, user.name, user.email].some((value) => value.toLowerCase().includes(search));
    const matchesStatus = !status || user.status === status;
    return matchesSearch && matchesStatus;
  });

  if (viewing) {
    return (
      <>
        <div className="header"><div><h1>Usuarios</h1><p className="muted">Cadastre acessos e controle usuarios ativos.</p></div></div>
        <section className="panel">
          <div className="table-toolbar"><h2>Visualizar usuario</h2><Link className="button secondary" href="/usuarios">Voltar</Link></div>
          <div className="detail-grid">
            <div className="detail-item"><span>Codigo</span><strong>{viewing.code}</strong></div>
            <div className="detail-item"><span>Login</span><strong>{viewing.login}</strong></div>
            <div className="detail-item"><span>Nome</span><strong>{viewing.name}</strong></div>
            <div className="detail-item"><span>E-mail</span><strong>{viewing.email}</strong></div>
            <div className="detail-item"><span>Situacao</span><strong>{viewing.status === "ACTIVE" ? "Ativo" : "Inativo"}</strong></div>
          </div>
        </section>
      </>
    );
  }

  if (showForm) {
    return (
      <>
        <div className="header"><div><h1>Usuarios</h1><p className="muted">Cadastre acessos e controle usuarios ativos.</p></div></div>
        <section className="panel">
          <div className="table-toolbar"><h2>{editing ? "Editar usuario" : "Novo usuario"}</h2><Link className="button secondary" href="/usuarios">Voltar</Link></div>
          <form className="form grid grid-2" action={upsertUser}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <Input label="Login" name="login" defaultValue={editing?.login ?? ""} required />
            <Input label="Nome" name="name" defaultValue={editing?.name ?? ""} required />
            <Input label="E-mail" name="email" type="email" defaultValue={editing?.email ?? ""} required />
            <Input label={editing ? "Nova senha" : "Senha"} name="password" type="password" required={!editing} />
            <Select label="Situacao" name="status" defaultValue={editing?.status ?? "ACTIVE"} options={statusOptions} />
            <div className="field actions-field"><Button type="submit">Salvar</Button></div>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="header"><div><h1>Usuarios</h1><p className="muted">Cadastre acessos e controle usuarios ativos.</p></div></div>
      <section className="panel">
        <form className="filters" action="/usuarios">
          <Input label="Buscar" name="busca" defaultValue={params?.busca ?? ""} />
          <Select label="Situacao" name="status" defaultValue={status} options={[{ value: "", label: "Todas" }, ...statusOptions]} />
          <div className="field actions-field"><Button type="submit">Filtrar</Button><Link className="button secondary" href="/usuarios">Limpar</Link></div>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-toolbar"><h2>Lista de usuarios</h2><Link className="button" href="/usuarios?acao=novo">Inserir</Link></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Acoes</th><th>Codigo</th><th>Login</th><th>Nome</th><th>E-mail</th><th>Situacao</th></tr></thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="row-actions">
                    <Link className="table-action" href={`/usuarios?visualizar=${user.id}`} aria-label="Visualizar" title="Visualizar"><ViewIcon /></Link>
                    <Link className="table-action" href={`/usuarios?editar=${user.id}`} aria-label="Editar" title="Editar"><EditIcon /></Link>
                    <form action={disableUser}><input type="hidden" name="id" value={user.id} /><button className="table-action danger" type="submit" aria-label="Excluir" title="Excluir"><DeleteIcon /></button></form>
                  </td>
                  <td>{user.code}</td><td>{user.login}</td><td>{user.name}</td><td>{user.email}</td><td><span className="badge">{user.status === "ACTIVE" ? "Ativo" : "Inativo"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
