"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { inactivateExpense, saveExpense } from "@/services/expenses";

export async function upsertExpense(formData: FormData) {
  await saveExpense(formData);
  revalidatePath("/despesas");
  redirect("/despesas");
}

export async function disableExpense(formData: FormData) {
  await inactivateExpense(String(formData.get("id")));
  revalidatePath("/despesas");
  redirect("/despesas");
}
