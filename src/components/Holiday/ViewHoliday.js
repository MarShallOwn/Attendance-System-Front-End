import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  MediumDeleteButton,
  MediumPrimaryButton,
  MediumSecondaryButton,
} from "../../styles/globalStyle";
import { handleValidation, Password } from "./holidayService";
import customAxios from "../../customAxios";
import { flashTypesConstants } from "../../constants";
import { flashActions } from "../../actions/flashMessageAction";
import { connect } from "react-redux";
import HolidayForm from "./HolidayForm";
import { Modal } from "@mui/material";
import { deleteEntity } from "../../services/appServices";

const ViewHoliday = (props) => {
  // state that holdes fields data
  const [fields, setFields] = useState({
    name: "",
    type: "",
    startDate: "",
    noOfDays: "",
    endDate: ""
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
    endDate: []
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  // get user from backend using userId and store him inside state
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
    deleteEntity(`/auth/employer/delete/${state.holidayId}`)
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

  return (
    <div className="form-div">
      <Modal open={modalOpen}>
        <div className="modal-style">
          <div className="modal-container">
            <h1 className="modal-title">Delete {fields.firstname} {fields.lastname}</h1>
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
        errors={errors}
        formFor="View"
      />
      <div className="form-buttons-div">
      <Link to="/holiday/edit" state={{holidayId: state.holidayId}}>
        <MediumPrimaryButton>Edit</MediumPrimaryButton>
        </Link>
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

export default connect(null, mapDispatchToProps)(ViewHoliday);
