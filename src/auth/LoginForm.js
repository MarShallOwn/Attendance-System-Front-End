import React, { useState } from "react";
import { handleValidation } from "./loginService";
import { Link } from "react-router-dom";
import { LargePrimaryButton } from "../styles/globalStyle";
import { connect } from "react-redux";
import { userActions } from "../actions/userAction";
import { Input } from "../styles/globalStyle";
import styled from "styled-components";
import classes from "./Login.module.css";
import sizes from "../styles/sizes";
import colors from "../styles/colors";

// svg
import okra from "../images/okra.svg";
import door from "../images/door.svg";

const LoginForm = (props) => {
  const { navigate } = props;

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  // when the user clicks on log in the function get triggered what it checks if the validation if true
  // if it is true it proceed to send the data to the back-end
  const handleSubmit = () => {
    if (!handleValidation(fields, setErrors)) return;
    const { email, password } = fields;
    props.login(email, password, navigate);
  };

  return (
    <div className={classes.loginForm}>
      <img className={classes.door} src={door} />
      <div className={classes.form}>
        <img className={classes.okra} src={okra} />
        <h2 className={classes.title}>Welcome back to ATMS !</h2>
        <div>
          <Label>Email or full name</Label>
          <LoginInput
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
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
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          ></LoginInput>
          {errors.password.map((error, index) => (
            <span key={index} style={{ color: "red" }}>
              {error}
            </span>
          ))}
        </div>

        <LargePrimaryButton
          className={classes.loginButton}
          onClick={handleSubmit}
        >
          Log in
        </LargePrimaryButton>
        <Link
          className={classes.forgotPassword}
          style={forgotPasswordStyle}
          to="/forgot-password"
        >
          Forgot password ?
        </Link>
      </div>
    </div>
  );
};

// Styling
const LoginInput = styled(Input)`
  width: 344px;
  margin-top: 0.5rem;
`;

const forgotPasswordStyle = {
  color: colors.GRAY,
  fontSize: sizes.SMALLER,
};

const Label = styled.label`
  color: ${colors.GRAY};
`;

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password, navigate) => {
      dispatch(userActions.login(username, password, navigate));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
