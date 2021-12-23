import React, { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import classes from "./Department.module.css";
import { MediumPrimaryButton, MediumSecondaryButton } from "../../styles/globalStyle";
import customAxios from "../../customAxios";
import { flashTypesConstants } from "../../constants";
import { flashActions } from "../../actions/flashMessageAction";
import { connect } from "react-redux";
import { handleValidation } from "./departmentService";

const CreateDepartment = (props) => {
  const [fields, setFields] = useState({
    departmentName: "",
    departmentDesc: "",
    departmentHeadID: "",
  });

  const { usersList, listUpdated, setListUpdated, setOpenAddSection } = props;

  const [errors, setErrors] = useState({
    departmentName: [],
    departmentDesc: [],
    departmentHeadID: [],
  });

  const fieldsHandler = (e) => {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
  };

  const selectHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    customAxios
      .post("/department/create", { ...fields })
      .then((res) => {
        if (res.status === 201) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "Department Created"
          );
          setOpenAddSection(false)
          setListUpdated(!listUpdated);
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something Went Wrong"
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        props.flashMessageHandler(
          "open",
          flashTypesConstants.ERROR,
          "Something Went Wrong"
        );
        handleValidation(err.response.data.error, setErrors, true);
      });
  };

  return (
    <div className={classes.createContainer}>
      <div className="field-div">
        <label className={classes.fieldLabel}>Department name</label>
        <TextField
          value={fields.departmentName}
          name="departmentName"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.departmentName.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
            <div className="field-div">
        <label className={classes.fieldLabel}>Department Description</label>
        <TextField
          value={fields.departmentDesc}
          name="departmentDesc"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.departmentName.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label className={classes.fieldLabel}>Department Head</label>
        <Select
          className={classes.selectField}
          value={fields.departmentHeadID}
          name="departmentHeadID"
          size="small"
          required
          onChange={selectHandler}
          variant="outlined"
        >
          {usersList.map((user, index) => (
            <MenuItem key={index} value={user.id}>
              {user.firstname} {user.lastname}
            </MenuItem>
          ))}
        </Select>
      </div>
      {errors.departmentHeadID.map((error, index) => (
        <span key={index} style={{ color: "red", display: "block" }}>
          {error}
        </span>
      ))}
      <div className={classes.addDepartmentButtonContainer}>
      <MediumSecondaryButton style={{marginRight: "2rem"}} onClick={() => setOpenAddSection(false)}>Cancel</MediumSecondaryButton>
        <MediumPrimaryButton onClick={handleSubmit}>Add</MediumPrimaryButton>
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

export default connect(null, mapDispatchToProps)(CreateDepartment);
