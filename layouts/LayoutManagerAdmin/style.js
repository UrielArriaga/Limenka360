import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
let scroll = `::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.primaryColorDark};
    }`;
export const AdminStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 600px) {
    .sidebar {
      display: none;
    }
  }
  .sidebar {
    width: ${({ isOpen }) => (isOpen ? "277px" : "48px")};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.2s;
    background-color: #21263c;
    ${scroll}
    .logo {
      height: 90px;
      display: flex;
      flex-direction: ${({ isOpen }) => (isOpen ? "row" : "column")};
      align-items: center;

      img {
        width: ${({ isOpen }) => (isOpen ? "190px" : "78px")};
        padding: 20px;
      }
      .bt_menu {
        width: 30px;
        height: 30px;
        color: #fff;
        border-radius: 7px;
      }
    }
    .title_logo {
      width: 247px;
      text-align: center;
      color: #fff;
      font-weight: 500;
      /* margin-top: -25px; */
      margin-bottom: 40px;
    }
    .options {
      padding: ${({ isOpen }) => (isOpen ? "0px" : "5px")};
      .option {
        width: 100%;
        height: ${({ isOpen }) => (isOpen ? "45px" : "40px")};
        display: flex;
        overflow: hidden;
        align-items: center;
        /* background-color: #fff; */
        margin-bottom: 11px;
        transition: 0.2s;
        border-radius: ${({ isOpen }) => (isOpen ? "0px" : "8px")};
        padding: 2px;
        color: #fff;
        &:hover {
          cursor: pointer;
        }
        .title {
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          margin-left: 20px;
        }
        svg {
          margin-left: ${({ isOpen }) => (isOpen ? "10px" : "5px")};
        }
      }
      .order {
        color: #3f51b5;
      }
      .order_complete {
        color: #00c853;
      }
      .sale {
        color: #ff5733;
      }
      .demo {
        color: #900c3f;
      }

      .active {
        background-color: rgb(58, 173, 230);
        color: #fff;
      }
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: #fff;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
  .content_right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .navbar {
      height: 60px;
      width: 100%;
      background-color: #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10px;
      .title_group {
        font-size: 20px;
        font-weight: bold;
        text-transform: capitalize;
      }
      .account {
        height: 100%;
        display: flex;
        align-items: center;
        background-color: ${colors.primaryColor};
        height: 100%;
        padding-left: 25px;
        border-top-left-radius: 48px;
        border-bottom-left-radius: 5px;
        background: #3aade6;
        margin-right: -10px;
        color: #fff;
        text-transform: capitalize;
        cursor: pointer;
        .fullname {
          margin-left: 10px;
          display: none;
        }
        @media ${device.md} {
          min-width: 150px;
          .fullname {
            display: block;
          }
        }
        &:hover {
          .dropdown {
            opacity: 1;
            margin-top: 0px;
            right: 50px;
            padding-top: 70px;
          }
        }
        .dropdown {
          position: fixed;
          top: 0px;
          padding-top: 0px;
          right: -100%;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1000;
          .dropdownmenu {
            padding: 10px 0;
            transition: all 0.3s ease;
            background: #fff;
            border-radius: 4px;
            color: #000;
            box-sizing: content-box;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

            &__item {
              display: flex;
              align-items: center;
              padding: 10px 10px;

              transition: all 0.3s ease;

              &__icon {
                font-size: 20px;
                margin-right: 5px;
              }

              &:hover {
                background: #63567f;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .children {
      width: 100%;
      height: 100%;
    }
  }
`;
export const NavBarStyled = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  background-color: #efefef;
  .content {
    width: 100%;
  }

  .items {
    width: 19%;
    display: flex;
    align-items: center;
    background: #21263c;
    border-radius: 40px 0px 0px 0px;
    padding: 5px;
    &__item {
      margin: 8px 10px;

      svg {
        color: white;
        height: 23px;
        width: 27px;
        cursor: pointer;
      }
    }
  }
`;
