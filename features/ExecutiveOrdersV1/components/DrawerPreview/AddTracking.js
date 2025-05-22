import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { AddTrackingStyled } from "./styles";

export default function AddTracking({ createNewTracking, setObservations }) {
  const [localObservation, setLocalObservation] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setLocalObservation(value);
    setObservations(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!localObservation.trim()) return;
    createNewTracking();
    setLocalObservation("");
    setObservations("");
  };

  const isDisabled = localObservation.trim().length < 4;

  return (
    <AddTrackingStyled>
      <form onSubmit={handleSubmit}>
        <TextField
          className="field"
          label="Cometario / Observaciones"
          multiline
          rows={4}
          variant="outlined"
          value={localObservation}
          onChange={handleChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          className="btnSubmit"
          disabled={isDisabled}
        >
          Guardar comentario y como seguimiento
        </Button>
      </form>
    </AddTrackingStyled>
  );
}
