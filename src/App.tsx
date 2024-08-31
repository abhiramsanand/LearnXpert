/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fontsource/montserrat";
import TraineeLayout from "./Layouts/TraineeLayout";
import CoursePage from "./pages/Trainee/CoursePage";
import AssessmentPage from "./pages/Trainee/AssessmentPage";
import DailyReport from "./pages/Trainee/DailyReportPage";
import WholeReportPage from "./pages/Trainee/WholeReportPage";
import EnquiryPage from "./pages/Trainee/EnquiryPage";
import TraineeDashboardPage from "./pages/Trainee/DashboardPage";
import AdminAssessmentDetailsPage from "./pages/Admin/AdminAssessmentDetailsPage";
import AdminAssessmentCreationPage from "./pages/Admin/AdminAssessmentCreationPage";
import AdminCoursePage from "./pages/Admin/AdminCoursePage";
import TraineeCourseReportPage from "./pages/Admin/TraineeCourseReportPage";

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
import AdminLayout from "./Layouts/AdminLayout";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import CreateAdminPage from "./pages/Admin/CreateAdminPage";
import ManageBatchPage from "./pages/Admin/ManageBatchPage";
import LoginPage from "./pages/Login/LoginPage";
import BatchAdd2 from "./pages/Admin/BatchAdd2";
import BatchForm from "./components/Admin/BatchCreate1/BatchForm";
import AdminReportPage from "./pages/Admin/AdminReportPage";
import TraineesPage from "./pages/Admin/TraineesPage";
import TraineeReport from "./pages/Admin/TraineeCourseReportPage";
import AssessmentDisplayPage from "./pages/Trainee/AssessmentDisplayPage";
import CreateCoursePage from "./pages/Admin/CreateCoursePage";
import CalendarComponent from "./components/Admin/ManageBatch/Calendar";

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<TraineeLayout />}>
          <Route path="/Trainee-Dashboard" element={<TraineeDashboardPage />} />
          <Route path="Trainee-Courses" element={<CoursePage />} />
          <Route path="Trainee-Assessments" element={<AssessmentPage />} />
          <Route path="Trainee-Dailyreport" element={<DailyReport />} />
          <Route path="Trainee-Wholereport" element={<WholeReportPage />} />
          <Route path="Trainee-Enquiry" element={<EnquiryPage />} />
          <Route path="/Trainee-Assessments/assessment" element={<AssessmentDisplayPage />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="Admin-Home" element={<AdminHomePage />} />
       <Route path="/Admin-Assessments" element={<AdminAssessmentDetailsPage />} />

          <Route
            path="/Admin-AssessmentCreation"
            element={<AdminAssessmentCreationPage />}
          />
          <Route
            path="/Admin-CourseCreation"
            element={<CreateCoursePage />}
          />
          <Route
            path="/Add-Admin"
            element={
              <CreateAdminPage
                onDeleteClick={function (_admin: {
                  slno: number;
                  name: string;
                }): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="/Admin-Batches" element={<TraineeCourseReportPage />} />
          <Route path="/Admin-ManageBatch/:batchId" element={<ManageBatchPage />} />
          <Route path="Admin-BatchAdd" element={<BatchForm />} />
          <Route path="Admin-BatchAdd2/:batchId" element={<BatchAdd2 />} />
          <Route path="/Admin-DailyReport" element={<AdminReportPage />} />
          <Route path="/Admin-Trainees" element={<TraineesPage />} />
          <Route path="/trainee/:id" element={<TraineeReport />} />
          <Route path="/Admin-Courses" element={<AdminCoursePage />} />
          <Route path="/Admin-Calendar" element={<CalendarComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
