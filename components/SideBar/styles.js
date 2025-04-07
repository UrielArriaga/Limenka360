import { colors, device } from "../../styles/global.styles";
import styled from "styled-components";

export const SiderBarStyled = styled.div`
  width: 250px;
  background-color: ${colors.primaryColorDark};
  box-shadow: rgba(0, 0, 0, 0.15) 4px 0px 6px 0px, rgba(0, 0, 0, 0.09) 2px 0px 4px 0px;
  .ctr_side {
    &__logo {
      padding: 20px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__name {
        picture {
          img {
            width: 200px;
            height: 126px;
          }
        }
        display: flex;
        align-items: center;
        p {
          color: ${colors.iconsSideColor};
        }
        svg {
          color: ${colors.iconsSideColor};
          margin-right: 10px;
        }
      }
      &__hamburger {
        svg {
          color: ${colors.iconsSideColor};
        }
      }
    }
    .subMenu {
      width: fit-content;
      border-radius: 5px;
    }
    .subOption {
      display: flex;
      align-items: center;
      width: fit-content;
      border-left: 2px solid #ccd1d1;
      border-radius: 0px 5px 5px 0px;
      padding: 5px 90px 5px 10px;
      margin-left: 22px;
      color: white;
      &:hover {
        cursor: pointer;
        background-color: rgb(255, 255, 255, 0.2);
      }
      .subIcon {
        font-size: 20px;
        margin-right: 6px;
      }
      .subTitle {
        white-space: nowrap;
      }
      .tools {
        color: #8c9bb1;
      }
    }
    &__items {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      background: rgba(255, 255, 255, 1);
      &__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 6px solid ${colors.primaryColorDark};
        border-bottom: 6px solid ${colors.primaryColorDark};
        &:hover {
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
        &__icon {
          &__bg {
            padding: 8px;
            margin-right: 20px;
            color: #fff;
          }
        }
        &__text {
          width: 72%;
          font-weight: 600;
          color: #44cbe4;
        }
        .dashboard {
          color: #3462c0;
        }
        .prospects {
          color: #44cbe4;
        }
        .oportunities {
          color: #88c82d;
        }
        .sales {
          color: #1e8449;
        }
        .clients {
          color: #6b34bc;
        }
        .payments {
          color: #febc11;
        }
        .executives {
          color: red;
        }
        .orders {
          color: #f77132;
        }
        .tools {
          color: #8c9bb1;
        }
        .providers {
          color: #febc11;
        }
        .products {
          color: #88c82d;
        }
        .categories {
          color: #6b34bc;
        }
        .bg-prospects {
          div {
            background-color: #44cbe4;
          }
        }
        .bg-oportunities {
          div {
            background-color: #88c82d;
          }
        }
        .bg-sales {
          div {
            background-color: #1e8449;
          }
        }
        .bg-clients {
          div {
            background-color: #6b34bc;
          }
        }
        .bg-payments {
          div {
            background-color: #febc11;
          }
        }
        .bg-providers {
          div {
            background-color: #febc11;
          }
        }
        .bg-categories {
          div {
            background-color: #6b34bc;
          }
        }
        .bg-executives {
          div {
            background-color: red;
          }
        }
        .bg-orders {
          div {
            background-color: #f77132;
          }
        }
        .bg-products {
          div {
            background-color: #88c82d;
          }
        }
        &__count {
          /* width: 10%; */
          display: flex;
          justify-content: right;
          margin-right: 10px;
          div {
            /* padding: 2px;
            border-radius: 10px; */
            background-color: rgba(64, 123, 254, 255);
            padding: 0px 7px 0px 7px;
            border-radius: 6px;
            p {
              text-align: center;
              color: rgb(255, 255, 255, 1);
            }
          }
          &--disable {
            width: 10%;
            margin-right: 10px;
            visibility: hidden;
            div {
              background-color: rgba(220, 225, 246, 0.2);
              padding: 2px;
              border-radius: 10px;
              p {
                text-align: center;
                color: rgb(220, 225, 246, 0.8);
              }
            }
          }
        }
        &--active {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.primaryColor};
          border-top: 6px solid ${colors.primaryColorDark};
          border-bottom: 6px solid ${colors.primaryColorDark};
          .dashboard {
            color: white;
          }
          .prospects {
            color: white;
          }
          .oportunities {
            color: white;
          }
          .sales {
            color: white;
          }
          .clients {
            color: white;
          }
          .payments {
            color: white;
          }
          .orders {
            color: white;
          }
          .products {
            color: white;
          }
          .providers {
            color: white;
          }
          .categories {
            color: white;
          }
        }
      }
    }
    .divider {
      margin: 20px 0px;
      .line {
        width: 90%;
        margin: auto;
        height: 1px;
        background-color: #bdbdbd;
      }
    }
  }
`;

