import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, data }) {
  // const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(data?.value?.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue(data?.value?.value);
  }, [data]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSave = () => {
    const { propertyName, positionRow, childProperty } = data;
    dispatch(
      changePropertyValue({
        position: positionRow,
        property: propertyName,
        childProperty: childProperty,
        value: value,
      })
    );

    handleClose();
    // dispatch(
    //   changePropertyValueBackup({
    //     position: positionRow,
    //     property: propertyName,
    //     childProperty: childProperty,
    //     value: value,
    //   })
    // );
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">Cambiar valor del campo</DialogTitle>

        {data !== undefined && (
          <DialogContentStyled>
            <input value={value} type="text" placeholder="" onChange={(e) => setValue(e.target.value)} />
          </DialogContentStyled>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => handleClickSave()} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePropertyValue, changePropertyValueBackup } from "../../../redux/slices/importsSlice";

const DialogContentStyled = styled(DialogContent)`
  input {
    height: 40px;
    width: 100%;
    padding-left: 5px;
  }
`;
