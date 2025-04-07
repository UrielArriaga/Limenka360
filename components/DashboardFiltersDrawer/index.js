import { Drawer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

const FiltersDrawer = ({ show, closeDrawer, children }) => {
  return (
    <DrawerStyled
      anchor="right"
      open={show}
      onClose={() => {
        closeDrawer();
      }}
    >
      {children}
    </DrawerStyled>
  );
};

export default FiltersDrawer;

const DrawerStyled = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: 100%;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(2px);
  }
  .ctr_filters {
    display: flex;
    flex-direction: column;
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      margin-bottom: 10px;
      svg {
        color: #8a8a88;
        font-size: 20px;
      }
    }
    label {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .input {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      margin-bottom: 10px;
      padding: 0.47rem 0.75rem;
      width: 100%;
      height: 40px;
      border: 2px solid #f3f3f3;
      color: #000;
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin: 10px 0;
      .btn_search {
        text-transform: capitalize;
        background: ${colors.primaryColor};
        color: #fff;
      }
    }
  }
`;
