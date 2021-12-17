import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { regex } from "../regex";
import { Link } from 'react-router-dom'
import {
  LargePrimaryButton,
  Input,
} from "../styles/globalStyle";
import styled from "styled-components";
import classes from "./Login.module.css";
import sizes from "../styles/sizes";
import colors from "../styles/colors";

// svgs
import door from "../images/door.svg";
import logo from "../images/logo.svg";
import manLeft from "../images/man_left.svg";
import manRight from "../images/man_right.svg";
import okra from "../images/okra.svg"
import lamp from "../images/lamp.svg"

const LoginInput = styled(Input)`
  width: 344px;
  margin-top: .5rem;
`;

const forgotPasswordStyle = {
  color: colors.GRAY,
  fontSize: sizes.SMALLER
} 

const Label = styled.label`
  color: ${colors.GRAY};
`;

const Login = props => {
  const navigate = useNavigate();

  const [fields, setfields] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  useEffect(() => {

    props.setShowNav(false)

    return () => {
      props.setShowNav(true)
    }
  }, [])

  const handleSubmit = () => {
    if (!handleValidation()) return;
    const { email, password } = fields;
    props.login(email, password, navigate);
  };

  const handleValidation = () => {
    let isValid = true;
    const fieldsErr = {
      email: [],
      password: [],
    };

    // email
    if (fields.email.trim().length === 0) {
      isValid = false;
      fieldsErr.email.push("email is required");
    }

    if (!fields.email.toLowerCase().match(regex.EMAIL)) {
      isValid = false;
      fieldsErr.email.push("Field Should be a E-mail format");
    }

    // password
    if (fields.password.trim().length === 0) {
      isValid = false;
      fieldsErr.password.push("password is required");
    }

    if (fields.password.length < 6) {
      isValid = false;
      fieldsErr.password.push("password shouldn't be less than 6 characters");
    }

    console.log(fieldsErr);

    setErrors(fieldsErr);

    return isValid;
  };

  return (
    <div className={classes.login}>
      <img className={classes.logo} src={logo} />
      <div className={classes.leftMan}>
        <img src={manLeft} />
      </div>
      <div className={classes.loginForm}>
        <img className={classes.door} src={door} />
        <div className={classes.form}>
          <img className={classes.okra} src={okra} />
          <h2 className={classes.title}>Welcome back to ATMS !</h2>
          <div>
            <Label>Email or full name</Label>
            <LoginInput
              onChange={(e) => setfields({ ...fields, email: e.target.value })}
            ></LoginInput>
            {errors.email.map((error, index) => (
              <span key={index} style={{ color: "red" }}>
                {error}
              </span>
            ))}
          </div>

          <div className={classes.passwordDiv}>
            <Label>Password</Label>
            <LoginInput
              onChange={(e) =>
                setfields({ ...fields, password: e.target.value })
              }
            ></LoginInput>
            {errors.password.map((error, index) => (
              <span key={index} style={{ color: "red" }}>
                {error}
              </span>
            ))}
          </div>

          <LargePrimaryButton className={classes.loginButton} onClick={handleSubmit}>Log in</LargePrimaryButton>
          <Link className={classes.forgotPassword} style={forgotPasswordStyle} to="/forgot-password">Forgot password ?</Link>
        </div>
      </div>
      <div className={classes.rightMan}>
        <img className={classes.lamp} src={lamp} />
      <img src={manRight} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password, navigate) => {
      dispatch(userActions.login(username, password, navigate));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
