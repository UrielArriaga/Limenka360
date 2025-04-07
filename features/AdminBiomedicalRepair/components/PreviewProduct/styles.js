import styled, { keyframes } from "styled-components";
export const PreviewProductStyled = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  overflow-y: hidden;
  padding: 16px;
  background: #f5f7fa;
  height: 100vh;
  .headerprview {
    background: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    .product {
      width: 375px;
    }
  }
  .content-exit {
    border-radius: 9px;
    height: 100vh;
    padding: 50px;
    min-height: 500px;
    background: white;
  }
  .btn-print-format {
    border-radius: 8px;
    background-color: #1e88e5;
    text-transform: capitalize;
    color: #fff;
    margin: 6px;
    gap: 10px;
    :hover {
      background-color: green;
    }
  }
  .btn_status {
    background: #034d6ff5;
    color: white;
    font-weight: bold;
    font-size: 12px;
    text-transform: capitalize;
  }

  .btn_status:hover {
    color: #000;
  }
  .btn_traking {
    margin-right: 15px;
    background: #1e88e5;
    text-transform: capitalize;
    color: white;
  }
  .btn_reviwed {
    margin-right: 15px;
    background: #1e88e5;
    text-transform: capitalize;
    color: white;
  }
  .disabled {
    background: rgba(0, 0, 0, 0.26);
    margin-right: 15px;
    text-transform: capitalize;
    color: white;
  }

  .ctr_container {
    background: white;
    padding: 20px;
    border-radius: 5px;
    h3 {
      font-size: 18px;
      font-weight: 500;

      span {
        font-size: 14px;
        font-weight: normal;
        color: #9e9e9e;
      }
    }
    .ctr_table {
      margin-top: 20px;
    }
    .formDialog {
      padding: 10px;
      display: flex;
    }
  }
  .ctr_data_Revised {

    background: white;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 16px;
    h3{
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 18px;
    }
    .info{
      display: flex;
      justify-content: space-between;
    }

    .formDataRevised {
      /* margin: 20px; */
      span {
        font-weight: bold;
        color: #084c6c;
      }
      p {
        font-weight: 500;
        color: #979b9e;
      }
      .url{
        cursor: pointer;
        color: #084c6c;
      }
    }
  }
`;

export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  border: 1px solid #ccc;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
