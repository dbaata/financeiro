import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/validations";

export async function saveUser(formData: FormData) {
  const data = userSchema.parse(Object.fromEntries(formData));
  const password = data.password?.trim();

  const loginConflict = await prisma.user.findFirst({
    where: { login: data.login, deletedAt: null, NOT: data.id ? { id: data.id } : undefined }
  });
  if (loginConflict) throw new Error("Login ja cadastrado.");

  const emailConflict = await prisma.user.findFirst({
    where: { email: data.email, deletedAt: null, NOT: data.id ? { id: data.id } : undefined }
  });
  if (emailConflict) throw new Error("E-mail ja cadastrado.");

  if (!data.id && !password) throw new Error("Senha obrigatoria para novo usuario.");

  const payload = {
    login: data.login,
    name: data.name,
    email: data.email,
    status: data.status,
    ...(password ? { passwordHash: await hash(password, 12) } : {})
  };

  if (data.id) return prisma.user.update({ where: { id: data.id }, data: payload });
  return prisma.user.create({ data: payload as typeof payload & { passwordHash: string } });
}

export async function inactivateUser(id: string) {
  return prisma.user.update({ where: { id }, data: { status: "INACTIVE" } });
}
