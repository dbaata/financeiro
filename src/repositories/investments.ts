import { prisma } from "@/lib/prisma";

export const investmentsRepository = {
  list: () =>
    prisma.investment.findMany({
      where: { deletedAt: null },
      orderBy: { applicationDate: "desc" }
    })
};
