import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./Layout";
import AOS from 'aos';
import Course from './pages/Trainee/CoursePage';
import EnquiryPage from "./pages/Trainee/EnquiryPage";
import CoursePage from "./pages/Trainee/CoursePage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Layout />}>
        <Route path="Course" element={<CoursePage />} />
        <Route path="Enquiry" element={<EnquiryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
