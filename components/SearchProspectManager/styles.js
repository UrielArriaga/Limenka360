import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
const Layout = styled.div`
  width: 100%;
  .input-container {
    z-index: 1000;
    width: 100%;
    border-radius: ${({ isFocused }) => (isFocused ? "8px 8px 0 0" : "8px")};
    border-radius: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 2px 2px 6px;
    .inputIcon {
      border-radius: 8px;
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      input {
        width: 100%;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        padding: 2px 2px 2px 25px;
        height: 35px;
        color: rgb(0, 0, 0);
        border: none;
        transition: all 0.6s ease 0s;
        &:focus {
          outline: none;
        }
      }
      .inputselected {
        background-color: red;
        width: 90%;
      }
      .iconSearch {
        position: absolute;
        left: 5px;
        font-size: 19px;
        color: #0d47a1;
        transition: all 500ms ease;
      }
      .writing {
        color: ${colors.primaryColor};
      }
    }

    .inputIconSelect {
      select {
        border: 1px solid #103c8224;
        height: 35px;
        color: rgb(0, 0, 0);
        outline: none;
        border: none;
        border: 4px;
        transition: all 0.6s ease 0s;
        border: 15px;
        border-left: 3px solid #103c82;
        &:focus {
          outline: none;
        }
      }
      .inputselect {
        border: 1px solid transparent;
        width: 100%;
        background-color: #fff;

        &:focus {
          outline: none;
        }
      }
      svg {
        position: absolute;
        left: 15px;
        font-size: 28px;
        color: #d2d4d4;
        transition: all 500ms ease;
      }
      .writing {
        color: ${colors.primaryColor};
      }
    }
    .filterList {
      background: #dce1f6;
      height: 35px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;

      .iconfilterList {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #103c82;
        cursor: pointer;
      }
    }
    .motion {
      display: flex;
    }
    .closeFilter {
      background: #dce1f6;
      height: 35px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #103c82;
        cursor: pointer;
      }
    }
  }
  .suggestions {
    position: absolute;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: width 0.3s ease-in-out;
    background-color: #fff;
    min-height: 62px;
    max-height: 300px;
    margin-top: 3px;
    border-radius: 16px;
    top: 51px;
    overflow: auto;
    visibility: ${({ isFocused }) => (isFocused ? "visible" : "hidden")};
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
  }

  .suggestions .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
  }
  .suggestions .notFound {
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 18px;
    p {
      color: #103c82;
      font-weight: 500;
    }
  }
  .suggestions .items {
    width: 100%;

    div:nth-child(odd) {
      background: #ededed;

      display: block;
      align-items: center;
    }

    div:nth-child(even) {
      background: #fff;
      display: block;
      align-items: center;
    }
  }
  .suggestions .items .item {
    padding: 8px 10px;
    cursor: pointer;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #dce1f6;
      color: #0d47a1;
      border-radius: 50%;
      margin-bottom: 6px;
    }
    &:hover {
      background-color: #cfd8dc;
      cursor: pointer;
    }

    ul.container {
      list-style: none;
      display: flex;
      align-items: center;
    }
    .container {
      display: flex;
      .person {
        display: flex;
        align-items: center;
      }
      .div {
        .email {
          font-size: 14px;
          color: #0d47a1;
          span {
            font-weight: bold;
            margin-right: 3px;
          }
        }
        .dates {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 3px;
          span {
            font-weight: bold;
            margin-right: 3px;
          }
        }
        .date {
          font-size: 13px;
          color: #838181;
          span {
            font-weight: bold;
            margin-right: 3px;
          }
        }
        .amount {
          font-size: 13px;
          color: #838181;
          span {
            font-weight: bold;
            margin-right: 3px;
          }
        }
        .discarted {
          font-size: 13px;
          font-weight: 500;
          color: red;
        }
      }
    }
  }
`;
export { Layout };
