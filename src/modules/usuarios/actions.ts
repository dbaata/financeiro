"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { inactivateUser, saveUser } from "@/services/users";

export async function upsertUser(formData: FormData) {
  await saveUser(formData);
  revalidatePath("/usuarios");
  redirect("/usuarios");
}

export async function disableUser(formData: FormData) {
  await inactivateUser(String(formData.get("id")));
  revalidatePath("/usuarios");
  redirect("/usuarios");
}
