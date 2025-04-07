import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 550px;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
  /* height: 600px;
  padding: 10px; */
  /* display: flex; */
  .title {
    margin-bottom: 10px;
  }
  .content_title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .button{
    padding: 5px;
    border-radius: 4px;
    border: none; 
    background-color: #3174ad;
    color: white;
    text-transform: capitalize;
    cursor: pointer;
    :hover{
      background-color: #404a7a;
    }
    }
  }
  .past-event {
  background-color: red !important; 
  color: white; 
}


  .rbc-calendar {
    background-color: white;
  }

  .rbc-today {
    background-color: #eaf6ff;
    box-shadow: inset 0 0 0 2px #4a9cd3;
    border-radius: 4px;
  }
  .rbc-toolbar {
    background-color: #ebebea;
    position: relative;
    flex-direction: row-reverse;
    button {
      transition: all 0.4s ease;
      background-color: #fff;
      color: #4336fe;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button.rbc-active {
      transition: all 0.3s ease;
      background: rgba(178, 201, 255, 0.8);
      color: #fff;
      border-radius: 4px;
    }
    button:hover {
      background: #4a9cd3;
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

  .rbc-toolbar > span:first-child {
    position: absolute;
    margin: 30px 10px 0 0;
  }
  .rbc-toolbar > span:last-child {
    position: absolute;
    left: 0;
    margin: 30px 0 0 10px;
  }

  /* .rbc-toolbar > span:first-child > button:nth-child(2) {
    margin-right: 50px;
    background-color: red;
  }
  .rbc-toolbar > span:first-child > button:nth-child(3) {
    margin-left: 50px;
    background-color: green;
  } */

  .rbc-toolbar .rbc-toolbar-label {
    padding: 10px 10px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background: #193364;
    border-radius: 4px;
    order: 3;
    width: 100%;
    height: 70px;
  }
  .rbc-toolbar button {
    color: white;
    background-color: transparent;
    font-size: 13px;
  }
  .rbc-month-view {
    position: relative;
    /* border: 1px solid #ddd; */
    display: flex;
    flex-direction: column;
    flex: 1 0;
    width: 100%;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    height: 100%;
  }
  .rbc-day-bg {
    :hover {
      cursor: pointer;
      background-color: #103c821f;
    }
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
      border-radius: 0px 4px 4px 0px;
      margin-bottom: 3px;
      font-weight: 500;
      padding: 5px;
      /* width: 100%;
      display: flex;
      position: relative;
      align-items: center;
     b
      /*  */
      /* padding: 0px 0px 0px 2px; */
      /* color: #fff;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 3.5px; */
      */
      /* opacity: 0.7;
      transition: 0.3s; */
      /* width: max-content; */
      svg {
        font-size: 16px;
        margin-right: 2px;
      }
      .targetContent {
        align-items: center;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 2px;
        transition: 0.3s;
        .nameIcon {
          justify-content: space-around;
          display: flex;
          p {
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .hours {
          display: flex;
          width: 100%;
          justify-content: space-around;
          font-size: 10px;
        }
      }

      .status1 {
        color: #0080008a;
      }
      .status3 {
        color: #ff000087;
      }
      .status6 {
        color: #03cd71;
      }
      .status4 {
        color: orange;
      }
      .status0 {
        color: #0080009e;
      }

      /* .status3 {
   
       color: #03cd71;
      }
      .status4 {
   
       color: orange;
      }
      .status5 {
       color: red;
      } */

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
    .status1 {
      border-left: 3px solid purple;
    }
    .status3 {
      border-left: 3px solid #ff000087;
    }
    .status6 {
      border-left: 3px solid green;
    }
    /* .status4 {
        border-left:3px solid orange;
      } */
    .status0 {
    }
    .status4 {
      border-left: 3px solid #f1ca0b;
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
    font-size: 12px;
    font-weight: 600;
    /* background-color: #3f49793d; */
    height: 18px;
    width: 19px;
    color: #404a7a;
    border-radius: 12px;
    margin: 2px;
    @media (min-width: 1224px) {
      font-size: 12px;
    }

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
  .rbc-header {
    font-size: 14px;
    text-transform: capitalize;
    font-weight: bold;
    color: #404a7a;
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
    background-color: rgba(0, 0, 0, 0.82);
    padding: 0;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) -3px 3px 3px 3px, rgba(0, 0, 0, 0.09) -2px 2px 3px 3px;
    .main_container {
      display: grid;
      grid-template-columns: 20% 20% 60% 20% 20%;
      grid-auto-rows: minmax(70px, auto);
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        flex-direction: column;
        p {
          margin-top: 10px;
          font-size: 10px;
        }
      }

      .one {
        grid-column-start: 1;
        grid-column-end: 3;
        .btn_save {
          font-size: 10px;
          text-transform: capitalize;
          background: #417afe;
        }
        .two {
          grid-column-start: 4;
          grid-column-end: 6;
        }
      }
    }
  }
  .rbc-off-range-bg {
    background: rgba(49, 128, 255, 0.1);
  }
  .target-event-calendar {
    border-radius: 5px;
    font-size: 12px;
    height: 30px;
    color: #404a7a;
    margin-top: 2px;
    /* border-left: 5px solid #24b0db; */
    background-color: #dceff7;
    display: flex;
    .content_icon {
      border-radius: 5px 0px 0px 5px;
      text-align: center;
      align-items: center;
      width: 35px;
      background: rgba(36, 176, 219, 0.51);
      padding: 9px;
    }
    .icon {
      font-size: 15px;
    }
    .title {
      p {
        padding: 4px;
      }
    }
  }
  .target-event-calendar-day {
    border-radius: 0px 5px 5px 0px;
    width: 60px;
    padding: 4px;
    font-size: 12px;
    color: #404a7a;
    margin-top: 2px;
    border-left: 5px solid rgb(50, 150, 238);
    background-color: rgb(220, 220, 220);
  }
`;
