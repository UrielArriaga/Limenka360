import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const graphColor = percentage => {
  if (percentage >= 80) return "#4CAF50";
  if (percentage >= 50) return "#81d1d1";
  if (percentage >= 20) return "#e46f0a";
  if (percentage < 20) return "#db1414";
};

export const EjecutivePendingsStyled = styled.div`
  .pendings {
    width: 100%;
    border-radius: 8px;
    padding: 15px 10px;
    background-color: #eaeaea;
    .settings {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      p {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.02em;
      }
      svg {
        color: ${colors.primaryColor};
        cursor: pointer;
      }

    }
    .progress {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 10px;
      .data {
        position: absolute;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #707070;
        font-weight: 500;
        .title {
          font-weight: 500;
          color: #707070;
        }
      }
    }

    .slopes {
      line-height: 40px;
      .slope {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        .label {
          display: flex;
          align-items: center;
          font-weight: bold;
          svg {
            font-size: 10px;
            margin-right: 5px;
          }
        }
        .empty {
          font-size: 12px;
          color: #8a8a8a;
          font-weight: 500;
        }
        .percentage {
          font-weight: 500;
          color: #8a8a8a;
          font-size: 14px;
        }
      }
    }
  }
  .tablePendings {
    background-color: #eaeaea;
    padding: 10px;
    border-radius: 8px;
    .title_pendings {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      margin-bottom: 10px;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
        }
      }
      .filters {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8a8a8a;
        cursor: pointer;
        position: relative;
        transition: all 1s ease;
        .chips {
        display: flex;
        }
        p {
          font-size: 14px;
          /* font-weight: 500; */
        }
        svg {
          transition: all 0.4s ease;
          font-size: 18px;
        }
      }
      .listFilters {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        transition: all 1s ease;
        .close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          color: #103c82;
          background-color: #e6f0ff;
          padding: 5px;
          font-size: 20px;
          cursor: pointer;
          margin-right: 10px;
        }
        .ctr_date {
          display: flex;
          flex-direction: column;
          margin: 0 5px;
          label {
            font-size: 12px;
            font-weight: 500;
            color: blue;
          }
          .date {
            border: none;
            font-size: 16px;
            border-bottom: 1px solid #cfcfcf;
            &:focus {
              outline: none;
            }
          }
        }
        .search {
          background-color: #103c82;
          color: #fff;
          width: 40px;
          padding: 2px 5px;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            transition: all 0.6s ease;
            transform: scale(1.1);
          }
        }
      }
    }

    .ctr_filters {
      background-color: white;
      padding: 1em;
      margin-bottom: 1em;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        margin-bottom: 10px;
        svg {
          color: #8a8a88;
          font-size: 20px;
        }
      }
      label {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .input {
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        color: #495057;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        margin-bottom: 10px;
        padding: 0.47rem 0.75rem;
        width: 100%;
        height: 40px;
        border: 2px solid #f3f3f3;
        color: #000;
      }
      &__ctr_buttons {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
        .btn_search {
          text-transform: capitalize;
          background: ${colors.primaryColor};
          color: #fff;
        }
      }
    }
    
    .pagination_pendings {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      .total {
        font-size: 14px;
        font-weight: 500;
      }
      .ctr_btn {
        display: flex;
      }
      .btn_pag {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        font-size: 30px;
        cursor: pointer;
        color: #8a8a8a;
      }
      .btn_next {
        color: #103c82;
      }
    }
  }
`;
