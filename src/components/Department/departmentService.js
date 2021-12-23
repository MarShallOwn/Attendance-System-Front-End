// checks the validation of the form
export const handleValidation = (fields, setErrors, response, editPage) => {
  let isValid = true;
  const fieldsErr = {
    firstname: [],
    lastname: [],
    username: [],
    email: [],
    nationalID: [],
    phoneNumber: [],
    password: [],
  };

  if (response) {
    setErrors({ ...fieldsErr, ...fields });
    return;
  }

  // department name
  if (fields.departmentName.trim().length <= 0) {
    isValid = false;
    fieldsErr.firstname.push("department name required");
  }

  // department description
  if (fields.departmentDesc.trim().length <= 0) {
    isValid = false;
    fieldsErr.lastname.push("department description required");
  }

  // department head id
  if (fields.departmentHeadID.trim().length <= 0) {
    isValid = false;
    fieldsErr.username.push("department head required");
  }

  setErrors(fieldsErr);

  return isValid;
};
