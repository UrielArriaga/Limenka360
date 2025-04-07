import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { device } from "../global.styles";

export const LayoutDirector = styled.div`
  /* height: 100vh; */

  /* background-color: red; */
  /* outline: 1px solid red; */
  width: 100%;
  display: flex;

  background-size: cover;
  .date {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-direction: column;

    @media ${device.md} {
      flex-direction: row;
    }

    /* p {
      font-size: 20px;
    } */

    .right_side {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
      cursor: pointer;
      @media ${device.md} {
        margin-top: 0;
      }
    }

    .icon_button {
      background-color: rgba(0, 112, 201, 0.3);
      border-radius: 8px;
    }

    .greeting {
      font-size: 13px;
      color: #616161;

      .day {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }

  .main {
    background-color: #f1f1f1;
    padding: 20px 20px 100px 20px;
    /* height: 100%; */

    /* width: calc(100% - 40px); */
    /* overflow: scroll; */
    /* height: 100vh; */
  }
`;

const Test = styled.div`
  background-color: ${props => (props.isBig ? "red" : "blue")};
  background-color: ${({ isBig }) => (isBig ? "red" : "blue")};
`;

<Test className="x" isBig></Test>;
