type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const variantClass = variant === "primary" ? "" : variant;
  return <button className={`button ${variantClass} ${className}`} {...props} />;
}
