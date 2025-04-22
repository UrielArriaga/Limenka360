"use client";

import { ToolbarProps } from "react-big-calendar";
import styled from "styled-components";

const ToolBar = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const ContainerBtn = styled.div`
  display: flex;
  border-radius: 7px;
  overflow: hidden;
  border: 1px solid #e9ecef;

  button {
    background-color: #fff;
    border: none;
    font-size: 14px;
    padding: 2px 10px;
    color: #495057;
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
      font-weight: bold;
      background-color: #212529;
      color: #fff !important;
    }
  }
`;

const ButtonLeft = styled.button`
  font-weight: 700;
  color: #212529 !important;
`;

const ButtonToday = styled.button`
  padding: 2px 20px !important;
  color: #495057 !important;
`;

const ButtonRigth = styled.button`
  font-weight: 700;
  color: #212529 !important;
`;

const ButtonWeek = styled.button`
  font-weight: 700;
  color: #212529 !important;
  padding: 2px 10px;
`;

const ButtonMonth = styled.button`
  font-weight: 700;
  color: #212529 !important;
  padding: 2px 10px;
`;

const LabelDate = styled.h3`
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #495057;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const CustomToolbar = (toolbar) => {
  return (
    <ToolBar>
      <ContainerBtn>
        <ButtonLeft onClick={() => toolbar.onNavigate("PREV")}>&lt;</ButtonLeft>
        <ButtonToday onClick={() => toolbar.onNavigate("TODAY")}>
          Hoy
        </ButtonToday>
        <ButtonRigth onClick={() => toolbar.onNavigate("NEXT")}>
          &gt;
        </ButtonRigth>
      </ContainerBtn>
      <LabelDate>{toolbar.label}</LabelDate>
      <ContainerBtn>
        <ButtonMonth onClick={() => toolbar.onView("day")}>Dia</ButtonMonth>
        {/* <ButtonWeek onClick={() => toolbar.onView("week")}>Semana</ButtonWeek> */}
        <ButtonMonth onClick={() => toolbar.onView("month")}>Mes</ButtonMonth>
      </ContainerBtn>
    </ToolBar>
  );
};

export default CustomToolbar;
