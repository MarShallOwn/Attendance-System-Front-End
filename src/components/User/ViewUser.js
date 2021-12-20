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

const ViewUser = (props) => {
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
        }
      });
  }, [state]);

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
        }
      });

    setModalOpen(false);
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
        errors={errors}
        formFor="View"
      />
      <div className="form-buttons-div">
      <Link to="/user/edit" state={{userId: state.userId}}>
        <MediumPrimaryButton>Edit</MediumPrimaryButton>
        </Link>
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

export default connect(null, mapDispatchToProps)(ViewUser);
