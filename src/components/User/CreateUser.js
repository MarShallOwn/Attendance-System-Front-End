import { useState } from "react";
import { handleValidation, Password } from "./userService";
import UserForm from "./UserForm";
import customAxios from "../../customAxios";
import {
  MediumPrimaryButton,
  MediumSecondaryButton,
} from "../../styles/globalStyle";
import { connect } from "react-redux";
import { flashActions } from "../../actions/flashMessageAction";
import { flashTypesConstants } from "../../constants";
import { useNavigate, Link } from "react-router-dom";

const CreateUser = (props) => {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    nationalID: "",
    phoneNumber: "",
    password: `${Password.generate(16)}`,
  });
  const [errors, setErrors] = useState({
    firstname: [],
    lastname: [],
    username: [],
    email: [],
    nationalID: [],
    phoneNumber: [],
    password: [],
  });

  const fieldsHandler = (e) => {
    setFields({ ...fields, [e.currentTarget.id]: e.currentTarget.value });
  };

  const passwordFieldHandler = () => {
    setFields({ ...fields, password: Password.generate(16) });
  };

  const checkNumbersHandler = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.currentTarget.value === "" || re.test(e.currentTarget.value)) {
      setFields({ ...fields, [e.currentTarget.id]: e.currentTarget.value });
    }
  };

  const submitHandler = () => {
    if (!handleValidation(fields, setErrors)) return;

    customAxios
      .post("/auth/employer/create/", { ...fields })
      .then((res) => {
        if (res.status === 201) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "User Created"
          );
          navigate("/user/list");
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something Went Wrong"
          );
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "You don't have Authorization to show that"
          );
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
          handleValidation(err.response.data.error, setErrors, true);
        }
      });
  };

  return (
    <div className="form-div">
      <UserForm
        fields={fields}
        fieldsHandler={fieldsHandler}
        errors={errors}
        checkNumbersHandler={checkNumbersHandler}
        passwordFieldHandler={passwordFieldHandler}
      />
      <div className="form-buttons-div">
        <MediumPrimaryButton onClick={submitHandler}>Add</MediumPrimaryButton>
        <Link to="/user/list">
          <MediumSecondaryButton>Cancel</MediumSecondaryButton>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessageHandler: (handlerType, flashType, flashMessage) => {
      dispatch(flashActions.flashMessage(handlerType, flashType, flashMessage));
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
