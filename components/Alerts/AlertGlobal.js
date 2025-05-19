import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress } from "@material-ui/core";

const AlertGlobal = ({ message, severity, show, type }) => {
  const [showAlert, setshowAlert] = useState(null);
  const [hiddeAlert, setHiddeAlert] = useState(false);

  useEffect(() => {
    setshowAlert(show);
    setTimeout(() => {
      setshowAlert(false);
    }, 2500);
  }, []);

  const handleAction = () => {
    setHiddeAlert(false);
  };

  switch (type) {
    case "basic":
      return (
        <AlertGlobalStyled show={showAlert}>
          <Alert variant="filled" severity={severity}>
            {message}
          </Alert>
        </AlertGlobalStyled>
      );
      break;

    case "load":
      return (
        <AlertGlobalStyled show={show}>
          <Alert variant="filled" severity={severity} icon={false}>
            <div className="load">
              <CircularProgress size={20} className="progress" />
              {message}
            </div>
          </Alert>
        </AlertGlobalStyled>
      );
    case "canhidde":
      return (
        <AlertGlobalStyled show={showAlert && !hiddeAlert}>
          <Alert
            variant="filled"
            severity={severity}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => handleAction()}
              >
                No volver a mostrar
              </Button>
            }
          >
            {message}
          </Alert>
        </AlertGlobalStyled>
      );
    default:
      break;
  }
};

export default AlertGlobal;

const AlertGlobalStyled = styled.div`
  width: 100%;
  position: fixed;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${({ show }) => (show ? "5px" : "-60px")};
  z-index: 10000000000 !important;
  .load {
    display: flex;
    align-items: center;
    .progress {
      margin-right: 10px;
      color: "#fff";
    }
  }
`;
