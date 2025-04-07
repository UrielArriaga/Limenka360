import { Drawer } from "@material-ui/core";
import Select from "react-select";
import styled from "styled-components";
import { colors, device } from "../../../../styles/global.styles";

export const DrawerStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(100% - 250px);
    border-top-left-radius: 10px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 300px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .drawer_container {
    &__top {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      width: calc(100% - 250px);
      background-color: #ffff;
      border-top-left-radius: 10px;
      height: 70px;
      z-index: 1000;
      &__title {
        font-size: 21px;
        font-weight: bold;
        letter-spacing: 0.03em;
        color: #103c82;
      }

      &__close {
        cursor: pointer;
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }

    &__formsearch {
      margin-top: 76px;
      padding: 0px 10px;

      .ctr_filter {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        &__ctr_input {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          margin-bottom: 10px;
          .inputText {
            width: 100%;
            height: 40px;
            input {
              padding-right: 40px;
              padding-left: 28px;
            }
          }
          .ctr_filters {
            display: flex;
            align-items: center;
            position: absolute;
            right: -5px;
            color: #8a8a8a;
            cursor: pointer;
            .filters {
              width: 30px;
              height: 30px;
              padding: 5px;
              transition: all 0.4s ease;
            }
            .text {
              font-size: 12px;
            }
            &:hover .filters {
              padding: 3px;
            }
          }
          .clear {
            width: 30px;
            height: 30px;
            padding: 5px;
            right: 25px;

            color: #3f51b5;
            -webkit-transition: all 0.4s ease;
            transition: all 0.4s ease;
            position: absolute;
            cursor: pointer;
          }
          .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
            border-radius: 10px;
          }
          .search {
            width: 30px;
            height: 30px;
            padding: 5px;
            color: #8a8a8a;
            transition: all 0.4s ease;
            position: absolute;
            left: 2px;
          }
          .filters {
            width: 30px;
            height: 30px;
            padding: 5px;
            color: #8a8a8a;
            transition: all 0.4s ease;
            position: absolute;
            right: 10px;
            &:hover {
              padding: 3px;
              cursor: pointer;
            }
          }
        }
      }
      .filterNone {
        display: flex;
        &__filters {
          display: flex;
          cursor: pointer;
          padding: 8px 15px;
          text-transform: capitalize;
          background: #103c82;
          color: #fff;
          font-size: 13px;
          border-radius: 10px;
          margin-left: 5px;
          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
            0px 1px 5px 0px rgb(0 0 0 / 12%);
        }
        &__titleFilter {
          margin-top: 3px;
        }
      }
    }
    &__filters_chip {
      display: none;
      @media ${device.md} {
        margin-top: 6px;
        display: flex;
        .MuiChip-root.chip.MuiChip-colorPrimary.MuiChip-deletableColorPrimary.MuiChip-sizeSmall.MuiChip-deletable {
          text-transform: capitalize;
          margin-right: 5px;
        }
      }
    }
    &__tableproducts {
      padding: 0 10px;
      margin-top: 13px;
      width: 100%;
      margin-bottom: 25px;
      .ctr_load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        /* height: 400px; */
        &__img {
          width: 335px;
          animation: slide 3s infinite;
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        &__load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 30px;
          width: 242px;
          margin-left: 100px;
          p {
            text-align: center;
            font-weight: bold;
          }
        }
        @keyframes slide {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .table {
          border-spacing: 0;
          margin: auto;
          width: inherit;
          height: 40px;
          .head {
            top: 0;
            z-index: 50;
            .tr {
              background-color: #dce1f6;
              padding: 5px 10px;
              height: 40px;
              .fixed {
                position: sticky;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 3px 5px;
                background-color: #405189;
                color: #fff;
                min-width: 350px;
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
                .ctr_title {
                  display: flex;
                  align-items: center;
                  width: max-content;
                  min-width: 150px;
                }
              }
            }
          }
        }
      }
      .table {
        border-spacing: 0;
        margin: auto;
        width: inherit;
        height: 300px;
        .head {
          /* position: sticky; */
          top: 0;
          z-index: 50;
          .tr {
            background-color: #dce1f6;
            padding: 5px 10px;
            height: 40px;
            .fixed {
              /* position: sticky; */
              left: 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 3px 5px;
              background-color: #405189;
              color: #fff;
              min-width: 250px;
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
              .ctr_title {
                display: flex;
                align-items: center;
                width: max-content;
                min-width: 150px;
                .iconArrow {
                  margin-left: 9px;
                  flex: 0 0 auto;
                  color: rgb(255 255 255);
                  background: #3f51b5;
                  font-size: 20px;
                  overflow: visible;
                  text-align: center;
                  cursor: pointer;
                  border-radius: 50%;
                  &:hover {
                  }
                }
              }
            }
            .title.fix.code {
              position: sticky;
              left: 0;
              background: #dce1f6;
              transition: all 0.3s ease;
            }
          }
        }
        .body {
          .row {
            background: #fff;
            font-weight: bold;
            color: #2c2c2c;
            transition: all 0.3s ease;
            min-height: 50px;
            .fixed {
              position: sticky;
              left: 0;
              background: #fff;
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
              }
            }
            .options-td {
              position: sticky;
              right: 0;
              background: #fff;
              transition: all 0.3s ease;
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
            &:hover {
              background: #00c853;
              opacity: 0.8;
              color: #000;
              .fixed {
                background: #00c853;
              }
              .options-td {
                background: #00c853;
                .options {
                  background: #2c3d72;
                  opacity: 1;
                }
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
    .containerResults {
      display: flex;
      margin-top: 7px;
      .total {
        display: flex;
        align-items: center;
        font-weight: 500;
        padding: 0px 10px;
        svg {
          font-size: 14px;
          margin-right: 5px;
          color: #103c82;
        }
        .reload {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }

    .body_empty {
      position: relative;

      .message_ctr {
        height: 100%;
        height: 250px;
        padding: 0 10px;
        margin-top: 13px;
        width: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          margin-top: 52px;
        }
        .titleNotFound {
          text-align: center;
          color: #8a8a8a;
        }
        .table {
          border-spacing: 0;
          margin: auto;
          width: inherit;
          .head {
            /* position: sticky; */
            top: 0;
            z-index: 50;
            .tr {
              background-color: #dce1f6;
              padding: 5px 10px;
              height: 40px;
              .fixed {
                /* position: sticky; */
                left: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 3px 5px;
                background-color: #405189;
                color: #fff;
                min-width: 250px;
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
                .ctr_title {
                  display: flex;
                  align-items: center;
                  width: max-content;
                  min-width: 150px;
                }
              }
            }
          }
        }
      }
    }
    &__tfooter {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      &__ctr_button {
        margin-top: 10px;
        margin-bottom: 10px;
        .add_buton {
          text-transform: capitalize;
          background-color: #405189;
        }
      }
      &__ctr_pagination {
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
        .totalProducts {
          font-weight: 500;
          color: #495057;
        }
        button.MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-page.MuiPaginationItem-rounded.MuiPaginationItem-textPrimary.Mui-selected {
          background-color: #0f3e7d;
        }
      }
    }
  }
`;

export const CustomSelected = styled(Select)`
  z-index: 51;

  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }
`;
