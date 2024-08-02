import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./Layout";
import AOS from 'aos';
import Course from './components/Trainee/Course/Course'
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
        <Route path="WholeReport" element={<WholeReportPage />} />
        <Route path="Assessments" element={<AssessmentPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
