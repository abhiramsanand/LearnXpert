import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./Layout";
import AOS from 'aos';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Layout />}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
