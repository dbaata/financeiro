import { prisma } from "@/lib/prisma";

export const payableAccountsRepository = {
  listByMonth: (referenceMonth: Date) =>
    prisma.payableAccount.findMany({
      where: { deletedAt: null, referenceMonth },
      include: { expense: true },
      orderBy: [{ paid: "asc" }, { expenseDate: "asc" }, { code: "asc" }]
    })
};
