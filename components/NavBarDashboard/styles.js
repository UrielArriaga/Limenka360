import { SwipeableDrawer } from "@material-ui/core";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";

export const NavBarStyled = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  position: fixed;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 60px;
  background: ${colors.secondaryColor};
  right: 0;
  top: 0;
  width: ${({ sideBar }) => (sideBar ? "calc(100% - 250px)" : "100%")};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px -1px, rgba(0, 0, 0, 0.09) 0px 2px 4px -1px;
  .ctr_nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__column1 {
      display: flex;
      padding: 10px 20px;
      &__logo_company {
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 60px;
          object-fit: contain;
        }
        p {
          margin-left: 5px;
          font-size: 12px;
        }
        /* display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 100px;
        height: 20px;
        margin-right: 10px;
        img {
          width: 200%;
          height: 200%;
          object-fit: contain;
        } */
      }
      &__options {
        display: flex;
        align-items: center;
        &__option {
          .button {
            text-transform: capitalize;
            transition: all 0.3s ease;
            &:hover {
              background: #536bcf;
              color: #fff;
            }
          }
          .item {
            background: #f3f3f3;
          }
        }
      }
    }
    &__column2 {
      display: flex;
      align-items: center;
      background: #0c203b;
      height: 100%;
      padding: 10px 20px;
      color: #fff;
      border-top-left-radius: 48px;
      border-bottom-left-radius: 5px;
      background: ${colors.primaryColor};
      &__ctr_box_radius {
        width: 20px;
      }
      &__ctr_icons {
        display: flex;
        align-items: center;
        padding-right: 15px;
        border-right: 1px solid #fff;
        &__icon {
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 5px;
          margin-right: 10px;
          transition: all 0.3s ease;
          &:hover {
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
      &__account {
        min-width: 200px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 15px;
        cursor: pointer;
        &__avatar {
          margin-right: 10px;
        }
        .active {
          display: flex;
          align-items: center;
          .online {
            font-size: 12px;
            color: green;
            margin-right: 5px;
          }
          .offline {
            font-size: 12px;
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
      &__login {
        /* min-width: 200px; */
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 15px;
        cursor: pointer;
      }
      @media (max-width: 600px) {
        display: none;
      }
    }
    &__column2_mobile {
      display: none;
      @media (max-width: 600px) {
        display: initial;
        align-items: center;
        padding: 10px 20px;
        &__menu_action {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: #0c203b;
          border-radius: 10px;
          .icon {
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
`;
export const NavBarDirectorStyled = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  position: fixed;
  z-index: 1000;
  display: flex;
  height: 60px;
  /* background: ${colors.secondaryColor}; */
  right: 0;
  top: 0;
  background-color: #fff;
  transition: all 0.1s ease-in;

  width: 100%;
  @media ${device.md} {
    width: ${({ sideBar }) => (!sideBar ? "calc(100% - 70px)" : "calc(100% - 270px)")};
  }

  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px -1px, rgba(0, 0, 0, 0.09) 0px 2px 4px -1px;
  .wrapper_nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .grid-left {
      padding: 10px 20px;
      /* display: none; */

      @media ${device.md} {
        display: flex;
      }
    }
    .grid-rigth {
      display: flex;
      align-items: center;
      background: #0c203b;
      height: 100%;
      padding: 10px 20px;
      color: #fff;
      border-top-left-radius: 48px;
      border-bottom-left-radius: 5px;
      background: ${colors.bgDirector};

      &__icons {
        display: flex;

        .icon {
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 5px;
          margin-right: 10px;
          transition: all 0.3s ease;
          &:hover {
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    .account {
      /* min-width: 100px; */
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 15px;
      cursor: pointer;

      .fullname {
        display: none;
      }

      @media ${device.md} {
        min-width: 200px;

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

    &__column1 {
      display: flex;
      padding: 10px 20px;
      &__logo_company {
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 60px;
          object-fit: contain;
        }
        p {
          margin-left: 5px;
          font-size: 12px;
        }

        /* display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 100px;
        height: 20px;
        margin-right: 10px;
        img {
          width: 200%;
          height: 200%;
          object-fit: contain;
        } */
      }
      &__options {
        display: flex;
        align-items: center;
        &__option {
          .button {
            text-transform: capitalize;
            transition: all 0.3s ease;
            &:hover {
              background: #536bcf;
              color: #fff;
            }
          }
          .item {
            background: #f3f3f3;
          }
        }
      }
    }
    &__column2 {
      &__ctr_box_radius {
        width: 20px;
      }
      &__ctr_icons {
        display: flex;
        align-items: center;
        padding-right: 15px;
        border-right: 1px solid #fff;
        &__icon {
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 5px;
          margin-right: 10px;
          transition: all 0.3s ease;
          &:hover {
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
      &__account {
         {
        }
        min-width: 200px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 15px;
        cursor: pointer;
        &__avatar {
          margin-right: 10px;
        }
        .active {
          display: flex;
          align-items: center;
          .online {
            font-size: 12px;
            color: green;
            margin-right: 5px;
          }
          .offline {
            font-size: 12px;
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
      &__login {
        /* min-width: 200px; */
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 15px;
        cursor: pointer;
      }
      @media (max-width: 600px) {
        display: none;
      }
    }
    &__column2_mobile {
      display: none;
      @media (max-width: 600px) {
        display: initial;
        align-items: center;
        padding: 10px 20px;

        &__menu_action {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: #0c203b;
          border-radius: 10px;
          .icon {
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
`;

export const CustomDreawer = styled(SwipeableDrawer)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiPaper-elevation16 {
    width: 80%;
  }
  .ctr {
    width: 100%;
    padding: 20px;
    &__account {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__ctr_photo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
        .photo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.03em;
        margin-bottom: 5px;
      }
      .active {
        display: flex;
        align-items: center;
        font-weight: 500;
        .online {
          font-size: 12px;
          color: green;
          margin-right: 5px;
        }
        .offline {
          font-size: 12px;
          color: red;
          margin-right: 5px;
        }
      }
      &__icons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        margin-bottom: 5px;
        .icon {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
          margin-right: 15px;
          transition: all 0.3s ease;
          background: #0c203b;
          color: #fff;
        }
        .icon_calendar {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
          transition: all 0.3s ease;
          background: #0c203b;
          color: #fff;
        }
      }
    }
    .divider {
      margin: 5px 0;
      border-bottom: 1.5px solid #0c203b;
    }
    &__menu {
      margin: 10px 0;
      /* background: #f3f3f3; */
      &__item {
        display: flex;
        align-items: center;
        margin: 10px 0;
        padding: 10px 5px;
        border-radius: 5px;
        .icon {
          margin-right: 5px;
          font-size: 20px;
        }
        .iconOn {
          color: green;
        }
        .iconOff {
          color: red;
        }
      }
      .ctr_status {
        padding: 0 20px;
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
`;
