import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface LayoutProps{
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return(
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column w-100">
        <Header/>
        <main className="p-4 flex-grow-1">
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  )
}
export default Layout;