type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} className="input" {...props} />
    </div>
  );
}
