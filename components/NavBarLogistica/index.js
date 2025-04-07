import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Add, NotificationImportant, People } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import AvatarMenu from "../AvatarMenu";
import NotificationsDirectorLogis from "../NotificationsDirectorLogistics";
import SearchBarLogistica from "../SearchBarLogistica";
import { useDispatch } from "react-redux";
import {
  notificationsCenterSelector,
  resetUnReadNotifications,
  setNotificationPosition,
  toogleNotificacionCenter,
} from "../../redux/slices/notificationcenterSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";

function NavBarLogistica({ role }) {
  const [openNotifications, setOpenNotifications] = useState(false);
  const handleNotifications = () => setOpenNotifications(true);
  const closeNotifications = () => setOpenNotifications(false);
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const {
    isOpenNotificationCenter,
    notifications = [],
    notificationsNews,
    isPausedNews,
    countunrednotifications,
    isFetchingMore,
    countnotifications,
    limitNotifications,
    pageNotifications,
  } = useSelector(notificationsCenterSelector);

  const badgeRef = useRef(null);

  const handleToggleNotifications = () => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();

      dispatch(
        setNotificationPosition({
          top: rect.bottom + 10,
          left: rect.left + rect.width / 2 < window.innerWidth / 2 ? rect.left : "auto",
          right: rect.left + rect.width / 2 >= window.innerWidth / 2 ? window.innerWidth - rect.right : "auto",
        })
      );
    }

    dispatch(toogleNotificacionCenter());

    if (isOpenNotificationCenter === false) {
      dispatch(resetUnReadNotifications(id_user));
    }
  };

  return (
    <NavBarStyled>
      <div className="content">
        <SearchBarLogistica />
      </div>

      <div className="items">
        <div className="items__item">
          <div ref={badgeRef} onClick={() => handleToggleNotifications()} className="notification">
            <Badge badgeContent={countunrednotifications} color="primary" overlap="rectangular">
              <NotificationImportant />
            </Badge>
          </div>
        </div>

        <div className="items__item">
          <AvatarMenu role={role} />
        </div>
      </div>

      <NotificationsDirectorLogis isOpen={openNotifications} onCloseDrawer={closeNotifications} />
    </NavBarStyled>
  );
}

const NavBarStyled = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  background-color: #efefef;
  .content {
    width: 100%;
    .box_search {
      width: 500px;
      display: flex;
      height: 30px;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      padding: 1px;
      margin: 0px 0px 0px 10px;
      .select {
        margin-right: 4px;
        outline: none;
        border: 1px solid #fff;
      }
      .searchContainer {
        width: 100%;
        &__input {
          width: 100%;
          height: 100%;
          outline: none;
          border: none;
          font-size: 12px;
          padding: 5px;
        }
        &__suggestions {
          padding: 0px 5px 0px 5px;
          margin-top: 10px;
          background-color: #fff;
          position: relative;

          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
          border-radius: 10px;

          .head_suggestions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 3px;
            .title_suggest {
              font-size: 12px;
              font-weight: 500;
              color: grey;
              margin-bottom: 5px;
              svg {
                font-size: 15px;
                margin-bottom: -4px;
              }
            }
            .bt_close {
              border-radius: 5px;
              color: red;
              font-size: 15px;
              cursor: pointer;
            }
          }
          .empty_title {
            font-size: 12px;
            font-weight: 500;
            color: grey;
            margin-bottom: 5px;
            padding: 5px;
          }
          .suggest {
            padding: 5px;
            transition: 0.2s;
            &:hover {
              cursor: pointer;
              background-color: #d9d9d9;
            }
          }
          .product {
            display: flex;
            flex-direction: column;
            font-size: 13px;
            font-weight: 500;
            .code {
              color: #034d6f;
              font-weight: 500;
            }
          }
          .order {
            display: flex;
            flex-direction: column;
            font-size: 13px;
            font-weight: 500;
            .status {
              color: grey;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .items {
    width: 30%;
    display: flex;
    align-items: center;
    background: #034d6f;
    border-radius: 40px 0px 0px 0px;
    padding: 5px;
    &__item {
      margin: 0 10px;

      .add {
        color: #fff;
        border-radius: 3px;
        padding: 1px;
        cursor: pointer;
        :hover {
          background: #90cef1;
          border-radius: 5px;
        }
      }
      .people {
        color: #fff;
        border-radius: 3px;
        padding: 1px;
        cursor: pointer;
        :hover {
          background: #90cef1;
          border-radius: 5px;
        }
      }
      .notification {
        color: #fff;
        border-radius: 3px;
        padding: 1px;
        cursor: pointer;
        :hover {
          background: #90cef1;
          border-radius: 5px;
        }
      }
    }
  }
`;

export default NavBarLogistica;
