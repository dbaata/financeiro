import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Campo obrigatorio");

export const loginSchema = z.object({
  login: requiredString,
  password: requiredString
});

export const userSchema = z.object({
  id: z.string().optional(),
  login: requiredString,
  name: requiredString,
  email: z.string().trim().email("E-mail invalido"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  password: z.string().optional()
});

export const expenseSchema = z.object({
  id: z.string().optional(),
  description: requiredString,
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE")
});

export const payableAccountSchema = z.object({
  id: z.string().optional(),
  referenceMonth: z.string().regex(/^\d{4}-\d{2}$/),
  expenseDate: z.string().min(10),
  description: requiredString,
  expenseId: z.string().optional(),
  newExpenseDescription: z.string().optional(),
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
  paid: z.coerce.boolean().default(false),
  paymentDate: z.string().optional(),
  notes: z.string().optional()
});

export const investmentSchema = z.object({
  id: z.string().optional(),
  type: requiredString,
  institution: requiredString,
  description: requiredString,
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
  applicationDate: z.string().min(10),
  maturityDate: z.string().optional(),
  profitability: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "REDEEMED"]).default("ACTIVE")
});
