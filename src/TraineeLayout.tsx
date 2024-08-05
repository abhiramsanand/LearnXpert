import { Outlet } from "react-router-dom";
import Footer from "./constants/Footer";

const TraineeLayout = () => {
  return (
    <>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default TraineeLayout;
