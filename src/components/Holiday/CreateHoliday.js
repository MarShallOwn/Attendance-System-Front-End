import { useState } from "react";
import { handleValidation } from "./holidayService";
import customAxios from "../../customAxios";
import {
  MediumPrimaryButton,
  MediumSecondaryButton,
} from "../../styles/globalStyle";
import { connect } from "react-redux";
import { flashActions } from "../../actions/flashMessageAction";
import { flashTypesConstants } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import HolidayForm from "./HolidayForm";

const CreateHoliday = (props) => {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    name: "",
    type: "",
    startDate: new Date(),
    noOfDays: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({
    name: [],
    lastname: [],
    type: [],
    startDate: [],
    noOfDays: [],
    endDate: [],
  });

  const fieldsHandler = (e) => {
    setFields({ ...fields, [e.currentTarget.id]: e.currentTarget.value });
  };

  // for dates
  const dateHandler = (date, newValue) => {
    setFields({ ...fields, [date]: newValue });
  };


  // for number of days
  const noOfDaysHandler = (e) => {
    const noOfDays = e.currentTarget.value

    console.log(fields.startDate);
    const endDate = new Date(fields.startDate);
    endDate.setDate(endDate.getDate() + (noOfDays.length !== 0 ? parseInt(noOfDays): 0));

    setFields({ ...fields, noOfDays, endDate });
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
      .post("/holiday/create/", { ...fields })
      .then((res) => {
        if (res.status === 201) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "Holiday Created"
          );
          navigate("/holiday/list");
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
      <HolidayForm
        fields={fields}
        fieldsHandler={fieldsHandler}
        errors={errors}
        checkNumbersHandler={checkNumbersHandler}
        dateHandler={dateHandler}
        noOfDaysHandler={noOfDaysHandler}
      />
      <div className="form-buttons-div">
        <MediumPrimaryButton onClick={submitHandler}>Add</MediumPrimaryButton>
        <Link to="/holiday/list">
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

export default connect(null, mapDispatchToProps)(CreateHoliday);
