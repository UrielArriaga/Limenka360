import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const EjecutiveClientsStyled = styled.div`
  background: #eaeaea;
  border-radius: 8px;
  padding: 10px;
  height: 100%;
  .settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &__ctr_title {
      display: flex;
      align-items: center;
      .title {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.02em;
        margin-right: 2px;
      }
      .icon {
        font-size: 16px;
        color: ${colors.primaryColor};
        cursor: pointer;
      }
    }
    &__ctr_total_load {
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        color: #8a8a8a;
      }
    }
  }
  .ctr_targets {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 10px;
    &__client {
      border-radius: 4px;
      background: #fff;
      padding: 10px 0px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      margin: 0 5px;
      margin-bottom: 10px;
      line-height: 20px;
      position: relative;
      &__info{
        padding: 0px 10px;
        &__label {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          color: #103c82;
          svg {
            font-size: 14px;
            margin-right: 5px;
            color: #103c82;
          }
        }
      }
      &__icon {
        display: flex;
        justify-content: center;
        svg {
          font-size: 2rem;
          color: #103c82;
        }
      }
      .name {
        text-transform: capitalize;
        color: #000;
        font-size: 14px;
        font-weight: 600;
      }
      .contact {
        font-size: 14px;
        font-weight: 600;
      }
      .last_contact {
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }
      &__navigate {
        position: absolute;
        display: flex;
        background-color: #4678f2;
        padding: 1px 15px;
        border-radius: 4px;
        top: 1px;
        right: 1px;
        cursor: pointer;
        p {
          font-size: 10px;
          margin-right: 5px;
          color: #fff;
        }
      }
    }
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
  .ctr_empty_clients {
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    &__ctr_img {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      img {
        width: 80%;
        height: 200px;
        object-fit: contain;
      }
    }
    p {
      font-size: 16px;
      color: #8a8a8a;
      font-weight: 500;
    }
  }
  .ctr_pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
