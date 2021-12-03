import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./Navbar";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./Profile/index";

function App() {
  return (
    <div>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
