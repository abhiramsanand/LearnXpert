import { Outlet } from "react-router-dom";
import Footer from "./shared components/Footer";
import AdminHeader from "./shared components/AdminHeader";
import Sidebar from "./shared components/Sidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
