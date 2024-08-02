import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Enquiry from "./pages/Trainee/EnquiryPage"
import Course from "./pages/Trainee/CoursePage"
import AOS from 'aos';

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
            <Route path="/course" element={<Course/>}/>
            <Route path="/enquiry" element={<Enquiry/>}/>
          
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
