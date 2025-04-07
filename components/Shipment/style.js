import styled from "styled-components";
import { Dialog } from "@material-ui/core";

export const ShipmentStyle = styled(Dialog)`
  .shipment_container {
    overflow: hidden;
    height: 100%;
    width: 100%;
    &__head {
      width: 100%;
      height: 100%;
      background-color: #103c82;
      .title_head {
        color: #fff;
        font-weight: 500;
        font-size: 17px;
        padding: 10px;
      }
    }
    &__body {
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow: auto;
      .title {
        font-size: 13px;
        color: grey;
      }
      .data {
        width: 100%;
        padding: 10px 5px;
        outline: none;
      }
      .totals {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .data_totals {
          margin-bottom: 3px;
          .amount {
            margin-left: 10px;
            font-weight: 500;
          }
        }
      }
    }
    &__footer {
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px;
        button {
          text-transform: capitalize;
          color: #fff;
        }
        .save_bt {
          background-color: #103c82;
          margin-left: 5px;
        }
        .cancel_bt {
          background-color: red;
        }
      }
    }
  }
`;
