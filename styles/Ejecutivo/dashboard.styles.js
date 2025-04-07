import styled from "styled-components";
import { customWidth } from "../global.styles";

export const DashboardStyled = styled.div`
  .main {
    width: 100%;
    ${customWidth};
  }

  .dashboard_content {
    background-color: #f3f3f8;
    height: 100%;
    overflow: scroll;
    padding: 10px;
    &__welcome {
      margin-bottom: 10px;
    }
    &__cards {
      display: flex;
      justify-content: space-between;
      &__card {
        border-radius: 4px;
        width: calc((100% / 4) - 10px);
        height: 100px;
        padding: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: #ffff;
        &__top {
          display: flex;
          justify-content: space-between;
          &__txtleft {
            font-size: 12px;
            color: #878a99;
          }

          &__right {
            font-size: 16px;
            color: red;
            svg {
              font-size: 12px;
            }

            &--active {
              color: green;
              svg {
                font-size: 12px;
              }
            }
          }
        }

        &__middle {
          margin: 10px 0px;
          &__total {
            p {
              font-size: 25px;
              color: #485056;
            }
          }
        }

        &__bottom {
          display: flex;
          justify-content: space-between;
          flex-direction: row-reverse;
          &__txtleft {
            font-size: 12px;
            color: #46568d;
            cursor: pointer;
            text-decoration: underline;
          }

          &__right {
            &__iconitem {
              background-color: red;
            }
            svg {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
`;
