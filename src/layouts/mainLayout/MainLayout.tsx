import type { ReactNode } from "react";

import styles from "./MainLayout.module.css";
import Navbar from "../../components/navigation/Navbar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
       <Navbar />
      {children}
    </div>
  );
}

export default MainLayout; 