import React, { useState } from "react";
import classes from "./Department.module.css"
import { MenuItem, Select, TextField, TableCell } from "@mui/material";
import { SmallPrimaryButton, SmallSecondaryButton } from "../../styles/globalStyle";
import customAxios from "../../customAxios";
import { flashTypesConstants } from "../../constants";
import { flashActions } from "../../actions/flashMessageAction";
import { connect } from "react-redux";
import { handleValidation } from "./departmentService";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";

const EditDepartment = (props) => {
  const { handleModalDelete, listUpdated, setListUpdated, department, usersList, handleActiveEdit } = props;

  const [fields, setFields] = useState({
    departmentName: department.departmentName,
    departmentDesc: department.departmentDesc,
    departmentHeadID: department.departmentHeadID,
  });

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

    console.log(fields)
    console.log(department.id)

    customAxios
      .put(`/department/update/${department.id}`, { ...fields })
      .then((res) => {
          console.log(res.status)
        if (res.status === 204) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "Department Edited"
          );
          setListUpdated(!listUpdated);
          handleActiveEdit();
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something Went Wrong"
          );
        }
      }).catch((err) => {
        console.log(err);
        props.flashMessageHandler(
          "open",
          flashTypesConstants.ERROR,
          "Something Went Wrong"
        );
        handleValidation(err.response.data.error, setErrors, true);
      });
  };

  return (
    <>
      <TableCell align="left">
        <TextField
          value={fields.departmentName}
          name="departmentName"
          className={classes.editField}
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
              {errors.departmentName.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      </TableCell>
      <TableCell align="left">
        <Select
          className={classes.selectField}
          style={{width: "15rem"}}
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
        {errors.departmentHeadID.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      </TableCell>
      <TableCell align="left">
        <TextField
          value={fields.departmentDesc}
          name="departmentDesc"
          className={classes.editField}
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
              {errors.departmentDesc.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      </TableCell>
      <TableCell align="left">
        <div className={classes.actionStyle}>
          <img id={department.id} onClick={handleActiveEdit} src={editIcon} className={classes.activeIconStyle} />
          <img
            id={department.id}
            onClick={handleModalDelete}
            src={deleteIcon}
          />
        </div>
        <div>
            <SmallSecondaryButton id={department.id} onClick={handleActiveEdit}>Cancel</SmallSecondaryButton>
            <SmallPrimaryButton onClick={handleSubmit} className={classes.editSaveButton}>Save</SmallPrimaryButton>
        </div>
      </TableCell>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessageHandler: (handlerType, flashType, flashMessage) => {
      dispatch(flashActions.flashMessage(handlerType, flashType, flashMessage));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditDepartment);
