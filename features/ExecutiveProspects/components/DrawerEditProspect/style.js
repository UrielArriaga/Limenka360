import styled from "styled-components";
import { lightBlue, grey, red } from "@material-ui/core/colors";

export const DrawerContent = styled.div`
  width: 900px;
  padding: 24px;
  overflow-y: auto;
  height: 100%;
  margin-bottom: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  .message {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
  }

  .close-button {
    position: relative;
    margin-left: 10px;
    margin-top: 20px;
    right: 8px;
    z-index: 1;

    color: red;
  }
  .first-section {
    margin-top: 0 !important;
  }
  .section-icon-person {
    color: #ffffff;
    background-color: rgb(0, 48, 138);
    border-radius: 50%;
    padding: 10px;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 37px;
    height: 37px;
    text-align: center;
  }
  .required {
    color: ${red[500]};
    margin-left: 4px;
  }
  .ContentTitleandAlert {
    display: flex;
  }
  .item {
    display: flex;
    align-content: center;
    flex-direction: column;
    font-size: 18px;
    width: auto;
    padding: 5px 9px;

    .input {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      height: 38px;
    }

    .input2 {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 300%;
      height: 38px;
    }
    .capitalize {
      text-transform: capitalize;
    }
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
    .inputComments {
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
      height: 25px;
    }
  }
  .btn_upload2 {
    background: #103c82;
    font-size: 1.1rem;
    color: #fff;
    text-transform: capitalize;
    margin-left: auto;
    margin-right: 10px;
    width: 20%;
    height: 40px;
    margin-top: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ctr_buttons {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    height: 40px;
    margin-left: auto;

    margin-top: 20px;

    .btn_cancel {
      background: #0c203b;
      color: #fff;
      font-size: 1.1rem;
      text-transform: capitalize;
      margin-right: 10px;
    }
    .btn_upload {
      background: #103c82;
      font-size: 1.1rem;
      color: #fff;
      text-transform: capitalize;
    }
  }
`;
export const Field = styled.div`
  margin-bottom: 20px;
`;

export const TypographyStyled = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin: 5px 0;

  .section-icon-person {
    margin-right: 10px;
    color: #fff;
    font-size: 1.3rem;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0056b3;
  margin: 30px 0 10px;
  padding: 10px 0;
  border-bottom: 2px solid rgb(180, 180, 180);
  .section-icon-info {
    margin-right: 10px;
    color: rgb(5, 47, 92);
    font-size: 1.3rem;
  }
`;
