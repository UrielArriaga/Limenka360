import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const ProductsStyle = styled.div`
  width: 100%;
  .products_container {
    width: 100%;
    &__head {
    }
    &__body {
      .products {
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-y: hidden;
        overflow-x: auto;
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
        .target_tracing {
          padding: 10px;
          height: 210px;
          margin: 10px;
          width: max-content;
          min-width: 320px;
          max-width: 350px;
          border-radius: 8px;
          position: relative;
          box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
          &::before {
            top: 0px;
            left: 0px;
            width: 5px;
            bottom: 0px;
            content: "";
            position: absolute;
            background-image: linear-gradient(
              to right bottom,
              #3f51b5,
              #2d499e,
              #1e4086,
              #13376f,
              #0e2d58,
              #122d55,
              #142c51,
              #172c4e,
              #20355c,
              #2a3e6b,
              #35487a,
              #405189
            );
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
            .item {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .icon {
                color: #3f51b5;
                font-size: 16px;
              }
              .date {
                font-size: 12px;
                font-weight: bold;
                color: #0c203b;
              }
              .capitalize {
                text-transform: capitalize;
              }
            }
          }
          .span {
            font-weight: bold;
            letter-spacing: 0.03em;
            font-size: 11px;
          }
        }
      }
    }
    &__footer {
    }
  }
`;
