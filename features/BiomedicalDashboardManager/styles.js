import styled from "styled-components";

export const BiomedicaManagerStyle = styled.div`
  padding: 20px;
  .content_biome {
    .contentDataGeneral {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .title_header {
        font-size: 24px;
        font-weight: 500;
        margin-right: 20px;
        span {
          font-size: 20px;
          font-weight: normal;
          color: #9e9e9e;
        }
      }
    }
    &__countersCard {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .cardCounter {
        display: flex;
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 7px;
        font-weight: normal;
        width: 20%;
        border-bottom: 2px solid #b1d5f9;
        .icon {
          background-color: #b1d5f9;
          border-radius: 50%;
          height: 50px;
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px;
          .entry {
            font-size: 30px;
            color: #345d9d;
          }
        }
        .infoEntry {
          margin-left: 5%;
          color: #9e9e9e;
          font-weight: normal;
        }
        .quantity {
          font-size: 25px;
        }
      }
      .entries {
        /* background-color: #afe692; */
      }
      .entriesrevised {
        /* background-color: #97e2c8; */
        margin-left: 2%;
      }
      .productsFails {
        margin-left: 2%;
        /* background-color: #97d5e2; */
      }
    }
    &__calendar {
      /* background: #ebebea; */
      background: #516b8a;
      border-radius: 8px;
      padding: 20px;
      margin-top: 2%;
      width: 49%;
      .compontentCalendar {
        padding: 7px;
        background-color: white;
        /* background-color:#516b8a; */
        h3 {
          padding: 10px 0px;
        }
      }
    }
    &__graph {
      width: 49%;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      padding: 15px;
      height: 100%;
      h3 {
        background-color: #034d6f;
        color: white;
        padding: 15px 7px;
        margin-bottom: 1%;
        border-radius: 6px;
        font-weight: bold;
        font-size: 17px;
      }
      p {
        color: #516b8a;
        text-align: center;
        padding: 10px 0px;
        border-top:1px solid #516b8a;
        span {
          background-color: #03cd71;
          border-radius: 4px;
          color: white;
          padding: 5px;
        }
      }
    }
    .rbc-today {
    background-color: #eaf6ff;
    box-shadow: inset 0 0 0 3px #000;
  }
    .rbc-toolbar {
      margin-bottom: 10px;
      background-color: white;
      padding: 7px;
      /* background-color:#516b8a; */
      flex-direction: row-reverse;
      button {
        transition: all 0.4s ease;
        background-color: #8b9ab2;
        color: #fff;
        border: none;
        /* border-radius: 4px; */
        cursor: pointer;
      }
      button.rbc-active {
        transition: all 0.3s ease;
        background: #034d6f;
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
      background-color: #034d6f;
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
  }
  .inputContainer {
    width: 300px;
    position: relative;
    input {
      font-size: 13px;
      color: black;
    }
    &__icon {
      position: absolute;
      font-size: 16px;
      top: 8px;
      left: 10px;
      color: #ccc;
    }

    &__input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
      height: 34px;
      margin-right: 20px;
      padding-left: 30px;
    }

    &__clean {
      position: absolute;
      font-size: 16px;
      top: 6px;
      right: 5px;
      color: #ccc;
      padding: 0;
      margin: 0;
      color: #059be5;
    }
  }
  .filters {
    display: flex;
    z-index: 10;
    position: relative;
    margin-bottom: 50px;
    .select_filter {
      font-size: 14px;
    }
  }
  .table_products {
    .table {
    }
  }

  &__footer {
  }

  .iconpng {
    width: 26px;
  }
`;
