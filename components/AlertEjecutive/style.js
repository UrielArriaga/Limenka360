import { motion } from "framer-motion";
import styled from "styled-components";

export const AlertStyle = styled(motion.div)`
  position: absolute;
  z-index: 100;
  top: 50px;
  right: 20px;
  border-radius: 8px;
  width: 480px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  .content_alert {
    border-left: 6px solid green;
    background-color: #fff;
    padding: 10px;
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      cursor: pointer;
      .title_header {
        font-weight: 500;
        margin-left: 10px;
      }
      svg {
        font-size: 25px;
      }
      .success {
        color: green;
      }
      .warning {
        color: #f89313;
      }
      .delivery {
        color: #1397f8;
      }
    }
    &__body {
      margin-bottom: 20px;
      cursor: pointer;
      .content_map {
        width: 100%;
        .title_folio {
          display: flex;
          justify-content: space-between;
        }
      }
      .title_table {
        margin-top: 10px;
        display: flex;
        padding: 2px;
        padding: 0px 7px 0px 7px;
        justify-content: space-between;
        background-color: #939393;
        border-radius: 4px 4px 0px 0px;
        b {
          font-weight: 400;
          color: white;
        }
      }
      .title_desc {
        display: flex;
        padding: 0px 7px 0px 7px;
        justify-content: space-between;
        p {
          color: #393939;
        }
      }
    }
    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .fromnow {
        font-size: 12px;
        color: #999;
      }
      .buttons {
        .accept {
          color: #fff;
          text-transform: capitalize;
          background-color: #1397f8;
          font-size: 12px;
        }
        .view{
          margin-right: 10px;
          color: #fff;
          text-transform: capitalize;
          background-color: #1397f8;
          font-size: 12px;
        }
      }
    }
  }
`;
