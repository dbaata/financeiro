import { prisma } from "@/lib/prisma";

export const usersRepository = {
  list: () =>
    prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { code: "asc" },
      select: { id: true, code: true, login: true, name: true, email: true, status: true }
    }),
  findByLogin: (login: string) => prisma.user.findUnique({ where: { login } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } })
};
