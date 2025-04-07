import styled from "styled-components";

export const InventorydStyled = styled.div`
  display: flex;
  overflow: hidden;
  background: url(https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png);
  height: 100vh;
  background-size: cover;

  .MuiPaper-elevation8 {
    box-shadow: none !important;
  }
  .content_main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .container {
    width: calc(100% - 35px);
    margin: 25px auto 20px;
    height: fit-content;
    padding: 30px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: 1px solid rgba(213, 219, 219, 0.9);
  }
  .header {
    display: flex;
    align-items: center;

    &__text {
      display: flex;
      align-items: center;
    }
    &__icon {
      font-size: 30px;
      margin-right: 10px;
      color: #103c82;
    }
    &__title {
      font-size: 22px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .button-action {
    display: flex;
    justify-content: end;
  }
  .btn_add {
    background: #103c82;
    color: white;
    font-weight: bold;
  }
  .reload {
    color: #103c82;
    margin-left: 5px;
    cursor: pointer;
  }
  .content_data {
    margin-top: 30px;

    &__filter {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: 10px;
    }
  }
  .inputText {
    width: 100%;
    height: 40px;

    input {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
  .search {
    width: 30px;
    height: 30px;
    padding: 5px;
    color: rgb(138, 138, 138);
    transition: all 0.4s ease 0s;
    position: absolute;
    left: 10px;
  }
  .content_load {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 130px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
  }
  .content_loadtext {
    width: 30%;
    p {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 5px;
      text-align: center;
    }
  }
  .content_products {
    width: 100%;
  }
  .content_pagination {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 20px;
  }
  .totalProducts {
    font-weight: bold;
  }
  .content_table {
    width: 100%;
    min-height: 465px;
    max-height: 65vh;
    overflow-x: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  .table {
    width: 100%;
    .head {
      /* position: sticky; */
      top: 0;
      z-index: 50;
      position: sticky;
      .tr {
        background-color: #dce1f6;
        padding: 5px 10px;
        height: 40px;
        .fixed {
          /* position: sticky; */
          left: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 3px 5px;
          background-color: #405189;
          color: #fff;
          min-width: 250px;
          height: inherit;
          .MuiFormControlLabel-root {
            margin-right: 5px;
          }
          @media (max-width: 600px) {
            min-width: 80px;
          }
        }
        .title {
          text-transform: capitalize;
          padding: 0 10px;
          .ctr_title {
            display: flex;
            align-items: center;
            width: max-content;
            min-width: 200px;
            .iconArrow {
              margin-left: 9px;
              flex: 0 0 auto;
              color: rgb(255 255 255);
              background: #3f51b5;
              font-size: 20px;
              overflow: visible;
              text-align: center;
              cursor: pointer;
              border-radius: 50%;
            }
          }
        }
        .title.fix.code {
          position: sticky;
          left: 0;
          background: #dce1f6;
          transition: all 0.3s ease;
        }
      }
    }
    .body {
      .row {
        background: #fff;
        font-weight: bold;
        color: #2c2c2c;
        transition: background 0.3s ease;
        .fixed {
          position: sticky;
          left: 0;
          background: #fff;
          transition: background 0.3s ease;
        }
        .data {
          font-size: 14px;
          padding: 0 10px;
          .text {
            display: flex;
            align-items: center;
            svg {
              font-size: 14px;
              margin-right: 5px;
              color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
            }
          }
          .ctr_td {
            display: flex;
            align-items: center;
            min-height: 42px;
          }
        }
        .options-td {
          position: sticky;
          right: 0;
          background: #fff;
          transition: all 0.3s ease;
          .options {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #405189;
            opacity: 0.6;
            border-radius: 4px;
            transition: all 0.3s ease;
            &:hover {
              cursor: pointer;
              opacity: 1;
            }
            svg {
              color: #fff;
            }
          }
        }
        &:hover {
          background: #3f51b5;
          opacity: 0.8;
          color: #fff;
          transition: all 0.3s ease;
          .fixed {
            background: #3f51b5;
          }
          .options-td {
            background: #3f51b5;
            .options {
              background: #405189;
              opacity: 1;
            }
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
  .filter {
    display: flex;
    margin-left: 1%;
    color: white;
    padding: 6px;
    border-radius: 6px;
    background: rgb(16, 60, 130);
    cursor: pointer;
  }
  .content_filter {
    width: 100%;
    margin: 20px 0 20px 0px;
    display: flex;
    padding: 5px;
  }
  .select {
    z-index: 999;
    margin-right: 20px;
  }
  .MuiPaper-elevation8 {
    display: none !important;
  }
`;
