import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./pages/Login/LoginPage";
import TraineeLayout from "./TraineeLayout";
import CoursePage from "./pages/Trainee/CoursePage";
import AssessmentPage from "./pages/Trainee/AssessmentPage";
import DailyReport from "./pages/Trainee/DailyReportPage";
import WholeReportPage from "./pages/Trainee/WholeReportPage";
import EnquiryPage from "./pages/Trainee/EnquiryPage";
import TraineeDashboardPage from "./pages/Trainee/DashboardPage";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AdminLayout from "./AdminLayout";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminWholeReportPage from "./pages/Admin/AdminWholeReportPage";
import CreateAdminPage from "./pages/Admin/CreateAdminPage";
import NewAssessmentPage from "./pages/Trainee/NewAssessmentPage";
import ReportPage from "./pages/Trainee/ReportPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Trainee-Dashboard" element={<TraineeDashboardPage />} />
        <Route path="/" element={<TraineeLayout />}>
          <Route path="Trainee-Courses" element={<CoursePage />} />
          <Route path="Trainee-Assessments" element={<AssessmentPage />} />
          <Route path="Trainee-Dailyreport" element={<DailyReport />} />
          <Route path="Trainee-Wholereport" element={<WholeReportPage />} />
          <Route path="Trainee-Enquiry" element={<EnquiryPage />} />
         
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="Admin-Home" element={<AdminHomePage />} />
          <Route path="Admin-Report" element={<AdminWholeReportPage/>} />
          <Route path="Admin-Creation" element={<CreateAdminPage/>} />
          <Route path="Trainee-NewAssessment" element={<NewAssessmentPage />} />
          <Route path="Trainee-NewReport" element={<ReportPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
