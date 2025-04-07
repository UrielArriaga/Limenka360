import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const ContainerDirections = styled.div`
  .headContainer {
    display: flex;
    align-items: center;
    .titles {
      display: flex;
      align-items: center;
      margin-left: 11px;
      strong {
        margin-left: 5px;
        color: #006e19;
      }
      svg {
        color: #006e19;
      }
    }
    .title {
      color: black;
      font-weight: bold;
      font-size: 15px;
    }

    .titleRequired {
      display: flex;
      align-items: center;
      margin-left: 11px;
      strong {
        margin-left: 5px;
        color: #a90707;
      }
      svg {
        color: #a90707;
      }
    }
  }
`;

export const CardGrid = styled.div`
  margin-bottom: 30px;
  gap: 13px;
  padding: 0;
  padding-top: 11px;
  flex-wrap: wrap;
  display: flex;
  overflow: auto;
  height: 222px;

  margin-top: 14px;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
`;

export const Card = styled.div`
  height: 190px;
  margin-left: 12px;
  width: 253px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${props => (props.selected ? "rgb(40 80 145 / 9%)" : "#ffffff")};
  box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid white;
  border: ${props => (props.selected ? "1px solid rgb(206 215 229)" : "1px solid #ffffff00")};
  &:hover {
    background-color: #3f51b512;
    transform: scale(1.02);
    border: 1px solid #c6ceff;
  }
  .title {
    color: #272727;
    font-size: 13px;
    span {
      color: rgb(97, 97, 97);
      font-weight: bold;
      font-size: 13px;
      margin-right: 2px;
    }
  }
  .item {
    display: flex;
    align-items: center;
    .icon {
      color: rgb(63, 81, 181);
      font-size: 16px;
    }
    .capitalize {
      font-weight: bold;
      letter-spacing: 0.03em;
      font-size: 13px;
    }
  }
`;

export const SelectedAddress = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #00796b;
  border-radius: 8px;
  background-color: #e0f2f1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h2 {
    margin-top: 0;
    color: #00796b;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #004d40;
  }
`;
