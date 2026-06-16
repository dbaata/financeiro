"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteInvestment, saveInvestment } from "@/services/investments";

export async function upsertInvestment(formData: FormData) {
  await saveInvestment(formData);
  revalidatePath("/investimentos");
  redirect("/investimentos");
}

export async function removeInvestment(formData: FormData) {
  await deleteInvestment(String(formData.get("id")));
  revalidatePath("/investimentos");
  redirect("/investimentos");
}
