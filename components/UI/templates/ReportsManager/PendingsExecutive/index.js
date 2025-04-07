import { Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

export default function PendingsExecutives() {
  return (
    <PendingsExecutivesStyled>
      <div className="rowx">
        <h3>Ejecutivos</h3>

        <div className="actionssection">
          <div className="order">
            <Button> s</Button>
          </div>
          <div className="arrows_pagination">
            <div className="left_arrow">
              <KeyboardArrowLeft />
            </div>
            <div className="rigth_arrow">
              <KeyboardArrowRight />
            </div>
          </div>

          <div className="config">
            <Button onClick={() => setShowCustomDate(true)}>Configurar</Button>
          </div>
        </div>
      </div>
    </PendingsExecutivesStyled>
  );
}

const PendingsExecutivesStyled = styled.div`
  height: 320px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  height: 320px;
  margin-top: 40px;
  width: 95%;
`;
