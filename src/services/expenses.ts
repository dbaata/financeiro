import { prisma } from "@/lib/prisma";
import { expenseSchema } from "@/lib/validations";

export async function saveExpense(formData: FormData) {
  const data = expenseSchema.parse(Object.fromEntries(formData));
  const duplicate = await prisma.expense.findFirst({
    where: {
      description: { equals: data.description, mode: "insensitive" },
      deletedAt: null,
      NOT: data.id ? { id: data.id } : undefined
    }
  });
  if (duplicate) throw new Error("Despesa ja cadastrada.");

  if (data.id) return prisma.expense.update({ where: { id: data.id }, data });
  return prisma.expense.create({ data });
}

export async function inactivateExpense(id: string) {
  return prisma.expense.update({ where: { id }, data: { status: "INACTIVE" } });
}

export async function getOrCreateExpense(description?: string) {
  const value = description?.trim();
  if (!value) return null;

  const existing = await prisma.expense.findFirst({
    where: { description: { equals: value, mode: "insensitive" }, deletedAt: null }
  });
  if (existing) return existing;

  return prisma.expense.create({ data: { description: value } });
}
