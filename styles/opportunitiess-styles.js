import { centerXY, colors, device, wrapper } from "../styles/global.styles";
import styled from "styled-components";

export const Opportunitiess = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  background-color: ${({ openMenuMobile }) =>
    openMenuMobile ? "#0b1b46" : "transparent"};
  width: 100%;
  position: fixed;
  z-index: 1000;
  transition: background-color 0.3s ease-in-out;
  background-color: ${({ scrollBiggger }) =>
    scrollBiggger > 60 ? "#ffff" : "transparent"};
  box-shadow: ${({ scrollBiggger }) =>
    scrollBiggger > 60
      ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      : "rgba(99, 99, 99, 0.0) 0px 2px 8px 0px;"};
`;

export const CustomContainer = styled.div`
  display: flex;
`;
export const MainData = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0px 25px 25px 25px;
  padding-bottom: 100px;
  background-color: #f3f3f9;
  margin-bottom: 30px;

  .titleandFilters {
    display: block;
    @media ${device.sm} {
      display: flex;
      justify-content: space-between;
    }

    /* padding: 25px; */
  }
  .search {
    .titleSearch {
      font-size: 25px;
    }

    .elements {
      display: flex;

      margin-bottom: 2px;
      .select {
        font-size: 15px;
        margin: 10px 0px 10px 0px;
        width: 100%;
        padding: 6px;
        border-radius: 9px;
      }
      input {
        width: 100%;
        font-size: 16px;
        padding: 5px;
        border-radius: 7px;
      }

      button {
        font-size: 11px;
        border: 1px solid #1976d2;
        color: white;
        border-radius: 9px;
        margin-left: 10px;
        background-color: #1976d2;
        &:hover {
          color: #1976d2;
          background-color: transparent;
        }
      }
    }
  }
  .title {
    font-size: 17px;
    display: flex;
    padding: 10px 10px 0 10px;
    margin-top: 10px;
    font-weight: 500;
    color: rgb(41 37 37 / 90%);
    @media ${device.sm} {
      margin-bottom: 20px;
    }
  }
  .ContainerChips {
    margin: 10px 0px 10px 0px;
    .chips {
      background-color: #388dd9;
      border: 2px solid #fefefe;
      /* margin-left: 8px; */
    }
  }
  .titlesandFilters {
    justify-content: end;
    display: flex;
    .filterNone {
      margin-bottom: 13px;
      margin: 9px;

      @media ${device.sm} {
        display: flex;
        align-items: center;
        padding: 0px 21px 0 0px;
        cursor: pointer;
      }

      &__filters {
        color: #fff;
        background-color: #29badb;
        border-color: #29badb;
        display: flex;
        /* padding: 2px; */
        border-radius: 5px;
        /* justify-content: space-between; */
        /* width: 82px; */
        padding: 4px;

        &__titleFilter {
          margin-left: 4px;
          font-weight: 500;
        }
      }
    }

    .filter {
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: end;

      /* padding: 13px 21px 15px 0px; */
      @media ${device.sm} {
        padding: 0px 21px 0 0px;
      }

      &__filters {
        display: none;
        @media ${device.sm} {
          color: #fff;
          background-color: #29badb;
          border-color: #29badb;
          display: flex;
          border-radius: 5px;
          padding: 4px;
        }

        &__titleFilter {
          margin-left: 4px;
          font-weight: 500;
        }
      }

      .divFilter {
        width: 100%;
        .MuiFormControl-root {
          display: block;
          border: 0;
          margin-bottom: 10px;
          padding: 0;
          position: relative;
          min-width: 0;
          flex-direction: initial;
          align-items: center;
          margin-left: 8px;
          @media ${device.sm} {
            display: flex;
            margin: 0;
          }
        }

        .dates {
          display: -webkit-box;
          @media ${device.sm} {
            margin-left: 17px;
          }

          .inputdate {
            height: 33px;
            border-radius: 8px 8px 0px 0px;
            border-bottom-left-radius: 0px;
            border: 1px solid #d2d4d4;
            width: 190px;
            margin-left: 10px;
            background: #fefefefe;
          }
        }
        .input {
          width: 100%;
          height: 33px;
          border-radius: 8px 8px 0px 0px;
          border-bottom-left-radius: 0px;
          border: 1px solid #d2d4d4;
          background: #fefefefe;
          margin-top: 7px;
          @media ${device.sm} {
            width: 190px;
            margin-left: 10px;
          }
        }
      }
    }
  }

  .main {
    padding: 10px 10px 0 10px;
  }
`;
export const OportunidadesBox = styled.div`
  background-color: #fff;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 11px;
  padding: 20px;
  border-radius: 26px;

  .tableCont {
    width: 100%;
    overflow-x: auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .MuiTableCell-root {
    padding: 9px;
    border-bottom: 1px solid rgb(245 244 253);
  }

  .table_head_content {
    background: #f3f6f9;
    z-index: 100;

    top: 0px;

    &__checkbox {
      position: sticky;
      /* right: 50px; */
      background: #f3f6f9;
      z-index: 0;
      left: 0px;
      position: -webkit-sticky;
      position: sticky;
      position: sticky !important;
      position: -webkit-sticky !important;
    }
    &__name {
      background: #f3f6f9;
      z-index: 0;
      left: 0px;
      position: -webkit-sticky;
      position: sticky !important;
      position: -webkit-sticky !important;
      left: 65px;
      position: sticky;
    }
    &__options {
      @media ${device.sm} {
        background: #f3f6f9;
        z-index: 50;
        right: 0px;
      }
    }
  }
  .table_cell_checkbox {
    background: #ffffff;
    z-index: 0;
    left: 0px;
    position: sticky;
  }
  .table_cell_company {
    .phone {
      display: flex;
      align-items: center;
      svg {
        margin-right: 2px;
        color: green;
        font-size: 15px;
      }
    }
    .email {
      display: flex;
      align-items: center;
      svg {
        margin-right: 2px;
        color: #388dd9;
        font-size: 15px;
      }
    }
  }
  .table_cell_name {
    background: #ffffff;
    z-index: 0;
    left: 65px;
    position: sticky;

    .infoProspect {
      display: flex;
      align-items: center;
      p {
        margin-left: 7px;
      }
    }
  }
  .infoProspects {
    display: flex;
    p {
      margin-left: 7px;
    }
  }
  .table_cell_options {
    @media ${device.sm} {
      right: 0;
      z-index: 50;
      background: white;
    }
    .options {
      color: #29badb;
      background-color: rgba(41, 186, 219, 0.1);
      border-color: transparent;
      border-radius: 7px;
    }
  }
`;
export const MenuDashboardStyled = styled.div`
  background-color: #fbfaff;
  box-shadow: 4px 8px 15px rgb(64 79 104 / 5%);
  border-right: 1px solid #f3f3f3;
  width: 100px;
  transition: all 500ms ease;
  display: none;
  height: 100vh;
  scrollbar-color: "white";
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  .menu {
    margin-left: 15px;
    font-size: 13px;
    color: #5156be;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .logo {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &_img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }

  .buttonMenu {
    padding: 5px 5px;
    &_button {
      display: flex;
      align-items: center;
      justify-content: center;

      transition: all 600ms ease;
      border-radius: 8px;
      border: 1px;
      color: #545a6d;
      svg {
        margin-right: 0;
        width: 25px;
      }
      p {
        font-size: 14px;
        font-weight: 600;
        display: none;
        font-family: system-ui;
      }
      &:hover {
        border-radius: 8px;
        cursor: pointer;
        background: rgb(139 145 220 / 5%);
        color: #388dd9;
      }
    }
    &_select {
      display: flex;
      align-items: center;
      margin: 5px;
      padding: 5px;
      transition: all 600ms ease;
      border-radius: 8px;
      cursor: pointer;
      background: rgb(139 145 220 / 5%);
      color: #388dd9;
      svg {
        margin-right: 0;
        width: 25px;
      }
      p {
        font-size: 14px;
        font-weight: 600;
        font-family: system-ui;
      }
    }
  }
  .gift {
    padding: 15px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgb(139 145 220 / 5%);
    border-radius: 5px;
    p {
      margin-top: 5px;
      text-align: center;
      font-size: 12px;
      color: #5156be;
      font-weight: 700;
      font-family: system-ui;
    }
    button {
      margin-top: 10px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #5156be;
      color: #545a6d;
      font-family: system-ui;
      cursor: pointer;
      transition: all 600ms ease;
      &:hover {
        transform: scale(1.1);
        color: #5156be;
      }
    }
  }
  .groupProgres {
    margin: 15px;
    text-align: center;
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
      justify-content: center;
    }
    .progress {
      display: flex;
      flex-direction: row;
      align-items: center;
      .titulo {
        margin-top: 13px;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }
  @media ${device.sm} {
    width: 100;
    display: block;
    .logo {
      &_img {
        padding: 3px 16px;
      }
    }
  }

  @media ${device.md} {
    width: 250px;
    .addVacancie {
      &_create {
        svg {
          margin-right: 5px;
        }
        p {
          display: inline;
        }
      }
    }
    .buttonMenu {
      &_button {
        justify-content: flex-start;
        svg {
          margin-right: 5px;
        }
        p {
          display: inline;
        }
      }
    }
  }
  @media ${device.md} {
    .logo {
      &_img {
        padding: 0px 0px;
      }
    }
  }
`;
