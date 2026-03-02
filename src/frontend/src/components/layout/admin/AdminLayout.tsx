import AdminSidebar from "./AdminSidebar";
import Header from "../Header";
import Footer from "../Footer";
import type { ReactNode } from "react";

interface AdminLayoutProps{
  children: ReactNode;
}

const AdminLayout = ({children}: AdminLayoutProps) => {
  return (
    <div className="d-flex">
      <AdminSidebar />
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
export default AdminLayout;