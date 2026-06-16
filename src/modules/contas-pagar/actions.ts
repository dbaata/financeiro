"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  deletePayableAccount,
  duplicatePreviousMonth,
  savePayableAccount,
  setPayablePaid
} from "@/services/payable-accounts";

export async function upsertPayableAccount(formData: FormData) {
  await savePayableAccount(formData);
  revalidatePath("/contas-pagar");
}

export async function removePayableAccount(formData: FormData) {
  await deletePayableAccount(String(formData.get("id")));
  revalidatePath("/contas-pagar");
}

export async function markPayable(formData: FormData) {
  await setPayablePaid(String(formData.get("id")), String(formData.get("paid")) === "true");
  revalidatePath("/contas-pagar");
}

export async function duplicateMonth(formData: FormData) {
  const referenceMonth = String(formData.get("referenceMonth"));
  await duplicatePreviousMonth(referenceMonth);
  revalidatePath("/contas-pagar");
  redirect(`/contas-pagar?mes=${referenceMonth}`);
}