const getSizeSideBar = props => {
  switch (true) {
    case props.sideBar === true && props.activites == true:
      return `
       width:270px;
        `;
    case props.sideBar === false && props.activites == true:
      return `
      width:70px;
        `;
    case props.sideBar === true && props.activites == false:
      return `
              width:270px;
                `;

    case props.sideBar === false && props.activites == false:
      return `
                          width:70px;
                            `;
    // case props.sideBar === false && props.activites == false:
    //   return `
    //       width:calc(100% - 370px);

    //         `;
  }
};
export const SiderBarDirectorStyled = styled.div`
  width: ${({ isOpen }) => (isOpen ? "80%" : "0")};
  height: 100vh;

  z-index: 10000;
  /* padding-bottom: 30px; */
  transition: width 0.1s ease-in;
  background-color: ${colors.bgDirector};
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 4px 0px 6px 0px, rgba(0, 0, 0, 0.09) 2px 0px 4px 0px;

  position: absolute;
  top: 0;
  left: 0;

  @media ${device.md} {
    position: relative;
    ${getSizeSideBar}
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
  }

  .actions {
    color: #fff;
    position: absolute;
    right: 10px;
  }
  .logo {
    display: flex;
    justify-content: center;
    padding: 5px 0;
    margin-bottom: ${({ isOpen }) => (isOpen ? "30px" : "30px")};
    padding: ${({ isOpen }) => (isOpen ? "20px 0" : "40px 0")};

    img {
      width: 70%;
      height: auto;
    }
  }

  .items {
  }

  .subitem {
    margin-left: ${({ isOpen }) => (isOpen ? "1em" : "0")};
    :hover {
      cursor: pointer;
      background-color: ${colors.primaryColorDark};
    }
  }

  .item {
    :hover {
      cursor: pointer;
      background-color: ${colors.primaryColorDark};
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0;
    /* border-top: 6px solid ${colors.primaryColorDark};
    border-bottom: 6px solid ${colors.primaryColorDark}; */
    flex-direction: ${({ isOpen }) => (isOpen ? "flex" : "column")};

    align-items: center;

    /* border: 1px solid red; */

    &__icon {
      text-align: center;
      width: ${({ isOpen }) => (isOpen ? "20%" : "100%")};

      .bg {
        padding: 8px;
        /* margin-right: 20px; */
        color: #e0e0e0;
      }
    }

    &__text {
      width: 72%;
      font-weight: 600;
      /* color: #44cbe4; */
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};

      color: #f5f5f5;
    }

    &__count {
      width: 20%;
      margin-right: 10px;
      display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
      justify-content: right;
      div {
        background-color: rgba(64, 123, 254, 255);
        padding: 0px 7px 0px 7px;
        border-radius: 4px;
        p {
          text-align: center;
          color: rgb(255, 255, 255, 1);
          font-weight: bold;
        }
      }

      &--disable {
        width: 10%;
        margin-right: 10px;
        visibility: hidden;
        div {
          background-color: rgba(220, 225, 246, 0.2);
          padding: 2px;
          border-radius: 10px;
          p {
            text-align: center;
            color: rgb(220, 225, 246, 0.8);
          }
        }
      }
    }
  }

  .options {
    border-top: 1px solid #9fa8da;

    width: 100%;
    position: fixed;
    bottom: 0;
    max-width: 375px;
    .item {
      width: inherit;
      max-width: inherit;
      background-color: ${colors.bgDirector};
      /* width: 100%; */
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 0;
      flex-direction: ${({ isOpen }) => (isOpen ? "flex" : "column")};
      align-items: center;

      &__icon {
        text-align: center;
        width: ${({ isOpen }) => (isOpen ? "20%" : "100%")};

        .bg {
          /* padding: 8px; */

          color: #e0e0e0;
        }
      }

      &__text {
        width: 72%;
        font-weight: 600;
        /* color: #44cbe4; */
        display: ${({ isOpen }) => (isOpen ? "block" : "none")};

        color: #f5f5f5;
      }
      /* ${getSizeSideBar} */
    }
  }
`;
