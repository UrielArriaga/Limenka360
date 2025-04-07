import { Paper, Popover, withWidth } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

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
      flex-direction: column;
      align-items: center;
      width: 100%;
      border: 1px solid rgb(63, 81, 181, 0.2);
      height: 90px;
      svg {
        font-size: 25px;
        margin: 10px;
      }

      .media_file {
        width: 100%;
        display: flex;
        .content_file {
          width: 100%;
          display: flex;
          flex-direction: column;
          .title_file {
            margin: 5px 0px;
            font-size: 12px;
            width: 17vh;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: fit-content;
          }
          .type_file {
            font-size: 12px;
          }
        }

        .select_type {
          font-size: 12px;
          padding: 0px;
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .upload {
          color: blue;
          border: 1px solid blue;
          text-transform: capitalize;
          font-size: 12px;
          height: 18px;
        }
        .cancel {
          color: red;
          border: 1px solid red;
          text-transform: capitalize;
          font-size: 12px;
          height: 18px;
        }
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
        color: blue;
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
  height: 90px;
  display: flex;
  flex-direction: column;
  padding: 2px;
  border-left: 4px solid ${props => props.typefile && props.typefile};
  .header {
    display: flex;
    align-items: center;
    justify-content: right;
    .options {
      border-radius: 8px;
      transition: 0.2s;
      &:hover {
        color: #fff;
        background-color: #3f51b5;
        cursor: pointer;
      }
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
    svg {
      font-size: 25px;
      color: ${props => props.typefile && props.typefile};
    }
    .title_name {
      font-size: 14px;
      font-weight: 500;
      width: 17vh;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
    .title_fileType {
      font-size: 12px;
      font-weight: 500;
      color: ${colors.primaryColorDark};
      width: 15vh;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
  .footer {
  }
`;
export const CardDefault = styled.div`
  .label {
    display: flex;
    height: 90px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    border: thick dotted rgb(63, 81, 181, 0.2);
    &:hover {
      background-color: rgb(63, 81, 181, 0.2);
      cursor: pointer;
      border: thick dotted transparent;
      padding: 1;
    }
    .input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: relative;
      z-index: -1;
    }
  }
  .default_icon {
    font-size: 4vh;
    color: rgb(63, 81, 181, 0.5);
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

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    width: "90%",
    height: 15,
    minHeight: 25,
    fontSize: 12,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #dcdcdc" : "1px solid #dcdcdc",
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    marginTop: -15,
    marginRight: -10,
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none",
    marginTop: -15,
  }),
  valueContainer: base => ({
    ...base,
    marginTop: -15,
  }),
};
