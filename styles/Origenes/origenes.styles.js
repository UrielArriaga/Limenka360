import { Menu } from "@material-ui/core";
import styled from "styled-components";
import { colors, device } from "../global.styles";

export const NewOriginStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  height: 100%;
  background-position: bottom center;
  background: #f7f8f9;

  .main {
    padding: 6px 20px 47px;

    .head {
      display: flex;
      align-items: center;
      margin: 17px 0px 22px 1px;
      h2 {
        color: #707070;
      }

      &__title {
        display: flex;
        align-items: center;

        svg {
          font-size: 30px;
          color: #fff;
          border: 1px solid #fff;
          margin-left: 20px;
          border-radius: 50%;
        }
      }
    }
    .main_prospects {
      padding: 30px;

      background-color: rgba(255, 255, 255, 0.85);
      border-radius: 8px;
      box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);

      .ContainerPagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
      }
      .totalOrigins {
        strong {
          margin-right: 7px;
        }
      }
    }
  }
`;

export const TableOrigin = styled.div`
  p {
    margin: 0;
  }

  .title_table {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #dce1f6;
      color: #0c203b;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
    }
  }
  .table {
    border-radius: 10px;
    width: 100%;
    max-height: 70vh;
    overflow-x: auto;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

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
    .ctr_table {
      border-spacing: 0;
      margin: auto;
      width: inherit;

      &__head {
        position: sticky;
        top: 0;
        z-index: 50;
        &__tr {
          background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};

          padding: 5px 10px;
          height: 40px;
          .fixed {
            position: sticky;
            left: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;
            background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#d81b60")};
            color: #fff;
            min-width: 150px;
            height: inherit;
            .MuiFormControlLabel-root {
              margin-right: 5px;
            }

            @media (max-width: 600px) {
              min-width: 80px;
            }
          }
          .title {
            text-transform: capitalize;
            padding: 0 10px;
            background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#d81b60")};

            color: #fff;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
            }
          }
          .titlesId {
            text-transform: capitalize;
            padding: 0 10px;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
            }
          }
          .titlesActions {
            text-transform: capitalize;
            padding: 0 10px;
            width: 49px;

            position: sticky;
            right: 0;
            background-color: #f8bbd0;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
            }
          }
          .configuration {
            position: sticky;
            right: 0;
            background: #f34b46;
            svg {
              cursor: pointer;
            }
          }
        }
      }
      &__body {
        .row {
          background: #fff;
          font-weight: bold;
          color: #2c2c2c;
          transition: all 0.3s ease;
          min-height: 50px;

          .fixed {
            position: -webkit-sticky;
            position: sticky;
            right: 0;
            background: #fff;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
          }
          .data {
            font-size: 14px;
            padding: 0 10px;
            cursor: pointer;
            .text {
              display: flex;
              align-items: center;
              svg {
                font-size: 14px;
                margin-right: 5px;
                color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
              }
            }
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;

              /* text-transform: capitalize; */

              .MuiFormControlLabel-root {
                margin-right: 5px;
              }
            }
          }
          .options {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #405189;
            opacity: 0.6;
            border-radius: 4px;
            transition: all 0.3s ease;
            &:hover {
              cursor: pointer;
              opacity: 1;
            }
            svg {
              color: #fff;
            }
          }
        }
        .inpar {
          background: #f3f3f3;
          .fixed {
            background: #f3f3f3;
          }
          .options-td {
            background: #f3f3f3;
          }
        }
      }
    }
  }
  .alert {
    position: fixed;
    top: 120px;
    width: 300px;
    right: 10px;
  }
  .containerFooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton_Origin {
        text-transform: capitalize;
      }
    }
    &__pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    margin: 10px;
    width: 100%;
    max-width: 600px;
  }
`;

export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .requiredAlert {
    color: red;
  }
  .title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .label_inputs {
    padding: 0 20px 20px 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      &:focus {
        outline: none;
        transition: all 0.3s ease;
        border: 1.5px solid #0d0d0d;
      }
      @media ${device.sm} {
        width: 449px;
      }
    }
    .error {
      border: 1.5px solid #f44336;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f44336;
      margin-top: 5px;
    }
  }
  .label_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
`;

export const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }

  .ctr_options {
    display: flex;
    flex-direction: column;
    &__item {
      padding: 10px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
`;
