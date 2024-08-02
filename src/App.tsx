import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./Layout";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Add this line to import AOS styles
import Course from './components/Trainee/Course/Course';
import DailyReport from "./pages/Trainee/DailyReport";

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
          <Route path="DailyReport" element={<DailyReport />} />
\        </Route>
      </Routes>
    </Router>
  );
}

export default App;
