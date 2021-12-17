import { regex } from "../regex";

// checks the validation of the form
export const handleValidation = (fields, setErrors) => {
    let isValid = true;
    const fieldsErr = {
      email: [],
      password: [],
    };

    // email
    if (fields.email.trim().length === 0) {
      isValid = false;
      fieldsErr.email.push("email is required");
    }

    if (!fields.email.toLowerCase().match(regex.EMAIL)) {
      isValid = false;
      fieldsErr.email.push("Field Should be a E-mail format");
    }

    // password
    if (fields.password.trim().length === 0) {
      isValid = false;
      fieldsErr.password.push("password is required");
    }

    if (fields.password.length < 6) {
      isValid = false;
      fieldsErr.password.push("password shouldn't be less than 6 characters");
    }

    setErrors(fieldsErr);

    return isValid;
  };
