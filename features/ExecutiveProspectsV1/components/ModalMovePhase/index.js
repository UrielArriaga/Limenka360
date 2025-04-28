import React from "react";
import styled from "styled-components";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Backdrop } from "@material-ui/core";

export default function ModalMovePhase({
  open,
  toggleModal,
  prospectData = {
    fullname: "Nombre del prospecto",
  },
}) {
  return (
    <Modal open={open} onClose={toggleModal} closeAfterTransition>
      <ModalBox>
        <p className="title">Mover {prospectData?.fullname} a </p>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}

const ModalBox = styled(Box)`
  /* background: white;
  padding: 24px;
  max-width: 500px;
  margin: 10% auto;
  
  */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 600px;

  .title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 8px;
  }
`;
