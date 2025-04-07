import styled from "styled-components";

export const CalendaryStyled = styled.div`
  * {
    margin: 0;
  }
  .ctr_calendary {
    background: #ebebea;
    border-radius: 8px;
    padding: 20px;
    .ctr_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .title {
        font-size: 24px;
        font-weight: bold;
      }
      .total_pendings {
        font-size: 14px;
        color: #8a8a8a;
      }
    }
    .ctr_body {
      background-color: #fff;
    }
    .ctr_footer {
      margin-top: 10px;
      display: flex;
      justify-content: end;
      color: #2c2c2c;
      height: 2em;
      a {
        color: #000;
        font-weight: bold;
      }
    }
  }
  .rbc-today {
    background-color: #eaf6ff;
    box-shadow: inset 0 0 0 3px #000;
  }
  .rbc-toolbar {
    margin-bottom: 10px;
    background-color: #ebebea;
    flex-direction: row-reverse;
    button {
      transition: all 0.4s ease;
      background-color: #8b9ab2;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button.rbc-active {
      transition: all 0.3s ease;
      background: #f7bb5b;
      color: #fff;
      border-radius: 4px;
    }
    button:hover {
      background: #f9deb2;
    }
  }

  .rbc-toolbar:first-child,
  .rbc-toolbar:last-child {
    justify-content: space-between;
  }

  .rbc-toolbar > span:first-child {
    display: flex;
    button:first-child:not(:last-child) {
      border-radius: 0;
    }
    button:not(:first-child):not(:last-child) {
      order: -1;
      border-radius: 4px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    button:last-child:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .rbc-toolbar .rbc-toolbar-label {
    padding: 0 10px;
    margin-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background-color: #f7bb5b;
    order: 3;
    width: 100%;
    height: 32px;
  }
  .rbc-off-range-bg {
    background: #103c821f;
  }
  .rbc-row-segment {
    padding: 0 5px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }

  .rbc-event,
  .rbc-day-slot .rbc-background-event {
    border: none;
    box-sizing: border-box;
    box-shadow: none;
    color: #000;
    margin: 0;
    padding: 0;
    background-color: transparent;
    width: 100%;
    text-align: left;
    &:focus {
      outline: none;
    }
    .target {
      position: relative;
      align-items: center;
      background: #103c82;
      border-radius: 4px;
      padding: 2px 5px;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 1.5px;
      /* width: max-content; */
      svg {
        font-size: 16px;
        margin-right: 2px;
      }
      .type {
        display: flex;
        align-items: center;
        width: max-content;
      }
      .hours {
        display: flex;
        width: max-content;
        font-size: 10px;
      }
      .pending {
        position: absolute;
        width: 9px;
        height: 9px;
        background: #b40000;
        top: 2px;
        right: 2px;
        border-radius: 50%;
      }
    }
    .visit {
      background: #03cd71;
    }
    .date {
      background: #fba92b;
    }
    .call {
      background: #9e9e9e;
    }
    .remember {
      background: #6682f2;
    }
    .task {
      background: #b247e3;
    }
    .complete {
      opacity: 0.4;
    }
  }
  .rbc-show-more {
    z-index: 4;
    font-weight: bold;
    font-size: 10px;
    height: auto;
    line-height: normal;
    color: #3174ad;
  }
  .rbc-day-slot .rbc-event-label {
    display: none;
  }
  span.rbc-toolbar-label {
    text-transform: capitalize;
  }

  .filters {
    margin-bottom: 10px;
    height: 40px;
    align-items: center;
    button {
      width: 100%;
      height: 25px;
      transition: all 0.4s ease;
      background-color: #8b9ab2;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #f9deb2;
    }
  }
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 100%;
  min-width: 400px;
  max-width: 600px;
  &:focus {
    outline: none;
    border: none;
  }
  .subject {
    border-radius: 8px 8px 0px 0px;
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: #103c82;
    color: #fff;
    svg {
      background: #103c82;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      font-size: 20px;
      vertical-align: sub;
    }
  }
  .modalBody {
    padding: 10px;
    label {
      font-weight: 500;
      font-size: 14px;
    }
    .name {
      text-transform: capitalize;
      width: max-content;
      font-size: 12px;
    }
    .email {
      width: max-content;
      font-size: 10px;
    }
    .n_a {
      /* font-size: 12px; */
      color: #8a8a8a;
    }
    .ctr_buttons {
      display: flex;
      flex-direction: column;
      button {
        margin: 2px 0px;
        text-transform: capitalize;
        font-size: 11px;
      }
    }
  }
`;
export const ModalContainerPayments = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 100%;
  min-width: 400px;
  max-width: 600px;
  &:focus {
    outline: none;
    border: none;
  }
  .subject {
    border-radius: 8px 8px 0px 0px;
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: #103c82;
    color: #fff;
    svg {
      background: #006f0e;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      font-size: 20px;
      vertical-align: sub;
    }
  }
  .modalBody {
    padding: 10px;
    label {
      font-weight: 500;
      font-size: 14px;
    }
    .name {
      text-transform: capitalize;
      width: max-content;
      font-size: 12px;
    }
    .email {
      width: max-content;
      font-size: 10px;
    }
    .n_a {
      /* font-size: 12px; */
      color: #8a8a8a;
    }
    .ctr_buttons {
      display: flex;
      flex-direction: column;
      button {
        margin: 2px 0px;
        text-transform: capitalize;
        font-size: 11px;
      }
    }
  }
