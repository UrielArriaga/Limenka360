import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const BiomedicaStyle = styled.div`
padding:20px;
  .content_biome {
    &__header {
        display: flex;
        align-items: center;
      margin-bottom: 20px;
      .title_header {
        font-size: 24px;
        font-weight: 500;
        margin-right: 20px;
       span {
    font-size: 14px;
    font-weight: normal;
    color: #9e9e9e;
}
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
    }
    &__footer {
    }
  }
    .iconpng {
    width: 26px;
}
`;
