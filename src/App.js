import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Navbar from "./Navbar";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./Profile/index";
import { useState } from "react";

const App = () => {

  const [showNav, setShowNav] = useState(true)

  return (
    <div>
      {showNav && <Navbar/>}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setShowNav={setShowNav} />} />
          <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
