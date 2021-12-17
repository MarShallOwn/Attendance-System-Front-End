import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login/Login";
import SystemWrapper from "./components/SystemWrapper/SystemWrapper";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile/index";

const App = () => {


  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<SystemWrapper><Home /></SystemWrapper>} />
          <Route path="/login" element={<Login />} />
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
