import styled from "styled-components";

export const ModalContainer = styled.div`
 display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  width:400px;
  height: 6px;

    .headerDialog {
    display: flex;
    background: #0c203b;
    margin-bottom: 15px;
    padding: 10px 20px;

  }
  .title {
    color: white;
    font-weight: bold;
    font-size: 18px;
}
    .formDialog {
    padding: 10px;
    display: flex;
}
    .btn {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 9px;
}
   .btn_cancel {
    margin-right: 10px;
    text-transform: capitalize;
    background: #0d0d0d;
    color: white;
}
    .btn_save {
    background: #0c203b;
    color: white;
    text-transform: capitalize;
}

    .ctr_inputs {
      padding: 10px;

      &__label {
        font-size: 12px;
        font-weight: bold;
      }
      &__input {
        padding: 2px;
        background-clip: padding-box;
        border: 1px solid rgb(206, 212, 218);
        border-radius: 0.25rem;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
        width: 100%;
        &:focus {
          outline: none;
          border: none;
          transition: all 0.3s ease;

          border: 1.5px solid #0d0d0d;
        }
      }
      .capitalize {
        text-transform: capitalize;
      }
      .error {
        border: 1.5px solid #f50f;
      }
      &__span_error {
        height: 16px;
        font-weight: bold;
        letter-spacing: 0.05em;
        font-size: 10px;
        color: #f50;
        margin-top: 5px;
      }
    }
`;