import { prisma } from "@/lib/prisma";

export const expensesRepository = {
  list: () =>
    prisma.expense.findMany({
      where: { deletedAt: null },
      orderBy: { description: "asc" }
    }),
  active: () =>
    prisma.expense.findMany({
      where: { deletedAt: null, status: "ACTIVE" },
      orderBy: { description: "asc" }
    })
};
