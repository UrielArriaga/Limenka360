import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { Drawer } from "@material-ui/core";
export const LayoutStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 600px) {
    .left {
      display: none;
    }
  }
  .left {
    width: ${({ isOpen }) => (isOpen ? "300px" : "48px")};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.2s;
    background-color: #407aff;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.primaryColorDark};
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: ${({ isOpen }) => (isOpen ? "flex" : "column")};
      .logos {
        height: ${({ isOpen }) => (isOpen ? "auto" : "60px")};
        display: flex;
        align-items: center;
        .logo_open {
          display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
          img {
            width: 190px;
            height: 116px;
          }
        }
        .logo_close {
          display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
          img {
            width: 35px;
            height: 35px;
          }
        }
      }
      .button_menu {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: ${({ isOpen }) => (isOpen ? "0px" : "30px")};
      }
    }
    &__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .option_menu {
        display: flex;
        overflow: hidden;
        align-items: center;
        width: ${({ isOpen }) => (isOpen ? "100%" : "35px")};
        border-radius: ${({ isOpen }) => (isOpen ? "2px" : "8px")};
        height: ${({ isOpen }) => (isOpen ? "45px" : "35px")};
        justify-content: ${({ isOpen }) => (isOpen ? "space-between" : "center")};
        background-color: #fff;
        margin-bottom: 11px;
        transition: 0.2s;
        svg {
        }
        .option_title {
          display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          padding: 0px 0px 0px 25px;
          margin-bottom: -3px;
        }
        .option_count {
          display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
          font-size: 15px;
          padding: 2px 7px;
          border-radius: 6px;
          color: #fff;
        }
        .expand_icon {
          display: ${({ isOpen }) => (isOpen ? "block" : "none")};
        }
      }
      .dashboard {
        color: #3462c0;
        &__count {
          background-color: #3462c0;
        }
      }
      .prospects {
        color: #44cbe4;
        &__count {
          background-color: #44cbe4;
        }
      }
      .oportunities {
        color: #88c82d;
        &__count {
          background-color: #88c82d;
        }
      }
      .sales {
        color: #1e8449;
        &__count {
          background-color: #1e8449;
        }
      }
      .clients {
        color: #6b34bc;
        &__count {
          background-color: #6b34bc;
        }
      }
      .payments {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .executives {
        color: red;
        &__count {
          background-color: red;
        }
      }
      .orders {
        color: #f77132;
        &__count {
          background-color: #f77132;
        }
      }
      .tools {
        color: #8c9bb1;
        &__count {
          background-color: #8c9bb1;
        }
      }
      .providers {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .products {
        color: #88c82d;
        &__count {
          background-color: #88c82d;
        }
      }
      .categories {
        color: #6b34bc;
        &__count {
          background-color: #6b34bc;
        }
      }
      .active {
        background-color: #3aade6;
        color: #fff;
        svg {
          color: #fff;
        }
      }
      .more_options {
        width: 100%;
        display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
        color: #fff;
      }
      .sub_options {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: ${({ isOpen }) => (isOpen ? "auto" : "center")};

        .sub_optionMenu {
          width: ${({ isOpen }) => (isOpen ? "100%" : "35px")};
          padding-left: ${({ isOpen }) => (isOpen ? "30px" : "auto")};
          background-color: rgb(255 255 255 / 0.3);
          backdrop-filter: blur(10px);
          color: #fff;
          svg {
            font-size: 20px;
          }
        }
        .suboption_name {
          font-size: 13px;
          margin-left: -12px;
        }
      }
      .divider {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        border: 1px solid #bdbdbd;
      }
    }
    &__footer {
    }
  }
  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .navbar {
      width: 100%;
      height: 60px;
      background-color: #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_nav {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        .button_movile {
          @media (min-width: 601px) {
            display: none;
          }
        }
        .title_group {
          display: flex;
          align-items: center;
          font-weight: bold;
          text-transform: capitalize;
          padding: 15px;
          font-size: 20px;
          height: 100%;
        }
        .search_box_component {
          width: 30%;
          @media (max-width: 837px) {
            display: none;
          }
        }
        .search_box {
          @media (min-width: 838px) {
            display: none;
          }
          .button_search {
            display: flex;
            align-items: center;
            border-radius: 8px;
            padding: 3px;
            background-color: #407aff;
            cursor: pointer;
            img {
              filter: brightness(10000%);
              height: 24px;
              width: 24px;
            }
          }
        }
      }
      .right_nav {
        @media (max-width: 837px) {
          display: none;
        }
        width: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        height: 100%;
        padding-left: 25px;
        border-top-left-radius: 48px;
        border-bottom-left-radius: 5px;
        background: ${colors.primaryColor};
        .account {
          margin-right: 20px;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          justify-content: center;
          padding: 10px;
          cursor: pointer;
          .avatar {
            margin-right: 10px;
          }
          .title_name {
            display: flex;
            flex-direction: column;
            text-transform: capitalize;
            color: #fff;
            margin-right: 10px;
            .online {
              display: flex;
              align-items: center;
              color: #fff;
              font-size: 14px;
              white-space: nowrap;
            }
            .offline {
              display: flex;
              align-items: center;
              font-size: 14px;
            }
            .icon_online {
              font-size: 14px;
              color: green;
              margin-right: 5px;
            }
            .icon_offline {
              font-size: 14px;
              color: red;
              margin-right: 5px;
            }
          }

          .ctr_menu {
            position: fixed;
            top: 0px;
            padding-top: 0px;
            right: -100%;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            .menu {
              padding: 10px 0;
              transition: all 0.3s ease;
              background: #fff;
              border-radius: 4px;
              color: #000;
              box-sizing: content-box;
              box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
              .item {
                display: flex;
                align-items: center;
                padding: 10px 10px;
                transition: all 0.3s ease;

                .icon {
                  font-size: 20px;
                  margin-right: 5px;
                }
                .iconOn {
                  color: green;
                }
                .iconOff {
                  color: red;
                }
                .arrow_icondown {
                  color: #ccc;
                  transform: rotate(180deg);
                }
                .arrow_iconup {
                  color: #ccc;
                  transform: rotateX("angle");
                }
                &:hover {
                  background: #63567f;
                  color: #fff;
                }
              }
              .ctr_status {
                padding: 5px 20px;
                .item {
                  display: flex;
                  align-items: center;
                  padding: 5px 10px;
                  margin-bottom: 5px;
                  border-radius: 5px;

                  .icon_online {
                    color: green;
                    margin-right: 5px;
                    font-size: 16px;
                  }
                  .icon_offline {
                    color: red;
                    margin-right: 5px;
                    font-size: 16px;
                  }
                }
                .active {
                  background: #dce1f6;
                }
              }
            }
          }
          &:hover {
            .ctr_menu {
              opacity: 1;
              margin-top: 0px;
              right: 10px;
              padding-top: 70px;
            }
          }
        }
        .divider_vertical {
          width: 1px;
          height: 30px;
          border: 1px solid #fff;
        }
        .options_nav {
          width: fit-content;
          display: flex;
          flex-direction: row;
        }
      }
      .right_optionMenu {
        display: flex;
        align-items: center;
        @media (min-width: 838px) {
          display: none;
        }
      }
    }
    .content_child {
    }
  }
