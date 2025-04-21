import styled from "styled-components";

const { Modal, Box, Button } = require("@mui/material");

const ModalSyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #000;
`;

const BoxSyled = styled(Box)`
  background-color: #f8f9fa;
  border-radius: 11px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  text-align: center;

  h2 {
    text-align: center;
  }

  & p {
    font-weight: 500;
  }
`;

const ContainerBtns = styled.div`
  display: flex;
  gap: 0.7px;
`;

const ModalWindow = ({ children, open, handleClose, btnAccept }) => {
  return (
    <ModalSyled
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableEnforceFocus={true}
    >
      <BoxSyled sx={{ width: 400 }}>
        {children}

        <ContainerBtns>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              flex: 1,
              color: "#212529",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Cancelar
          </Button>
          {btnAccept && (
            <Button
              variant="contained"
              color="success"
              onClick={btnAccept}
              sx={{
                backgroundColor: "#1864ab",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#228be6",
                },
                flex: 1,
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Acceptar
            </Button>
          )}
        </ContainerBtns>
      </BoxSyled>
    </ModalSyled>
  );
};

export default ModalWindow;
