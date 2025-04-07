import styled from "styled-components";

export const ContactContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  width: 24%;
  max-height: 166px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px;
  }
  .directionIndex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleDirectionCount {
      display: flex;
      align-items: center;
      color: rgb(97, 97, 97);
      font-weight: 500;
      font-size: 14px;
      word-wrap: break-word;
      .fire {
        font-size: 12px;
        color: rgb(63, 81, 181);
        font-size: 16px;
      }
    }
  }
  .data {
    color: rgb(97, 97, 97);
    font-weight: 500;
    font-size: 14px;
    word-wrap: break-word;
    strong {
      font-weight: 300;
      font-size: 14px;
      color: #000;
    }
  }
`;