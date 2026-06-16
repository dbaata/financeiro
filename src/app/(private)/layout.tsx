import { PrivateLayout } from "@/components/layout/PrivateLayout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
