import type { ReactNode } from "react";
import { Footer } from "./Footer";

interface LayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export const Layout = ({ header, children }: LayoutProps) => {
  return (
    <>
      {header}
      <main className="wrap">{children}</main>
      <Footer />
    </>
  );
};
