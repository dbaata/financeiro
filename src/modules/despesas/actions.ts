"use server";

import { revalidatePath } from "next/cache";
import { inactivateExpense, saveExpense } from "@/services/expenses";

export async function upsertExpense(formData: FormData) {
  await saveExpense(formData);
  revalidatePath("/despesas");
}

export async function disableExpense(formData: FormData) {
  await inactivateExpense(String(formData.get("id")));
  revalidatePath("/despesas");
}
