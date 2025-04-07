import styled from "styled-components";

export const TableSerialStyled = styled.div`
  transition: background-color 1s;
  transition: box-shadow 0.3s ease-in-out;
  transition: padding 1s ease-in-out;

  padding:${props => props.highlight ? "20px" : "0"};
  background-color:${props => props.highlight ? "white" : "none"};
  box-shadow: ${props => props.highlight ? "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;" : "none"};
  
  p {
    margin: 0;
  }
  .title_table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .primary {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon_primary {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
      p {
        font-size: 18px;
        letter-spacing: 0.04em;
        font-weight: 600;
        margin-right: 10px;
      }
      .load {
        color: #103c82;
      }
      .reload {
        color: #103c82;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .chip {
      margin-right: 5px;
      text-transform: capitalize;
    }
    .secondary {
      display: flex;
      align-items: center;
      color: #8a8a8a;
      font-size: 12px;
      svg {
        font-size: 18px;
        transition: all 0.3s ease;
      }
      &:hover {
        cursor: pointer;
        svg {
          font-size: 20px;
        }
      }
    }
  }
  .table {
    width: 100%;
    max-height: 70vh;
    overflow-x: auto;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .ctr_table {
    border-spacing: 0;
    margin: auto;
    width: inherit;

    &__head {
      position: sticky;
      top: 0;
      z-index: 50;
      &__tr {
        background-color: #dce1f6;
        padding: 5px 10px;
        height: 40px;
        .checkbox {
          position: sticky;
          left: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 3px 5px;
          background-color: #405189;
          color: #fff;
          /* min-width: 250px; */
          height: inherit;
          .MuiFormControlLabel-root {
            margin-right: 5px;
          }
          @media (max-width: 600px) {
            min-width: 100px;
            position: relative;
          }
        }
        .title {
          text-transform: capitalize;
          padding: 0 10px;
          .ctr_title {
            display: flex;
            align-items: center;
            width: max-content;
            /* min-width: 150px; */
          }
        }
      }
    }
    &__body {
      .row {
        background: #fff;
        font-weight: bold;
        color: #2c2c2c;
        transition: all 0.3s ease;
        min-height: 50px;

        .fixed {
          position: sticky;
          left: 0;
          background: #fff;
          transition: all 0.3s ease;
          @media (max-width: 600px) {
            position: relative;
          }
        }
        .data {
          font-size: 14px;
          padding: 0 10px;
          .ctr_td {
            display: flex;
            align-items: center;
            min-height: 42px;
            .showmore {
              cursor: pointer;
              color: blue;
            }
            .span {
              width: 100%;
              cursor: pointer;
            }
          }
          .capitalize {
            text-transform: capitalize;
          }
          .select {
            cursor: pointer;
          }
          .ejecutive {
            display: flex;
            align-items: center;
            min-height: 42px;
            text-transform: capitalize;
            cursor: pointer;
            justify-content: center;
          }
          .icon {
            svg {
              cursor: pointer;
              width: 25px;
              height: 25px;
              padding: 5px;
              background: #eaeaea;
              color: #103c82;
              border-radius: 50%;
            }
          }
          .ctr_icon_complete {
            justify-content: center;
            svg {
              cursor: pointer;
              width: 25px;
              height: 25px;
              padding: 5px;
              background: #103c82;
              color: #fff;
              border-radius: 50%;
            }
          }
          .ctr_icon_incomplete {
            justify-content: center;
            svg {
              cursor: pointer;
              width: 25px;
              height: 25px;
              padding: 5px;
              background: #8a8a8a;
              color: #fff;
              border-radius: 50%;
            }
          }
        }
        &:hover {
          background: #d8dbe6;
          opacity: 0.8;
          color: #000;
          .fixed {
            background: #d8dbe6;
          }
        }
      }
      .inpar {
        background: #f3f3f3;
        .fixed {
          background: #f3f3f3;
        }
        .options-td {
          background: #f3f3f3;
        }
      }
    }
  }
  .body_empty {
    position: relative;
    width: 200%;
    padding: 40px;
    height: 250px;
    .message_ctr {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      p {
        text-align: center;
        color: #8a8a8a;
      }
    }
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }

 .ctr_td.actions {
    display: flex;
    gap: 8px;
  }

 .icon-button-money {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #1B9A0F;
    transition: all 0.3s ease;
  
    &:hover {
    color: #076200;
    transform: scale(1.1);
    }
  
    &:active {
    transform: scale(0.95);
    }
  }
  .icon-button-person {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #0F899A;
    transition: all 0.3s ease;
  
    &:hover {
    color: #02626E;
    transform: scale(1.1);
    }
  
    &:active {
    transform: scale(0.95);
    }
  }
  .icon-button-build {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #9A840F;
    transition: all 0.3s ease;
  
    &:hover {
    color: #7C6801;
    transform: scale(1.1);
    }
  
    &:active {
    transform: scale(0.95);
    }
  }
`;