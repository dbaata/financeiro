import { prisma } from "@/lib/prisma";
import { addMonths, sameMonthDate, toReferenceMonth } from "@/lib/format";
import { payableAccountSchema } from "@/lib/validations";
import { getOrCreateExpense } from "@/services/expenses";

export async function savePayableAccount(formData: FormData) {
  const data = payableAccountSchema.parse(Object.fromEntries(formData));
  const createdExpense = await getOrCreateExpense(data.newExpenseDescription);
  const expenseId = createdExpense?.id ?? data.expenseId ?? null;

  const payload = {
    referenceMonth: toReferenceMonth(data.referenceMonth),
    expenseDate: new Date(`${data.expenseDate}T00:00:00.000Z`),
    description: data.description,
    expenseId,
    amount: data.amount,
    paid: data.paid,
    paymentDate: data.paymentDate ? new Date(`${data.paymentDate}T00:00:00.000Z`) : null,
    notes: data.notes?.trim() || null
  };

  if (data.id) return prisma.payableAccount.update({ where: { id: data.id }, data: payload });
  return prisma.payableAccount.create({ data: payload });
}

export async function deletePayableAccount(id: string) {
  return prisma.payableAccount.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function setPayablePaid(id: string, paid: boolean) {
  return prisma.payableAccount.update({
    where: { id },
    data: { paid, paymentDate: paid ? new Date() : null }
  });
}

export async function duplicatePreviousMonth(reference: string) {
  const currentMonth = toReferenceMonth(reference);
  const previousMonth = addMonths(currentMonth, -1);
  const [previous, current] = await Promise.all([
    prisma.payableAccount.findMany({ where: { deletedAt: null, referenceMonth: previousMonth } }),
    prisma.payableAccount.findMany({ where: { deletedAt: null, referenceMonth: currentMonth } })
  ]);

  const currentKeys = new Set(
    current.map((item) => `${item.description.toLowerCase()}|${item.expenseId ?? ""}|${item.amount.toString()}`)
  );

  const toCreate = previous.filter((item) => {
    const key = `${item.description.toLowerCase()}|${item.expenseId ?? ""}|${item.amount.toString()}`;
    return !currentKeys.has(key);
  });

  if (toCreate.length === 0) return { count: 0 };

  await prisma.payableAccount.createMany({
    data: toCreate.map((item) => ({
      referenceMonth: currentMonth,
      expenseDate: sameMonthDate(item.expenseDate, currentMonth),
      description: item.description,
      expenseId: item.expenseId,
      amount: item.amount,
      paid: false,
      paymentDate: null,
      notes: item.notes
    }))
  });

  return { count: toCreate.length };
}
