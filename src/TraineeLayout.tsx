import { Outlet } from "react-router-dom";
import Footer from "./constants/Footer";

const Layout = () => {
  return (
    <>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
