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
    .ctr_body{
      background-color: #fff;
    }
    .ctr_footer{
      margin-top: 10px;
      display:flex;
      justify-content: end;
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
      background: #F9DEB2;
    }
  }

  .rbc-toolbar:first-child, .rbc-toolbar:last-child{
    justify-content: space-between;
  }

  .rbc-toolbar > span:first-child{
    display: flex;
    button:first-child:not(:last-child) {
      border-radius: 0;
    }
    button:not(:first-child):not(:last-child) {
      order:-1;
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
    color: white ;
    background-color: #f7bb5b;
    order: 3;
    width: 100% ;
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
  .rbc-event, .rbc-day-slot .rbc-background-event {
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
        background: #B40000;
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
      background: #de5b70;
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
  .rbc-date-cell {
    -webkit-box-flex: 1;
        -ms-flex: 1 1 0px;
            flex: 1 1 0;
    min-width: 0;
    padding-right: 5px;
    text-align: right;
  }
  .rbc-button-link {
    color: inherit;
    background: none;
    font-size: 17px;
    @media (min-width: 1224px) {
      font-size: 12px;
    }
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    -webkit-user-select: text;
      -moz-user-select: text;
        -ms-user-select: text;
            user-select: text;
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
  .toast-message {
    .Toastify__progress-bar {
      background-color: #417afe;
    }
    .Toastify__close-button {
      color: white;
      background-color: red;
      width: 25px;
      padding: 1px;
      border-end-start-radius: 5px;
    }
    background-color: rgba(0,0,0,.82);
    padding: 0;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) -3px 3px 3px 3px, rgba(0, 0, 0, 0.09) -2px 2px 3px 3px;
    .main_container{
      display: grid;
      grid-template-columns: 20% 20% 60% 20% 20%;
      grid-auto-rows: minmax(70px, auto);
      div{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        flex-direction:column ;
        p{
          margin-top: 10px;
          font-size: 10px;
        }
      }
      
      .one{
        grid-column-start: 1;
        grid-column-end: 3;
        .btn_save{
          font-size: 10px;
          text-transform: capitalize;
          background: #417afe;
        }
      .two{
        grid-column-start: 4;
        grid-column-end: 6;        
      }
    }
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
    padding: 5px ;
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
      vertical-align: sub ;
    }
  }
  .modalBody{
    padding : 10px;
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
      margin-top: 30px;
      button {
        margin: 2px 0px;
        text-transform: capitalize;
        font-size: 11px ;
      }
    }
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
  .modalBody{
    padding : 10px;
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
        background: #7C0B0B;
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
    padding: 5px ;
    display: flex;
    align-items: center;
    background-color: #103c82;
    color: #fff;
    svg {
      background: #006F0E;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      font-size: 20px;
      vertical-align: sub ;
    }
  }
  .modalBody{
    padding : 10px;
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
        font-size: 11px ;
      }
    }
  }
`;
export const ChipsContainer = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  min-height: 50px;

  .chip {
    margin: 1px;
  }
`;
