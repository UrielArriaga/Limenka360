import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
const getColor = props => {
  if (props.isDragAccept) {
    return "#2196f3";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#9e9e9e";
};

const getHeigth = props => {
  if (props.isDragAccept) {
    return "200px";
  }
  if (props.isDragReject) {
    return "200px";
  }

  return "70px";
};

export const FilesEditStyled = styled.div`
  .sectionheader {
    display: flex;
    align-items: center;
    margin: 15px 0px 15px 0px;

    .icon_primary {
      width: 30px;
      height: 30px;
      padding: 5px;
      background: #dce1f6;
      color: #103c82;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;

      color: rgb(86 86 86);
    }
    .title {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      color: rgb(86 86 86);
    }
  }
  label.file-label {
    display: inline-block;
    padding: 5px;
    background-color: #3d76fe;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    border: 1px dashed #3d5afe;
    width: 70%;
    color: #fff;
  }
  label.file-none {
    display: inline-block;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    border: 1px dashed #3d5afe;
    color: #3d5afe;
    width: 70%;
  }
  .containerTitleFile {
    display: grid;
    gap: 2px;
    align-items: center;
  }
  .billing {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .billing_header {
      display: flex;
      align-items: center;
    }
    .required_billing {
      display: flex;
      align-items: center;
      .title_bill {
        color: ${colors.primaryColorDark};
        font-size: 13px;
      }
      .switch {
        margin-bottom: -3px;
      }
    }
  }
  .container_form {
    .title_item {
      font-size: 13px;
      margin-bottom: 5px;
      color: grey;
    }
    .select_form {
      width: 100%;
      font-size: 13px;
    }
    .textarea_form {
      width: 100%;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      resize: none;
      outline: none;
      padding: 5px;
      font-size: 12px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
    }
    .input_form {
      width: 100%;
      height: 35px;
      font-size: 13px;
      outline: none;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
    }
  }
  .buttons {
    margin-top: 5%;
    display: flex;
    flex-direction: row-reverse;
    .bt_next {
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      margin-left: 5px;
    }
    .bt_back {
      text-transform: capitalize;
    }
  }

  .dropzone {
    padding: 20px;
    border: 2px dashed #dcdcdc;
    border-color: ${props => getColor(props)};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: ${props => getHeigth(props)};
    margin: 0 auto;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .iconupload {
      font-size: 30px;
      color: #616161;
    }
    .highligth {
      color: #3d5afe;
    }
    .icon {
      font-size: 50px;
      color: #dcdcdc;
    }
    .title {
      font-size: 15px;
      font-weight: 500;
      color: #dcdcdc;
    }

    font-size: 13px;
    font-weight: bold;
  }

  .sectionList {
    margin-top: 30px;
    font-size: 12px;
    height: 100%;
    /* overflow-y: auto; */
    /* height: 670px; */

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirectorr};
    }

    .rowname {
      display: flex;
      align-items: center;
      width: 100%;

      &:hover {
        cursor: pointer;
        color: #757575;
      }
    }

    .file {
      img {
        width: 30px;
        /* height: 50px; */
        margin-right: 6px;
      }
    }
    .inputfile {
      height: 30px;
      width: 100%;
      padding-left: 4px;
    }

    .articleproduct {
      font-size: 10px;
      margin-top: 2px;
      color: #757575;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      thead {
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 11;

        tr {
          th {
            padding: 10px;
            text-align: left;
            font-weight: 500;

            color: #757575;
            border-bottom: 1px solid #dcdcdc;
          }
        }
      }
      tbody {
        tr {
          td {
            color: #000;
            font-weight: bold;
            padding: 10px;
            border-bottom: 1px solid #dcdcdc;
          }
        }
      }
    }
    .iconButtonDisabled {
      pointer-events: none;
      cursor: not-allowed;
    }
    .iconButton {
      padding: 0;
      margin: 0;
      margin-right: 10px;
      font-size: 12px;

      &:hover {
        .iconMUI {
          color: #039be5;
        }
      }

      .iconMUI {
        font-size: 26px;
      }
    }
  }
`;
export const selectStyle = {
  control: (base, state) => ({
    ...base,
    // height: 32,
    // minHeight: 32,
    fontSize: 12,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    backgroundColor: "#EFEFF1",
  }),
  singleValue: (provided, state) => ({
    ...provided,

    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,

    color: "#1e3a47",
    borderRadius: "4px",

    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  menuPortal: base => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,

    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};
