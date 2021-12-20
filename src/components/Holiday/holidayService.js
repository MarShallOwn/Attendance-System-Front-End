import { regex } from "../../regex";

// checks the validation of the form
export const handleValidation = (fields, setErrors, response) => {

  let isValid = true;
  const fieldsErr = {
    name: [],
    type: [],
    startDate: [],
    noOfDays: [],
    endDate: [],
  };

  if(response){
    setErrors({...fieldsErr, ...fields})
    return
  }

  // name
  if (fields.name.trim().length < 2) {
    isValid = false;
    fieldsErr.name.push("name shouldnt be less than 2 characters");
  }

  // type
  if (fields.type.trim().length < 2) {
    isValid = false;
    fieldsErr.type.push("type shouldnt be less than 2 characters");
  }

  setErrors(fieldsErr);

  return isValid;
};