`;
export const MenuMobile = styled(Drawer)`
  @media (min-width: 601px) {
    display: none;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiPaper-elevation16 {
    width: 70%;
    height: 100%;
    background-color: #407aff;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.primaryColorDark};
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &__header {
      justify-content: center;
      display: flex;
      align-items: center;
      .logo {
        img {
          width: 190px;
          height: 116px;
        }
      }
      .button_close {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        color: #fff;
      }
    }
    &__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .option_menu {
        display: flex;
        overflow: hidden;
        align-items: center;
        width: 100%;
        border-radius: 2px;
        height: 40px;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 11px;
        transition: 0.2s;
        svg {
        }
        .option_title {
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          padding: 0px 0px 0px 25px;
          margin-bottom: -3px;
        }
        .option_count {
          font-size: 15px;
          padding: 2px 7px;
          border-radius: 6px;
          color: #fff;
        }
        .expand_icon {
        }
      }
      .dashboard {
        color: #3462c0;
        &__count {
          background-color: #3462c0;
        }
      }
      .prospects {
        color: #44cbe4;
        &__count {
          background-color: #44cbe4;
        }
      }
      .oportunities {
        color: #88c82d;
        &__count {
          background-color: #88c82d;
        }
      }
      .sales {
        color: #1e8449;
        &__count {
          background-color: #1e8449;
        }
      }
      .clients {
        color: #6b34bc;
        &__count {
          background-color: #6b34bc;
        }
      }
      .payments {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .executives {
        color: red;
        &__count {
          background-color: red;
        }
      }
      .orders {
        color: #f77132;
        &__count {
          background-color: #f77132;
        }
      }
      .tools {
        color: #8c9bb1;
        &__count {
          background-color: #8c9bb1;
        }
      }
      .providers {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .products {
        color: #88c82d;
        &__count {
          background-color: #88c82d;
        }
      }
      .categories {
        color: #6b34bc;
        &__count {
          background-color: #6b34bc;
        }
      }
      .active {
        background-color: #3aade6;
        color: #fff;
        svg {
          color: #fff;
        }
      }
      .more_options {
        width: 100%;
        color: #fff;
      }
      .sub_options {
        width: 100%;
        display: flex;
        flex-direction: column;
        .sub_optionMenu {
          padding-left: auto;
          background-color: rgb(255 255 255 / 0.3);
          backdrop-filter: blur(10px);
          color: #fff;
          svg {
            font-size: 20px;
          }
        }
        .suboption_name {
          font-size: 13px;
          margin-left: -12px;
        }
      }
      .divider {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        border: 1px solid #bdbdbd;
      }
    }
    &__footer {
    }
  }
`;

export const MenuNavbar = styled(Drawer)`
  @media (min-width: 838px) {
    display: none;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: fit-content;
    height: fit-content;
    margin-top: 60px;
    margin-right: 20px;
    background-color: #fff;
  }
  .MuiBackdrop-root {
    background-color: transparent;
  }
  .menu_nav {
    &__header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__body {
      display: flex;
      flex-direction: column;
    }
    &__footer {
    }
  }
`;

export const MenuAccount = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: fit-content;
    height: fit-content;
    margin-top: 60px;
    margin-right: 20px;
    background-color: #fff;
  }
  .MuiBackdrop-root {
    background-color: transparent;
  }
  .body_menu {
    &__body {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const SearchBox = styled(Drawer)`
  height: 100%;

  .MuiBackdrop-root {
    backdrop-filter: blur(0px);
    height: 100%;
  }
  .search_content {
    margin-top: 10px;
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    position: fixed;
    .input {
      width: 100%;
      height: fit-content;
      border: 1px solid;
      border-radius: 8px;
      color: grey;
    }
    .bt_close {
      height: 35px;
      width: 35px;
      border-radius: 8px;
      background-color: #fff;
      svg {
        color: red;
      }
    }
  }
`;
export const OptionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  padding: 5px;
  transition: 0.3s;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 255, 255, 0.4);
  }
  svg {
    border-radius: 5px;
    color: #fff;
  }
  .title {
    display: none;
  }

  .count {
    display: none;
  }
  @media (max-width: 837px) {
    width: 100%;
    padding: 20px 10px;
    background-color: #fff;
    justify-content: left;
    &:hover {
      cursor: pointer;
      background-color: ${colors.primaryColorDark};
      color: #fff;
      .title {
        color: #fff;
      }
      svg {
        color: #fff;
      }
    }
    svg {
      color: ${colors.primaryColorDark};
    }
    .title {
      margin-left: 10px;
      display: flex;
      align-items: center;
      color: grey;
      font-weight: 500;
      font-size: 14px;
    }
    .MuiBadge-badge {
      display: none;
    }
    .count {
      display: flex;
      margin-left: 20px;
      border-radius: 8px;
      color: #fff;
      padding: 4px;
      background-color: ${colors.primaryColorDark};
      font-size: 13px;
    }
    .exit {
      color: red;
    }
  }
`;
export const OptionMenu = styled.div`
  @media (max-width: 837px) {
    display: none;
  }
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 7px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${colors.primaryColorDark};
    color: #fff;
    .title {
      color: #fff;
    }
    svg {
      color: #fff;
    }
  }
  .title {
    margin-left: 10px;
    display: flex;
    align-items: center;
    color: grey;
    font-weight: 500;
    font-size: 14px;
  }
  .exit {
    color: red;
  }
  svg {
    color: ${colors.primaryColorDark};
  }
`;
