import styled from "styled-components";
import { scroll } from "../../../../styles/Orders.styles";
const getColor = props => {
  if (props.isDragAccept) {
    return "#2196f3";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#9e9e9e";
};


export const FilesFormStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  
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

  .item {
    .labelContainer {
      display: flex;
      margin-bottom: 10px;

      p {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }
      strong {
        color: red;
      }
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
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      min-height: 38px;
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
    height: 90px;
    width: 100%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.2);

    &:hover {
      background: #fff;
      cursor: pointer;
    }

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
.file-input {
    margin-top: 10px;
}
  .sectionlist {
    ${scroll}
    overflow: auto;
    overflow-x: hidden;
    .iconpng {
      width: 30px;
      margin-right: 10px;
    }
  }
    .labels{
    color: #103c82;
    font-weight: 500;
    margin-bottom:5px;
    }
  .count_files {
    margin-top: 10px;
    color: #103c82;
    font-weight: 500;
  }
  .filestoupload {
    margin-bottom: 20px;
    align-items: center;

    .itemupload {
      margin-bottom: 20px;
    }

    .fileselected {
      display: flex;
      align-items: center;
      border: 1px solid #dcdcdc;
      background-color: #fff;
      padding: 10px;
      margin-bottom: 20px;

      .inputfile {
        height: 30px;
        width: 90%;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
        background-color: #efeff1;
      }

      .rowname {
        &:hover {
          cursor: pointer;
          color: #757575;
        }
      }
      .iconpng {
        width: 30px;
        margin-right: 10px;
      }

      .name {
        font-weight: bold;
        font-size: 12px;
        margin-right: 10px;
      }

      .size {
        font-size: 9px;
        color: #757575;
      }

      .flexend {
        display: flex;
        padding-left: 10px;
        justify-content: flex-start;
      }

      .btncancel {
        color: #757575;
        height: 30px;
      }

      .removefile {
        font-size: 12px;
        color: #757575;
        &:hover {
          cursor: pointer;
          color: red;
        }
      }
      .btnupload {
        height: 30px;
      }
    }
  }
  .form_input {
    border: none;
    outline: none;
    cursor: default;
    color: transparent;
  }

  .type_file {
    width: 100%;
  }
  .row {
    display: flex;
    align-items: center;
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
`;
export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 32,
    minHeight: 32,
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
