import { Drawer, Paper, Popover, Typography } from "@material-ui/core";
import styled, { keyframes } from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { makeStyles } from "@material-ui/core/styles";

export const ModalPreviewStyled = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 70%;
    padding: 20px;
    background-color: #eef2f4;
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

    /* position: relative; */
    overflow: visible;
    overflow-x: scroll;
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }
  .row {
    display: flex;
    width: 100%;
  }

  .modalcontainer {
    width: 100%;
  }

  .headerPreview {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* margin-bottom: 20px; */

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #282455;
      text-transform: capitalize;
    }
  }

  .headertabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 0;
    /* border-bottom: 1px solid #d9d9d9; */
    /* background-color: #fff; */
    /* background-color: red; */

    .MuiTabs-flexContainer {
      /* background-color: red; */
      /* margin-bottom: 20px; */
      /* margin-left: 20px; */
      /* background-color: #fff; */
      /* border-radius: 8px; */
      /* padding: 10px; */
      /* box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px; */
    }

    .MuiTabs-scroller {
      padding: 0;
    }

    .MuiTabs-flexContainer {
      /* padding: 20px; */
    }

    .MuiTab-root {
      padding: 6px 12px; /* si quieres modificar el padding del tab individual */
      min-width: unset;
      margin-right: 20px;
    }
  }

  .actionmodal {
    button {
      margin-right: 10px;
    }
    // give me styles to my buttons
    .btn {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn--primary {
      background-color: #407aff;
      color: white;
      border: none;
    }
  }

  .close {
    position: absolute;
    top: 4px;
    left: -44px;
    cursor: pointer;
    height: 40px;
    width: 40px;
    background-color: #407aff;
    z-index: 30000000000000 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    /* padding: 10px 30px; */
  }

  .actionsbar {
    width: 50px;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */

    /* <div className="actionsbar">
          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <Close />
            </IconButton>
          </div>
        </div> */

    .actionsbar__item {
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: #407aff; */
      color: #fff;
      width: 30px;
      height: 30px;

      border-radius: 50%;
      cursor: pointer;
      margin-bottom: 10px;
    }

    .actionsbar__icon {
      font-size: 20px;
    }

    /* align-items: center; */
    /* margin-top: 20px; */
    /* button {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn--primary {
      background-color: #407aff;
      color: white;
      border: none;
    } */
  }
`;

// ----- > FILESUPLOADER < ------
export const FilesStyle = styled.div`
  /* width: 100%; */
  height: 28vh;
  .title_files {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    .icon_title {
      margin-left: 5px;
      font-size: 19px;
      transition: 0.2s;
      margin-bottom: -2px;
      &:hover {
        cursor: pointer;
        color: ${colors.primaryColorDark};
      }
    }
  }
  .container_files {
    width: 100%;
    height: 23vh;
    grid-gap: 15px;
    padding: 10px;
    grid-template-columns: repeat(auto-fill, minmax(20vh, 1fr));
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px grey;
    }
    .default {
      height: 90px;
      font-size: 40px;
    }
    .uploadFile {
      display: flex;
      align-items: center;
      gap: 15px;
      background: #fafffa;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid #a1b400;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
      transition: 0.3s ease;

      svg {
        font-size: 25px;
        color: ${colors.primaryColorDark};
        animation: fadeIn 0.3s ease;
      }

      .content_file {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;
        min-width: 0;

        .title_file {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 250px;
        }

        .buttons {
          display: flex;
          gap: 8px;

          .upload {
            background-color: transparent;
            border: 1px solid #119724;
            color: #119724;
            text-transform: capitalize;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 6px;
            transition: 0.3s;
            &:hover {
              background-color: #e5ffeb;
            }
          }

          .cancel {
            background-color: transparent;
            border: 1px solid #d11712;
            color: #d11712;
            text-transform: capitalize;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 6px;
            transition: 0.3s;
            &:hover {
              background-color: #ffeaea;
            }
          }
        }
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    .title_count {
      font-size: 14px;
      color: grey;
      .count {
        font-weight: 500;
        color: black;
      }
    }
    .navigation_buttons {
      display: flex;
      align-items: center;
      svg {
        font-size: 20px;
        color: #007bff;
      }

      .pagesCount {
        margin-top: -2px;
        margin-right: 15px;
        font-size: 13.5px;
        font-weight: 500;
        color: grey;
      }
      .btBack {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
      .btNext {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
    }
  }
`;
export const CardFile = styled(Paper)`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${(props) => props.typefile || "#3f51b5"};
  transition: transform 0.2s ease-in-out;
  background-color: #ffffff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: flex-end;
    .options {
      padding: 4px;
      border-radius: 8px;
      transition: 0.2s;
      &:hover {
        background-color: #e8eaf6;
        color: #3f51b5;
        cursor: pointer;
      }
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-top: -8px;

    svg {
      font-size: 26px;
      color: ${(props) => props.typefile || "#3f51b5"};
    }

    .title_name {
      font-size: 13px;
      font-weight: 500;
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }

    .title_fileType {
      font-size: 11px;
      color: #607d8b;
      text-align: center;
    }
  }
`;

export const CardDefault = styled.div`
  .label {
    height: 100px;
    border: 2px dashed #cfd8dc;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f1f8ff;
      border-color: #8a9900;
      cursor: pointer;
    }

    &:hover .default_icon {
      color: #8a9900;
      animation: float 1s ease-in-out infinite;
    }

    .input {
      display: none;
    }
  }

  .default_icon {
    font-size: 4vh;
    color: #90a4ae;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  p {
    font-size: 12px;
    color: #757575;
    margin-top: 8px;
    text-align: center;
    transition: color 0.3s ease;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px); /* Se mueve hacia arriba */
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export const MenuFile = styled(Popover)`
  .container {
    display: flex;
    flex-direction: column;
    padding: 8px;

    .option {
      padding: 6px 12px;
      font-size: 13px;
      color: #181c1c;
      border-radius: 8px;
      justify-content: flex-start;
      transition: background-color 0.2s;

      &:hover {
        background-color: #181c1c;
        color: #ffffff;
      }

      svg {
        font-size: 18px;
        margin-left: auto;
      }
    }
  }
`;

const borderPulse = keyframes`
  0% {
    border-color: #007bff;
    border-width: 2px;
    box-shadow: 0 0 0px #007bff50;
  }
  50% {
    border-color: #3399ff;
    border-width: 2px;
    box-shadow: 0 0 10px #3399ff80;
  }
  100% {
    border-color: #007bff;
    border-width: 2px;
    box-shadow: 0 0 0px #007bff50;
  }
`;

export const DropArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  min-height: 320px;

  &:hover {
    border-color: #007bff;
    animation: ${borderPulse} 0.5s ease infinite;
  }

  &.drag-drop-area {
    border-color: #007bff;
    background-color: #f0f8ff;
  }
`;

// ----- > MODALFORECAST < ------
export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 32px;
  outline: none;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const ErrorText = styled(Typography)`
  color: #f44336;
  margin-top: 8px;
`;

// ---> INFOS

export const InfoProspectStyled = styled.div`
  background-color: #f9fafb;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 40px;
  font-family: "Inter", sans-serif;
  transition: all 0.3s ease;

  .itemData {
    margin-bottom: 16px;
    padding: 0 12px;
    cursor: pointer;
  }

  .saveLegend {
    margin-top: 8px;
    font-size: 13px;
    color: ${colors.gray};
    font-style: italic;
  }

  .toUpdate {
    .label {
      color: #e53935;
    }
  }

  .label {
    font-weight: 600;
    margin-bottom: 6px;
    color: #1e3a8a;
    font-size: 15px;
    display: block;
    transition: color 0.3s ease;
  }

  .required {
    color: #e53935;
    font-size: 16px;
    margin-left: 6px;
  }

  .value {
    font-weight: 500;
    color: #111827;
  }

  .inputItemData {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 10px 14px;
    width: 100%;
    font-size: 14px;
    color: #1f2937;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .inputItemData:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  .inputItemData::placeholder {
    color: #9ca3af;
    font-style: italic;
  }

  .center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  button {
    background-color: ${colors.primaryColor};
    border: none;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-1px);
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

export const FieldValue = styled.p`
  font-weight: 500;
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 100%;
  margin: 0;
  color: #374151;
`;

// ---> TABLE PRODUCTS SALES

export const TableContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      color: #1e3a8a;
      font-size: 1.2rem;
    }

    .summary {
      display: flex;
      gap: 20px;
      font-size: 0.95rem;
      color: #7f8c8d;

      span:last-child {
        font-weight: bold;
        color: #205b2c;
      }
    }
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th {
    text-align: left;
    padding: 12px 15px;
    color: #1e3a8a;
    font-weight: 500;
    border-bottom: 2px solid #f0f0f0;
  }

  td {
    padding: 12px 15px;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: middle;
  }

  .main-row {
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }
  }

  .details-row {
    background-color: #fafafa;

    td {
      padding: 0;
    }

    .details-container {
      padding: 15px;
    }

    .details-section {
      margin-bottom: 15px;

      h4 {
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #555;
        font-size: 0.9rem;

        .icon {
          font-size: 18px;
          color: #1976d2;
        }
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.85rem;
        line-height: 1.5;
      }

      &.special-note {
        background-color: #fff8e1;
        padding: 12px;
        border-radius: 6px;
        border-left: 3px solid #ffb74d;

        h4 {
          color: #e65100;
        }
      }
    }

    .tags-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 15px;
    }
  }

  .product-col {
    width: 33%;
  }

  .price-col,
  .quantity-col,
  .total-col,
  .stock-col {
    width: 22%;
  }

  .status-col {
    width: 18%;
  }

  .actions-col {
    width: 8%;
    text-align: center;
  }

  .product-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .product-icon {
      width: 36px;
      height: 36px;
      background-color: #e3f2fd;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1976d2;
    }

    .product-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .product-code {
      font-size: 0.8rem;
      color: #78909c;
      margin-top: 2px;
    }
  }

  .highlight {
    font-weight: bold;
    color: #1976d2;
  }

  .low-stock {
    color: #e53935;
    font-weight: bold;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;

    &.delivered {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    &.pending {
      background-color: #fff3e0;
      color: #f57f17;
    }
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.75rem;

    &.training {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    &.installation {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    &.shipping {
      background-color: #fff3e0;
      color: #e65100;
    }
  }

  .ctr_td.actions {
    display: flex;
    gap: 8px;
  }

  .icon-button-money {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #1b9a0f;
    transition: all 0.3s ease;

    &:hover {
      color: #076200;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .icon-button-person {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #0f899a;
    transition: all 0.3s ease;

    &:hover {
      color: #02626e;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
    
  .icon-button-build {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #9a840f;
    transition: all 0.3s ease;

    &:hover {
      color: #7c6801;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

// ---> ADDTRACKING OBSERVATIONS

export const AddTrackingStyled = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .field {
    margin-bottom: 16px;
  }

  .btnSubmit {
    background-color: #3b82f6;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    padding: 10px 20px;
    text-transform: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

// ---> LINETIME LISTA DE TRACKINGS

export const TimeLinePrewiewStyled = styled.div`
  margin-top: 30px;
  margin-left: 10px;

  .dividerchip {
    height: 4px;
    background-color: #78909c;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .chip {
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
  }

  .timeLineContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .timeLineItem {
    display: flex;
    gap: 10px;
    position: relative;
    margin-bottom: 20px;

    .line {
      width: 2px;
      height: 80%;
      background-color: #bcbcbc;
      position: absolute;
      top: 20px;
    }

    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top: -10px;
      left: 0;
      transform: translateX(-50%);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #9dcf00;

      svg {
        font-size: 24px;
        color: #fff;
      }
    }
  }
  .cardcontent {
    padding: 10px;
    margin-left: 20px;
    position: relative;
    border-radius: 8px;
    background-color: #fff;
    width: 100%;

    .titleaction {
      font-size: 16px;
      margin-bottom: 10px;
      color: #9e9e9e;
    }

    .titlecard {
      font-weight: bold;
      font-size: 12px;
    }

    .reason {
      color: #616161;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
