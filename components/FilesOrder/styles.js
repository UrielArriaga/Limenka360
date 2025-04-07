import styled from "styled-components";
import { Grid, Popover, Dialog } from "@material-ui/core";
export const Files = styled(Grid)`
  /* height: 20%; */
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */

  width: 100%;
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
  .filesItem {
    .fileData {
      margin: 5px;
      padding: 5px;
      border-radius: 5px;
      transition: 0.3s;
      border: 1px solid #2979ff;
      &:hover {
        background-color: rgb(41, 121, 255, 0.1);
      }
      &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .icon {
          font-size: 30px;
        }
        .buttonMenu {
          font-size: 25px;
          height: 5px;
          width: 5px;
          &__icon {
            color: #2979ff;
            &:hover {
              color: #2979ff;
            }
          }
        }
      }
      .titleFile {
        font-size: 12px;
        color: #585858;
      }
      .nameFile {
        font-weight: 500;
        font-size: 15px;
        width: 100%;
        margin-bottom: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      &__footer {
        .titleDate {
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
    .word {
      .icon {
        color: #2979ff;
      }
    }
    .pdf {
      .icon {
        color: #ff1212;
      }
    }
    .image {
      .icon {
        color: #39b2e7;
      }
    }
    .excel {
      .icon {
        color: #148248;
      }
    }
    .default {
      .icon {
        color: #405189;
      }
    }
  }
  .loader {
    display: flex;
    justify-content: center;
    padding: 30px;
    width: 100%;
    margin-top: 20px;
    height: fit-content;
  }
`;
export const MenuFile = styled(Popover)`
  .bodyMenu {
    &__option {
      display: flex;
      width: 100%;
      font-size: 13px;
      padding: 5px;
      transition: 0.3s;
      text-transform: capitalize;
      &:hover {
        color: #fff;
        background-color: rgb(16, 60, 130);
      }
    }
  }
`;
export const ConfirmDelete = styled(Dialog)`
  .container {
    &__head {
      padding: 9px;
      background-color: #103c82;
      color: #fff;
      margin-bottom: 10px;
      .title {
        font-size: 18px;
        font-weight: 500;
      }
    }
    &__body {
      padding: 10px;
      &__item {
        margin-bottom: 10px;
        .title {
          font-size: 15px;
          color: grey;
          margin-bottom: 10px;
        }
        .info {
          font-size: 15.5px;
          font-weight: 500;
          overflow-wrap: break-word;
        }
      }
    }
    &__footer {
      padding: 10px;
      display: flex;
      flex-direction: row-reverse;
      .buttons {
        &__cancel {
          text-transform: capitalize;
          border: 1px solid;
          background-color: #000;
          color: #fff;
          &:hover {
            background-color: #fff;
            color: #000;
          }
        }
        &__confirm {
          margin-left: 10px;
          border: 1px solid #0c203b;
          text-transform: capitalize;
          background-color: #0c203b;
          color: #fff;
          &:hover {
            background-color: #fff;
            color: #0c203b;
          }
        }
        &__loader {
          margin-right: 30px;
        }
      }
    }
  }
`;
export const EmptyFiles = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 170px;
  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;
