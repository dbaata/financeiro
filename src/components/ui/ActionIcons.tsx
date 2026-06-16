type IconProps = {
  label: string;
};

function IconBase({ label, children }: React.PropsWithChildren<IconProps>) {
  return (
    <svg aria-hidden="true" className="table-action-icon" focusable="false" viewBox="0 0 24 24">
      <title>{label}</title>
      {children}
    </svg>
  );
}

export function ViewIcon() {
  return (
    <IconBase label="Visualizar">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

export function EditIcon() {
  return (
    <IconBase label="Editar">
      <path d="M4 20h4l10.5-10.5-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </IconBase>
  );
}

export function DeleteIcon() {
  return (
    <IconBase label="Excluir">
      <path d="M5 7h14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </IconBase>
  );
}
