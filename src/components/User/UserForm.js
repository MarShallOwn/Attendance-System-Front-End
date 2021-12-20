import InputAdornment from "@mui/material/InputAdornment";
import refreshIcon from "../../images/refresh.svg";
import { TextField } from "@mui/material";

const UserForm = (props) => {
  const {
    fields,
    fieldsHandler,
    errors,
    checkNumbersHandler,
    passwordFieldHandler,
    formFor,
  } = props;

  return (
    <div>
      <div className="field-div">
        <label>Firstname</label>
        <TextField
          value={fields.firstname}
          id="firstname"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.firstname.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Lastname</label>
        <TextField
          value={fields.lastname}
          id="lastname"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.lastname.map((error, index) => (
        <span key={index} style={{ color: "red", display: "block" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Username</label>
        <TextField
          value={fields.username}
          id="username"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.username.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Email</label>
        <TextField
          value={fields.email}
          id="email"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.email.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>National ID</label>
        <TextField
          value={fields.nationalID}
          id="nationalID"
          className="form-field"
          size="small"
          required
          onChange={checkNumbersHandler}
          variant="outlined"
        />
      </div>
      {errors.nationalID.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Phone Number</label>
        <TextField
          value={fields.phoneNumber}
          id="phoneNumber"
          className="form-field"
          size="small"
          required
          onChange={checkNumbersHandler}
          variant="outlined"
        />
      </div>
      {errors.phoneNumber.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Department</label>
        <TextField className="form-field" size="small" variant="outlined" />
      </div>
      {!(formFor === "Edit" || formFor === "View") && (
        <>
          <div className="field-div">
            <label>Password</label>
            <TextField
              value={fields.password}
              id="password"
              className="form-field"
              size="small"
              required
              onChange={fieldsHandler}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      onClick={passwordFieldHandler}
                      className="icon-field"
                      src={refreshIcon}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {errors.password.map((error, index) => (
            <span key={index} style={{ color: "red" }}>
              {error}
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default UserForm;
