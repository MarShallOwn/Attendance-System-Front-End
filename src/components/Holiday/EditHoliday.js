import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  MediumDeleteButton,
  MediumPrimaryButton,
  MediumSecondaryButton,
} from "../../styles/globalStyle";
import { handleValidation } from "./holidayService";
import customAxios from "../../customAxios";
import { flashTypesConstants } from "../../constants";
import { flashActions } from "../../actions/flashMessageAction";
import { connect } from "react-redux";
import HolidayForm from "./HolidayForm";
import { Modal } from "@mui/material";
import { deleteEntity } from "../../services/appServices";

const EditHoliday = (props) => {
  // state that holdes fields data
  const [fields, setFields] = useState({
    name: "",
    type: "",
    startDate: "",
    noOfDays: "",
    endDate: "",
  });

  // state that handles modal close and open
  const [modalOpen, setModalOpen] = useState(false);

  // state for error
  const [errors, setErrors] = useState({
    name: [],
    lastname: [],
    type: [],
    startDate: [],
    noOfDays: [],
    endDate: [],
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  // get holiday from backend using holidayId and store him inside state
  useEffect(() => {
    if (!state) return;

    customAxios
      .get(`/holiday/${state.holidayId}`)
      .then((res) => {
        if (res.status === 200) {
          setFields({ ...fields, ...res.data.data });
        }
      })
      .catch((err) => {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
      });
  }, [state]);

  // function gets value from text field and store it to state
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

  // function checks first if the value is only number if not reject it, if yes then gets value from text field and store it to state
  const checkNumbersHandler = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.currentTarget.value === "" || re.test(e.currentTarget.value)) {
      setFields({ ...fields, [e.currentTarget.id]: e.currentTarget.value });
    }
  };

  // handle the open of the modal to confirm before deleting the item
  const handleDelete = () => {
    setModalOpen(true);
  };

  // handle the close of the modal
  const handleCancel = () => {
    setModalOpen(false);
  };

  // handle the delete of the item and close of the modal
  const handleConfirmDelete = () => {
    deleteEntity(`/holiday/${state.holidayId}`)
      .then((res) => {
        setModalOpen(false);
        if (res.status === 204) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "Holiday Deleted"
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
        setModalOpen(false);
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
      });

    setModalOpen(false);
  };

  // before submit we validate fields and if they pass validation we proceed to api connection
  const submitHandler = () => {
    if (!handleValidation(fields, setErrors, null, true)) return;

    console.log("ayyy");

    customAxios
      .put(`/auth/employer/edit/${state.holidayId}`, { ...fields })
      .then((res) => {
        if (res.status === 201) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "Holiday Edited"
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
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
          handleValidation(err.response.data.error, setErrors, true, true);
      });
  };

  return (
    <div className="form-div">
      <Modal open={modalOpen}>
        <div className="modal-style">
          <div className="modal-container">
            <h1 className="modal-title">Delete {fields.name}</h1>
            <p className="modal-body">
              Warning: Are you sure you want to delete this holiday ? if you
              delete this holiday , data will be deleted
            </p>
            <div className="modal-buttons">
              <MediumSecondaryButton onClick={handleCancel}>
                Cancel
              </MediumSecondaryButton>
              <MediumDeleteButton onClick={handleConfirmDelete}>
                Delete
              </MediumDeleteButton>
            </div>
          </div>
        </div>
      </Modal>
      <HolidayForm
        fields={fields}
        fieldsHandler={fieldsHandler}
        errors={errors}
        checkNumbersHandler={checkNumbersHandler}
        dateHandler={dateHandler}
        noOfDaysHandler={noOfDaysHandler}
      />
      <div className="form-buttons-div">
        <MediumPrimaryButton onClick={submitHandler}>Edit</MediumPrimaryButton>
        <Link to="/holiday/list">
          <MediumSecondaryButton>Cancel</MediumSecondaryButton>
        </Link>
        <MediumDeleteButton onClick={handleDelete}>Delete</MediumDeleteButton>
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

export default connect(null, mapDispatchToProps)(EditHoliday);
