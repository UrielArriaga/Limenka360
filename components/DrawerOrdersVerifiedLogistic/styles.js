import { Drawer, Popover } from "@material-ui/core";
import styled from "styled-components";

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
    background-color: #ffffff;
    margin-bottom: 15px;
    box-shadow: #e5efff 0px 1px 2px;
    .title {
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
        -webkit-transition: 0.3s;
        transition: 0.3s;
        color: #3f51b5;
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
        font-size: 18px;
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
    .button {
      width: 25px;
      height: 25px;
      cursor: pointer;
      padding: 5px;
      margin-right: 5px;
      background: rgb(220, 225, 246);
      color: rgb(12, 32, 59);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .icon {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }
  }

  .drawer_filters {
    padding: 8px;
    padding-right: 8px;
    padding-left: 8px;
    background-color: #fff;
    background-color: #fff;
    &__selects {
      display: flex;
      justify-content: initial;
      /* margin-bottom: 10px; */
      margin-bottom: 6px;
      &__containerLeft {
        margin-left: 8px;
        margin-right: 8px;
        width: 100%;
        .order-select {
          -webkit-box-align: center;
          align-items: center;
          background-color: rgb(255, 255, 255);
          border-color: rgb(204, 204, 204);
          border-radius: 4px;
          border-style: solid;
          border-width: 1px;
          cursor: default;
          display: flex;
          flex-wrap: wrap;
          -webkit-box-pack: justify;
          justify-content: space-between;
          min-height: 25px;
          position: relative;
          transition: all 100ms ease 0s;
          box-sizing: border-box;
          outline: 0px !important;
          color: #103c82;
          font-weight: 500;
        }
        &__header {
          display: flex;
          align-items: center;
          &__title {
            color: #585858;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 3px;
          }
          &__icon {
            margin-left: 2px;
            font-size: 14px;
            color: #585858;
          }
        }

        &__selectType {
          width: 100%;
          height: 35px;
          margin-bottom: 18px;
          font-size: 15px;
          padding: 5px;
          border-top: none;
          border-left: none;
          border-right: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .order {
        display: flex;
        align-items: center;

        margin-top: 6px;
      }
      &__containerRight {
        width: 100%;
        margin-left: 8px;
        margin-right: 8px;
        &__header {
          display: flex;
          align-items: center;
          &__title {
            font-size: 14px;
            color: #585858;
          }
          &__icon {
            margin-left: 2px;
            font-size: 14px;
            color: #585858;
          }
        }
        &__selectDate {
          width: 100%;
          height: 35px;
          margin-bottom: 18px;
          font-size: 15px;
          padding: 5px;
          border-top: none;
          border-left: none;
          border-right: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    &__selectsOrder {
      display: flex;
      align-items: end;
      justify-content: end;
    }
    &__date {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-right: 8px;
        margin-left: 8px;
        &__title {
          font-size: 14px;
          color: #585858;
        }
        &__calendar {
          font-family: Arial, Helvetica, sans-serif;
          padding: 3px;
          font-size: 13px;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid;
          outline: none;
        }
      }
      &__icon {
        margin-top: -45px;
        margin-left: -28px;
        margin-right: 8px;
        font-size: 18px;
        color: red;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .containerDocs {
    display: flex;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
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
    }
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 4px;
        &__title {
          font-size: 15px;
          font-weight: bold;
          /* color: #0d47a1; */
          letter-spacing: 1px;
          &:hover {
            cursor: pointer;
          }
        }
        &__link {
          font-size: 13px;
          font-weight: 500;
          color: #1b69b6;
          margin-bottom: 1px;
          &:hover {
            cursor: pointer;
          }
        }
        &__linkDocs {
          font-size: 13px;
          font-weight: 600;
          color: #0c203b;
          color: black;
          margin-bottom: 4px;
          text-align: justify;
          /* text-decoration: underline; */
          &:hover {
            cursor: pointer;
            color: #1b69b6;
          }
        }
        &__icon {
          width: 27px;
          height: 27px;
          padding: 5px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
        &__titles {
          font-size: 13px;
          font-weight: 700;
          color: #103c82;
        }
        &__subject {
          font-size: 13px;
          font-weight: 400;
          color: #808080;
          margin-bottom: 1px;
          text-align: justify;
          span {
            font-weight: 600;
            color: black;
          }
        }
        &__containerFiles {
          margin-top: 10px;

          &__item {
            border: 1px solid rgb(220, 225, 246);
            margin-left: 4px;
            border-radius: 5px;
            padding: 3px;
            margin-bottom: 4px;
            max-width: 68px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .iconFile {
              font-size: 0px;
              margin-right: 5px;
              color: #1b69b6;
            }
            .word {
              font-size: 19px;
              color: #2979ff;
            }
            .pdf {
              font-size: 19px;
              color: #ff1212;
            }
            .image {
              font-size: 19px;
              color: #39b2e7;
            }
            .excel {
              font-size: 19px;
              color: #148248;
            }
            .default {
              font-size: 19px;
              color: #405189;
            }
            .titleFiles {
              margin-top: 10px;
            }
            .itemTitleFile {
              width: 100%;
              font-size: 14px;
              font-weight: 500;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:hover {
                color: #2196f3;
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }

      &__info {
        display: flex;
        flex-direction: row;
        &__title {
          font-size: 17px;
          font-weight: 500;
        }
        &__icon {
          font-size: 20px;
          margin-right: 5px;
          color: #fff;
          border-radius: 50%;
          padding: 3px;
          background-color: black;
        }
        &__content {
          cursor: default;
          height: fit-content;
          text-align: center;
          border-radius: 5px;
          font-weight: bold;
          font-size: 13px;
          padding: 5px;
          margin-left: 50px;
        }
      }
    }
    &__content {
      font-size: 12px;
      margin-top: 5px;
      margin-bottom: 10px;
      &__infoExecutive {
        margin-bottom: 10px;
      }
      &__title {
        font-size: 13px;
        font-weight: 500;
      }
      &__subject {
        font-weight: 500;
        font-size: 12px;
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
      }
    }

    &__footer {
      display: flex;
      flex-direction: column;
      &__date {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 500;
      }
      &__time {
        margin-top: 3px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      &__buttons {
        display: flex;
        justify-content: right;
      }

      &__seePdf {
        display: flex;
        align-items: end;
        justify-content: end;
        .menuButton {
          border-radius: 8px 8px 8px 8px;
          font-size: 14px;
          font-weight: 600;
          color: #585858;
        }
        .date {
          display: flex;
          align-items: end;
          justify-content: end;
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
      padding: 50px;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      p {
        color: #405189;
        font-weight: 600;
      }
    }
  }
`;

export const DrawerStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 450px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .drawer_footer {
    padding: 15px;
    z-index: 100;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    &__button {
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-size: 11px;
      border: 1px solid rgb(16, 60, 130);
      background-color: rgb(16, 60, 130);
      color: #fff;
      &:hover {
        color: rgb(16, 60, 130);
      }
      &__icon {
        margin-top: -2px;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }
`;

export const MenuFile = styled(Popover)`
  .container {
    display: flex;
    flex-direction: column;
    .option {
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      border-radius: 0px;
      color: #3f51b5;
      font-size: 13px;
      &:hover {
        background-color: #3f51b5;
        color: #fff;
      }
    }
  }
`;
