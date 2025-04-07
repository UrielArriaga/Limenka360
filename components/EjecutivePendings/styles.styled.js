import styled from "styled-components";
import { Drawer, Popover } from "@material-ui/core";
import { colors } from "../../styles/global.styles";
export const Main = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
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
  .drawer_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: 50;
    top: 0;
    padding: 15px 8px;
    background-color: #dce1f6;
    margin-bottom: 15px;
    box-shadow: 0px 1px 2px #abb2b9;
    &__title {
      display: flex;
      align-items: center;
      &__icon {
        font-size: 20px;
        margin-right: 2px;
      }
      &__iconReload {
        margin-top: 5px;
        font-size: 20px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__iconFilter {
        margin-top: 5px;
        font-size: 18px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__iconOrder {
        margin-top: 5px;
        font-size: 20px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__active {
        color: #1b69b6;
        font-size: 20px;
      }
      &__Subtitle {
        font-size: 21px;
        font-weight: 500;
        margin-right: 2px;
        &__total {
          color: #fff;
          padding: 1px 4px;
          border-radius: 5px;
          background-color: #3f51b5;
          margin-top: -8px;
          font-size: 11px;
          font-weight: 600;
          margin-left: 2px;
        }
      }
    }
    &__button {
      width: 20px;
      height: 20px;
      color: red;
    }
    &__icon {
      font-size: 22px;
    }
  }

  .container_order {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
    .style_selectOrder {
      display: flex;
      flex-direction: row;
      border: 1px solid #1b69b6;
      background-color: #1b69b6;
      color: #fff;
      border-radius: 5px;
      font-size: 13px;
      padding: 2px;
      margin-right: 5px;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        color: #1b69b6;
        background-color: #fff;
      }
      .icon {
        font-size: 20px;
      }
    }
  }

  .drawer_filters {
    padding: 8px;
    background-color: #fff;
    position: sticky;
    z-index: 200;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    top: 0;
    margin-bottom: 10px;
    .item {
      .title {
        font-size: 14px;
        font-weight: 500;
      }
      .select {
        font-size: 15px;
        border-radius: 5px;
      }
      .container_range {
        display: flex;
        margin-bottom: 10px;
        .startRange {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-right: 5px;
        }
        .endRange {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-left: 5px;
        }

        .date {
          height: 30px;
          background-color: hsl(0, 0%, 100%);
          border: 1px solid hsl(0, 0%, 80%);
          border-radius: 4px;
          font-size: 14px;
          outline: none;
          padding: 5px;
          cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
      }
      .container_footer {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        .button_return {
          font-size: 13px;
          text-transform: capitalize;
          background-color: #3f51b5;
          color: #fff;
          height: 20px;
          width: 100px;
        }
      }
    }
  }
  .results {
    display: flex;
    align-items: center;
    z-index: 100;
    margin-bottom: 8px;
    font-style: italic;
    font-size: 14px;
    margin-left: 13px;
    border-radius: 5px;
    padding: 2px;
    background-color: #d5d8dc;
    font-weight: 500;
    width: fit-content;

    &__icon {
      margin-bottom: -2px;
      margin-left: 2px;
      font-size: 16px;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        color: red;
      }
    }
  }
  .contenido {
    &__item {
      width: 100%;
      padding: 15px 16px;
      border-bottom: 1px solid #d5d8dc;
      transition: 0.3s;
      &:hover {
        background-color: #f3f3f3;
      }
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        &__title {
          font-weight: 500;
          display: flex;
          align-items: center;
          p {
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          &__icon {
            font-size: 20px;
            margin-right: 5px;
            color: #fff;
            border-radius: 50%;
            padding: 3px;
            background-color: ${colors.primaryColorDark};
          }
        }
        &__iconCheck {
          font-size: 20px;
          color: #d35400;
        }
        &__button {
          width: 15px;
          height: 15px;
        }
      }
      &__content {
        &__subject {
          font-weight: 500;
          font-size: 13px;
        }
        &__description {
          font-size: 13px;
          margin-top: 5px;
          margin-bottom: 15px;
        }
        &__place {
          display: flex;
          align-items: center;
          &__title {
            font-size: 13px;
            font-weight: 500;
          }
          &__icon {
            font-size: 13px;
            color: green;
          }
        }
      }
      &__footer {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        &__date {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        &__time {
          margin-top: 3px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
      }
    }
    &__pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      &__buttonBefore {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        &__icon {
          font-size: 30px;
        }
      }
      &__buttonNext {
        width: 35px;
        height: 35px;
        margin-left: 10px;
        &__icon {
          font-size: 30px;
        }
      }
    }
    &__empty {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__title {
        color: #abb2b9;
      }
      &__image {
        margin-top: 50px;
        margin-bottom: 15px;
        width: 120px;
        height: 120px;
      }
    }
    &__loader {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 50px;
    }
  }
`;
export const DrawerStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 500px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;
export const AlertDate = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(255, 20, 0, 0.2);
  color: red;
  border-radius: 8px;
  .icon {
    font-size: 19px;
  }
  .alert_title {
    padding: 5px;
    font-weight: 500;
    font-size: 12px;
  }
`;
export const MsjDialog = styled.div`
  padding: 20px;
  .title {
    font-size: 18px;
    font-weight: 500;
  }
  .dialogContainer {
    display: flex;
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
      }
      &__content {
        font-weight: 500;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__cancel {
        color: #fff;
        padding: 5px;
        background-color: #000000;
        border-radius: 4px;
        margin-right: 5px;
        transition: 0.3s;
        &:hover {
          background-color: #fff;
          color: #000000;
          cursor: pointer;
        }
      }
      &__acept {
        margin-left: 5px;
        color: #fff;
        padding: 5px;
        background-color: #0c203b;
        border-radius: 4px;
        transition: 0.3s;
        &:hover {
          background-color: #fff;
          color: #0c203b;
          cursor: pointer;
        }
      }
    }
  }
`;
export const AlertPending = styled.div`
  position: fixed;
  z-index: 50;
`;

export const SelectOptions = styled(Popover)`
  .container_options {
    display: flex;
    flex-direction: column;
    .option {
      padding: 8px;
      transition: 0.1s;
      font-size: 13px;
      &:hover {
        background-color: #f0f0f0;
        color: black;
        cursor: default;
      }
    }
    .selected {
      border: 1px solid #1b69b6;
      color: #1b69b6;
    }
  }
`;
