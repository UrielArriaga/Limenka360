import styled from "styled-components";

export const NavBarStyled = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .navctr {
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    &__company {
      img {
        height: 40px;
      }
    }
    &__profile {
      display: flex;
      position: relative;
      &:hover & {
        background-color: red;
        &__submenu {
          display: block;
          background-color: blue;
        }
      }
      &__submenu {
        position: absolute;
        top: 50px;
        height: 200px;
        width: 100%;
        background-color: red;
        display: none;
      }
      &__items {
        margin-right: 20px;
        display: flex;
        align-items: center;

        &__item {
          svg {
            color: #bdbdbd;
          }
        }
      }
      &__infouser {
        display: flex;
        align-items: center;
      }
    }
  }

  .routes {
    border-top: 1px solid #cfd8dc;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    padding-top: 5px;
    justify-content: space-between;
    &__principal {
      font-size: 16px;
      display: flex;
      align-items: center;
      svg {
        font-size: 15px;
      }
    }

    &__history {
      display: flex;
      color: #485056;
      font-size: 12px;
      align-items: center;
      svg {
        font-size: 13px;
      }
    }

    p {
      font-weight: bold;
    }
  }
`;
