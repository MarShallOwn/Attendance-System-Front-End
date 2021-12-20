import { regex } from "../../regex";

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

  if(response){
    setErrors({...fieldsErr, ...fields})
    return
  }

  // firstname
  if (fields.firstname.trim().length < 3) {
    isValid = false;
    fieldsErr.firstname.push("firstname shouldnt be less than 3 characters");
  }

  // lastname
  if (fields.lastname.trim().length < 3) {
    isValid = false;
    fieldsErr.lastname.push("lastname shouldnt be less than 3 characters");
  }

  // username
  if (fields.username.trim().match(regex.USERNAME)) {
    isValid = false;
    fieldsErr.username.push(
      "This value may contain only letters, ' 'numbers, and @/./+/-/ characters"
    );
  }

  // email
  if (fields.email.trim().length === 0) {
    isValid = false;
    fieldsErr.email.push("email is required");
  }

  if (!fields.email.toLowerCase().match(regex.EMAIL)) {
    isValid = false;
    fieldsErr.email.push("Field Should be a E-mail format");
  }

  if(!editPage){
  // password
  if (fields.password.trim().length < 6) {
    isValid = false;
    fieldsErr.password.push("password shouldn't be less than 6 characters");
  }

  }

  // national ID
  if (fields.nationalID.trim().length !== 14) {
    isValid = false;
    fieldsErr.nationalID.push("National ID should be of 14-digits");
  }

  // Phone Number
  if (
    !fields.phoneNumber.trim().match(regex.PHONE_NUMBER) ||
    fields.phoneNumber.trim().length !== 11
  ) {
    isValid = false;
    fieldsErr.phoneNumber.push("Not A valid Phone Number");
  }

  setErrors(fieldsErr);

  return isValid;
};


export const Password = {
  _pattern: /[a-zA-Z0-9_\-\+\.]/,

  _getRandomByte: function () {
    // http://caniuse.com/#feat=getrandomvalues
    if (window.crypto && window.crypto.getRandomValues) {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    } else if (window.msCrypto && window.msCrypto.getRandomValues) {
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    } else {
      return Math.floor(Math.random() * 256);
    }
  },

  generate: function (length) {
    return Array.apply(null, { length: length })
      .map(function () {
        var result;
        while (true) {
          result = String.fromCharCode(this._getRandomByte());
          if (this._pattern.test(result)) {
            return result;
          }
        }
      }, this)
      .join("");
  },
};
