type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name;
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <textarea id={inputId} className="input" rows={3} {...props} />
    </div>
  );
}
