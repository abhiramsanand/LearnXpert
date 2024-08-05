import { Outlet } from "react-router-dom";
import Footer from "./constants/Footer";

const AdminLayout = () => {
  return (
    <>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
