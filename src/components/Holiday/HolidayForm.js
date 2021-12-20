import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const HolidayForm = (props) => {
  const {
    fields,
    fieldsHandler,
    errors,
    checkNumbersHandler,
    dateHandler,
    noOfDaysHandler,
    formFor,
  } = props;

  return (
    <div>
      <div className="field-div">
        <label>Name</label>
        <TextField
          value={fields.name}
          id="name"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.name.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Type</label>
        <TextField
          value={fields.type}
          id="type"
          className="form-field"
          size="small"
          required
          onChange={fieldsHandler}
          variant="outlined"
        />
      </div>
      {errors.type.map((error, index) => (
        <span key={index} style={{ color: "red", display: "block" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>Start date</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat="MM/dd/yyyy"
            value={fields.startDate}
            required
            onChange={(newValue) => dateHandler("startDate", newValue)}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                className="form-field"
                size="small"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      {errors.startDate.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>No of days</label>
        <TextField
          value={fields.noOfDays}
          id="noOfDays"
          className="form-field"
          size="small"
          required
          onChange={noOfDaysHandler}
          variant="outlined"
        />
      </div>
      {errors.noOfDays.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
      <div className="field-div">
        <label>End date</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            disabled
            inputFormat="MM/dd/yyyy"
            value={fields.endDate}
            required
            renderInput={(params) => (
              <TextField
                variant="outlined"
                className="form-field"
                size="small"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      {errors.endDate.map((error, index) => (
        <span key={index} style={{ color: "red" }}>
          {error}
        </span>
      ))}
    </div>
  );
};

export default HolidayForm;
