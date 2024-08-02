import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import Course from "./components/Trainee/Course/Course";
import DailyReport from "./pages/Trainee/DailyReport";
import WholeReportPage from "./pages/Trainee/WholeReportPage";
import AssessmentPage from "./pages/Trainee/AssessmentPage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="Course" element={<Course />} />
          <Route path="Dailyreport" element={<DailyReport />} />
          <Route path="Wholereport" element={<WholeReportPage />} />
          <Route path="Assessment" element={<AssessmentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
