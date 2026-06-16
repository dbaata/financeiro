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
  const referenceMonth = String(formData.get("referenceMonth"));
  await savePayableAccount(formData);
  revalidatePath("/contas-pagar");
  redirect(`/contas-pagar?mes=${referenceMonth}`);
}

export async function removePayableAccount(formData: FormData) {
  const referenceMonth = String(formData.get("referenceMonth"));
  await deletePayableAccount(String(formData.get("id")));
  revalidatePath("/contas-pagar");
  redirect(`/contas-pagar?mes=${referenceMonth}`);
}

export async function markPayable(formData: FormData) {
  const referenceMonth = String(formData.get("referenceMonth"));
  await setPayablePaid(String(formData.get("id")), String(formData.get("paid")) === "true");
  revalidatePath("/contas-pagar");
  redirect(`/contas-pagar?mes=${referenceMonth}`);
}

export async function duplicateMonth(formData: FormData) {
  const referenceMonth = String(formData.get("referenceMonth"));
  await duplicatePreviousMonth(referenceMonth);
  revalidatePath("/contas-pagar");
  redirect(`/contas-pagar?mes=${referenceMonth}`);
}
