import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import LoginForm from "./LoginForm";
// svgs
import logo from "../../images/logo.svg";
import manLeft from "../../images/man_left.svg";
import manRight from "../../images/man_right.svg";

import lamp from "../../images/lamp.svg";

const Login = props => {
  const navigate = useNavigate();

  return (
    <div className={classes.login}>
      <img className={classes.logo} src={logo} />
      <div className={classes.leftMan}>
        <img src={manLeft} />
      </div>
      <LoginForm navigate={navigate} />
      <div className={classes.rightMan}>
        <img className={classes.lamp} src={lamp} />
        <img src={manRight} />
      </div>
    </div>
  );
};

export default Login
