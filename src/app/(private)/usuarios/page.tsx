import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { usersRepository } from "@/repositories/users";
import { disableUser, upsertUser } from "@/modules/usuarios/actions";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await usersRepository.list();

  return (
    <>
      <div className="header">
        <div>
          <h1>Usuarios</h1>
          <p className="muted">Cadastre acessos e controle usuarios ativos.</p>
        </div>
      </div>
      <section className="panel">
        <h2>Novo usuario</h2>
        <form className="form grid grid-2" action={upsertUser}>
          <Input label="Login" name="login" required />
          <Input label="Nome" name="name" required />
          <Input label="E-mail" name="email" type="email" required />
          <Input label="Senha" name="password" type="password" required />
          <Select label="Situacao" name="status" options={[{ value: "ACTIVE", label: "Ativo" }, { value: "INACTIVE", label: "Inativo" }]} />
          <div className="field"><label>&nbsp;</label><Button type="submit">Salvar</Button></div>
        </form>
      </section>
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Codigo</th><th>Login</th><th>Nome</th><th>E-mail</th><th>Situacao</th><th>Acoes</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.code}</td><td>{user.login}</td><td>{user.name}</td><td>{user.email}</td><td><span className="badge">{user.status === "ACTIVE" ? "Ativo" : "Inativo"}</span></td>
                  <td>
                    <details>
                      <summary>Editar</summary>
                      <form className="form" action={upsertUser}>
                        <input type="hidden" name="id" value={user.id} />
                        <Input label="Login" name="login" defaultValue={user.login} required />
                        <Input label="Nome" name="name" defaultValue={user.name} required />
                        <Input label="E-mail" name="email" type="email" defaultValue={user.email} required />
                        <Input label="Nova senha" name="password" type="password" />
                        <Select label="Situacao" name="status" defaultValue={user.status} options={[{ value: "ACTIVE", label: "Ativo" }, { value: "INACTIVE", label: "Inativo" }]} />
                        <Button type="submit">Atualizar</Button>
                      </form>
                    </details>
                    <form action={disableUser}><input type="hidden" name="id" value={user.id} /><Button variant="secondary" type="submit">Inativar</Button></form>
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
