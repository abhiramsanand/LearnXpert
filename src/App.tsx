import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./pages/Login/LoginPage";
import Layout from "./Layout";
import CoursePage from "./pages/Trainee/CoursePage";
import AssessmentPage from "./pages/Trainee/AssessmentPage";
import DailyReport from "./pages/Trainee/DailyReportPage";
import WholeReportPage from "./pages/Trainee/WholeReportPage";
import EnquiryPage from "./pages/Trainee/EnquiryPage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="Courses" element={<CoursePage />} />
          <Route path="Assessments" element={<AssessmentPage />} />
          <Route path="Dailyreport" element={<DailyReport />} />
          <Route path="Wholereport" element={<WholeReportPage />} />
          <Route path="Enquiry" element={<EnquiryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
