import styled from "styled-components";
export const ListOrdersStyled = styled.div`
  padding: 20px;

  h3 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .containertable {
    margin-bottom: 20px;
    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
    max-height: 70vh;
    margin-top: 29px;

    &__products {
      .tablebody {
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      .tableheader {
        display: flex;
        background-color: #405189;
        color: white;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        padding: 10px;
        font-weight: bold;
        position: sticky;

        .tablehead {
          flex: 1;

          text-align: left;
          font-weight: bold;
        }

        .checkboxhead {
          flex: 0.2;
        }

        .tableheadproductname {
          flex: 3;
        }
        .center {
          text-align: center;
        }
      }

      .tablerow {
        display: flex;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px;
        font-weight: bold;
        min-height: 40px;

        color: #616161;
        cursor: pointer;

        .tablecell {
          flex: 1;

          text-align: left;
          color: #616161;
          font-weight: bold;
        }

        .tablecellcheckbox {
          flex: 0.2;
          input {
            cursor: pointer;
          }
        }

        .code {
          color: #000;
        }

        .actions {
          button {
            margin-right: 10px;

            background-color: #405189;
            color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px 10px;
          }
        }

        .tableheadproductrow {
          flex: 3;

          .content {
            width: 80%;
          }
        }
        .center {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }

  .listproducts {
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #f9f9f9;
  }

  .tablelist {
    padding-left: 10px;
    .tablelititem {
      align-items: center;
      font-size: 11px;
      display: flex;
      align-items: flex-start;
      padding: 20px 10px;
      border-bottom: 1px solid #e0e0e0;
      color: #000;
      font-weight: bold;

      .description {
        
        width: 50%;
        display: flex;
        margin-right: 10px;
      }
      .icon {
        font-size: 11px;
        margin-right: 10px;
      }
      .serialnumber {
        text-transform: uppercase;
        color: #00738e;
        margin-right: 10px;
        font-weight: bold;
      }
      .name {
        margin-right: 10px;
        &:hover {
          color: red;
          cursor: pointer;
          .delete {
            visibility: visible;
          }
        }
      }

      textarea {
        width: 300px;
        padding: 5px;
        height: 50px;
        border: 1px solid #ccc;
        border-radius: 5px;
        resize: vertical;
      }
      .contentdimentions{
      margin-left: 20px;
        justify-content: space-between;
        display: flex;
        width: 50%;
        /* background-color: red; */
        .inputdimentions {

        width: 40%;
        margin-left: 10px;
        padding: 5px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        resize: vertical;
    
      }

      .delete {
        color: red;
        visibility: hidden;
      }
      .btndelete {
        background-color: #039be5;
        padding: 5px;
        color: #fff;
        margin-left: 10px;
      }
      .iconBtnDelete {
        background-color: red;
        padding: 5px;
        color: #fff;
        margin-left: 10px;
      }

      .icondelete {
        font-size: 15px;
      }
    }
  }
}
`;