`;
export const ModalContainerComplete = styled.div`
  .titleComplete {
    display: flex;
    padding: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: #103c82;
    color: #fff;
  }
  svg {
    color: white;
  }
`;
export const ModalNewPending = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  &:focus {
    outline: none;
    border: none;
  }
  .title {
    border-radius: 5px 5px 0px 0px;
    padding: 10px 20px;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    background-color: #0c203b;
    letter-spacing: 0.04em;
    color: #fff;
  }
  .modalBody {
    padding: 10px;
    .ctr_inputs {
      padding: 0 20px 20px 20px;
      &__label {
        font-size: 12px;
        font-weight: bold;
        color: #4f4f4f;
      }
      &__input {
        width: 100%;
        padding: 5px 0;
        border: none;
        border-bottom: 1.5px solid #ccc;
        transition: all 0.3s ease;
        font-size: 16px;
        min-height: 36px;
        resize: none;
        padding: 0px 5px;
        &:focus {
          outline: none;
          border: none;
          transition: all 0.3s ease;

          border-bottom: 1.5px solid #0d0d0d;
        }
      }
      .error {
        border-bottom: 1.5px solid #f50f;
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
    .ctr_buttons {
      display: flex;
      padding: 0 20px;
      padding-bottom: 20px;
      justify-content: flex-end;
      .btn_cancel {
        text-transform: capitalize;
        background: #7c0b0b;
      }
      .btn_save {
        margin-right: 10px;
        text-transform: capitalize;
        background: #0c203b;
      }
    }
    .ctr_slope {
      padding: 20px;
      &__title {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
        margin-bottom: 10px;
        span {
          color: #0c203b;
        }
      }
      &__item {
        width: 100%;
        .label {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: #626262;
          svg {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-right: 5px;
            color: #115293;
          }
        }
        .text {
          color: #000;
          font-weight: 600;
        }
        .span {
          color: #c7c7c7;
          font-size: 14px;
          font-weight: 500;
        }
      }
      &__ctr_buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        .btn_close {
          text-transform: capitalize;
          background-color: #000;
          color: #fff;
          margin-right: 10px;
        }
        .btn_complete {
          text-transform: capitalize;
          background: #0c203b;
          color: #fff;
        }
      }
    }
  }
`;
