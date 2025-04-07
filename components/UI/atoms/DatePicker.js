import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

export default function DatePicker({ value, handleOnChangeDate }) {
  return (
    <KeyboardDatePicker
      disableToolbar
      format="DD-MM-YYYY"
      views={["year", "month", "date"]}
      margin="normal"
      id="date-picker-inline"
      className="inputdate inputdate_lte"
      value={value}
      InputProps={{ disableUnderline: true, readOnly: true }}
      onChange={date => handleOnChangeDate(date, "start")}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
}
