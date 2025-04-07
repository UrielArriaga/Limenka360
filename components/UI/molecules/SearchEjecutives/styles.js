import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

const Layout = styled.div`
  .input-container {
    height: 32px;
    border-radius: 8px;
    border: none;
    border: 1px solid #fff;
    background-color: ${colors.secondaryColor};
    width: ${({ isFocused }) => (isFocused ? "500px" : "200px")};

    border-radius: ${({ isFocused }) => (isFocused ? "8px 8px 0 0" : "8px")};
    transition: width 0.3s ease-in-out;
    position: relative;
  }

  input {
    height: 100%;
    background-color: transparent;
    border: none;
    padding: 10px;
    border-radius: 8px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  .suggestions {
    position: absolute;
    top: 40px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: width 0.3s ease-in-out;
    background-color: #fff;
    visibility: ${({ isFocused }) => (isFocused ? "visible" : "hidden")};
    min-height: 62px;
    max-height: 300px;
    width: ${({ isFocused }) => (isFocused ? "500px" : "200px")};
  }

  .suggestions .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }
  .suggestions .items {
    div:nth-child(odd) {
      background: #eeeeee;
    }
    div:nth-child(even) {
      background: #fff;
    }
  }

  .suggestions .items .item {
    padding: 5px 10px;

    &:hover {
      background-color: #cfd8dc;
      cursor: pointer;
    }
    /* background-color: red; */
  }
`;

export { Layout };
