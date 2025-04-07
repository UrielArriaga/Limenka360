import styled from "styled-components";
import { zIndexHeader } from "../../styles/global.styles";

export const ExecutiveProspectsStyled = styled.div`
  /* background-image: url("https://b24-0qdmjw.bitrix24.mx/bitrix/templates/bitrix24/themes/light/mysterious-vega/mysterious-vega.jpg"); */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  .header {
    position: sticky;
    top: 0;
    /* background-color: #ffffff; */
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    padding: 20px 10px;
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;
      /* color: #fff; */
      span {
        color: #616161;
      }
    }

    &__filters {
      display: flex;
      align-items: center;

      .inputContainer {
        width: 300px;
        position: relative;
        margin-right: 10px;
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

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        padding: 8px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }

  .main {
    flex: 1;
    overflow-y: auto;
    display: flex;
  }
`;

export const Container = styled.div`
  /* background-color: #eff1f3; */
  height: 100vh;
  padding: 20px;
`;
