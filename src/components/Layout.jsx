import { useContext } from "react";

import { MobileNav } from "./MobileNav";

import { StylesContext } from "@/contexts/StylesContext";

export default function Layout({ children }) {
  // Import Layout styles from context
  const { layout } = useContext(StylesContext);

  return (
    <main className={layout.root}>
      {children}
      <div className={layout.navbar}>
        <MobileNav />
      </div>
    </main>
  );
}
