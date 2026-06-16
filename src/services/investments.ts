import { prisma } from "@/lib/prisma";
import { investmentSchema } from "@/lib/validations";

export async function saveInvestment(formData: FormData) {
  const data = investmentSchema.parse(Object.fromEntries(formData));
  const payload = {
    type: data.type,
    institution: data.institution,
    description: data.description,
    amount: data.amount,
    applicationDate: new Date(`${data.applicationDate}T00:00:00.000Z`),
    maturityDate: data.maturityDate ? new Date(`${data.maturityDate}T00:00:00.000Z`) : null,
    profitability: data.profitability?.trim() || null,
    notes: data.notes?.trim() || null,
    status: data.status
  };

  if (data.id) return prisma.investment.update({ where: { id: data.id }, data: payload });
  return prisma.investment.create({ data: payload });
}
