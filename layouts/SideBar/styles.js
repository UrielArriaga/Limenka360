import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const SiderBarStyled = styled.div`
  background-color: red;
  width: 100%;
  height: 100%;
  background-color: ${colors.primaryColor};

  .ctr_side {
    padding-top: 30px;
    &__logo {
      padding: 10px 10px 0 10px;
      color: #ffff;
      text-align: center;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      svg {
        color: #fafafa;
        font-size: 40px;
        margin-right: 10px;
      }

      p {
        font-size: 30px;
      }
    }
    &__items {
      display: flex;
      flex-direction: column;
      /* padding: 0 30px; */
      &__item {
        cursor: pointer;
        padding: 0 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2px;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        &__icon {
          &__bg {
            padding: 8px;
            /* background: rgba(255, 255, 255, 0.2); */
            margin-right: 20px;
            color: #fff;
          }
        }
        &__text {
          width: 100%;
          color: rgba(255, 255, 255, 0.8);
          display: ${(props) => (!props.isOpen ? "block" : "none")};
        }
      }
    }
  }
`;
