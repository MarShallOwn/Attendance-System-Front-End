import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  MediumDeleteButton,
  MediumPrimaryButton,
  MediumSecondaryButton,
} from "../../styles/globalStyle";
import { handleValidation, Password } from "./userService";
import customAxios from "../../customAxios";
import { flashTypesConstants } from "../../constants";
import { flashActions } from "../../actions/flashMessageAction";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { Modal } from "@mui/material";
import { deleteEntity } from "../../services/appServices";

const EditUser = (props) => {
  // state that holdes fields data
  const [fields, setFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    nationalID: "",
    phoneNumber: "",
    password: "",
  });

  // state that handles modal close and open
  const [modalOpen, setModalOpen] = useState(false);

  // state for error
  const [errors, setErrors] = useState({
    firstname: [],
    lastname: [],
    username: [],
    email: [],
    nationalID: [],
    phoneNumber: [],
    password: [],
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  // get user from backend using userId and store him inside state
  useEffect(() => {
    if (!state) return;

    customAxios
      .get(`/auth/employer/${state.userId}`)
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

  // function that generate password inside password field and store it to state
  const passwordFieldHandler = () => {
    setFields({ ...fields, password: Password.generate(16) });
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
    deleteEntity(`/auth/employer/delete/${state.userId}`)
      .then((res) => {
        setModalOpen(false);
        if (res.status === 204) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "User Deleted"
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
      .put(`/auth/employer/edit/${state.userId}`, { ...fields })
      .then((res) => {
        if (res.status === 204) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "User Edited"
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
            <h1 className="modal-title">Delete {fields.firstname} {fields.lastname}</h1>
            <p className="modal-body">
              Warning: Are you sure you want to delete this user ? if you
              delete this user , data will be deleted
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
      <UserForm
        fields={fields}
        fieldsHandler={fieldsHandler}
        errors={errors}
        checkNumbersHandler={checkNumbersHandler}
        passwordFieldHandler={passwordFieldHandler}
        formFor="Edit"
      />
      <div className="form-buttons-div">
        <MediumPrimaryButton onClick={submitHandler}>Edit</MediumPrimaryButton>
        <Link to="/user/list">
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

export default connect(null, mapDispatchToProps)(EditUser);
