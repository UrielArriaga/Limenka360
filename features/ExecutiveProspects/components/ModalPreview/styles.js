import { Drawer, Paper, Popover } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

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
              background-color:  #E5FFEB;
            }
          }

          .cancel {
            background-color: transparent;
            border: 1px solid #D11712;
            color: #D11712;
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
  }

  &.drag-drop-area {
    border-color: #007bff;
    background-color: #f0f8ff;
  }
`;
