"use server";

import { revalidatePath } from "next/cache";
import { saveInvestment } from "@/services/investments";

export async function upsertInvestment(formData: FormData) {
  await saveInvestment(formData);
  revalidatePath("/investimentos");
}
