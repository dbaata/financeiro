"use client";

import { Button } from "@/components/ui/Button";
import { duplicateMonth } from "@/modules/contas-pagar/actions";

export function DuplicateMonthForm({ referenceMonth }: Readonly<{ referenceMonth: string }>) {
  return (
    <form
      action={duplicateMonth}
      onSubmit={(event) => {
        if (!confirm("Duplicar os registros do mes anterior para o mes selecionado?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="referenceMonth" value={referenceMonth} />
      <Button type="submit" variant="secondary">Duplicar mes anterior</Button>
    </form>
  );
}
