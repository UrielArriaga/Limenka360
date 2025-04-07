import styled from "styled-components";
const getColor = props => {
  if (props.isDragAccept) {
    return "#2196f3";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#9e9e9e";
};

export const ResumeOrderStyled = styled.div`
  /* width: 80%; */
  margin: 0 auto;

  .sectionheader {
    display: flex;
    align-items: center;

    .icon_primary {
      width: 30px;
      height: 30px;
      padding: 5px;
      background: #dce1f6;
      color: #103c82;
      border-radius: 50%;
    }
    p {
      font-size: 12px;
      letter-spacing: 0.04em;
      font-weight: 600;

      color: rgb(86 86 86);
    }
    .title {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      color: rgb(86 86 86);
      margin-bottom: 5px;
    }
  }
  .text {
    p {
      font-size: 12px;
      letter-spacing: 0.04em;
      font-weight: 600;
      color: rgb(86 86 86);
    }
  }

  .tablecontainer {
    margin-bottom: 20px;
    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
    max-height: 70vh;
    margin-top: 29px;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    /* overflow-y: auto; */

    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      overflow-y: auto;
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

      .tableheadproductname {
        flex: 3;
      }
      .center {
        text-align: center;
      }
    }

    .tablebody {
      overflow-y: auto;
      background-color: #fff;
    }

    .tablerow {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      padding: 10px;
      font-weight: bold;
      min-height: 40px;

      color: #616161;
      cursor: pointer;

      .tabledata {
        flex: 1;

        text-align: left;
        color: #616161;
        font-weight: bold;

        .fulltotal {
          font-weight: bold;
          color: #000;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          /* justify-content: center; */
          text-align: center;
          /* align-items: center; */
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

  .sectionfooter {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    button {
      /* background-color: #405189;
      color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 5px 10px; */
    }
  }
  .row {
    display: flex;
    align-items: center;
  }
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    .bt_save {
      color: #fff;
      background-color: #103c82;
      text-transform: capitalize;
    }
  }
`;
