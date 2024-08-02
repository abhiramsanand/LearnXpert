import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AOS from 'aos';
import AssessmentPage from "./pages/Trainee/AssessmentPage";
import WholeReportPage from "./pages/Trainee/WholeReportPage";



function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <div className="App">
        <main className="main-content">
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/AssessmentPage" element={<AssessmentPage />} />
            <Route path="/WholeReportPage" element={<WholeReportPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
