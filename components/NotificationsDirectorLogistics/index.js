import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { Button, CircularProgress, Divider, Drawer, LinearProgress, Tooltip } from "@material-ui/core";
import { Avatar, IconButton } from "@mui/material";
import { Close, Settings, Brightness1, Visibility, VisibilityOff, Cached } from "@material-ui/icons";
import dayjs from "dayjs";
import { validateURL } from "../../utils";
import { api } from "../../services/api";

export default function NotificationsDirectorLogis({ isOpen, onCloseDrawer }) {
  const [isView, setIsView] = useState(false);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [notification, setNotification] = useState({
    isFeching: false,
    data: [],
    count: 0,
  });

  useEffect(() => {
    // getNotifications();
  }, [limit]);

  const getNotifications = async () => {
    try {
      setNotification(prevState => ({ ...prevState, isFetching: false }));
      let params = {
        include: "from",
        count: 1,
        limit: limit,
      };

      let response = await api.get(`/notifications`, { params });
      let res = response.data.results;
      let totalNot = response.data.count;
      setTotal(totalNot);
      setNotification(prevState => ({ ...prevState, data: res, isFeching: false }));
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isFeching } = notification;

  const validate = str => {
    if (str) {
      return str;
    } else {
      return "N/A";
    }
  };

  const handleIncrement = () => setLimit(limi => limi + 10);

  const CustommItem = ({ image, title, message, date, view }) => (
    <ItemNotification>
      <Avatar sizes="large" sx={{ width: 55, height: 55 }} src={validateURL(image)} />
      <div className="row">
        <p className="title">{validate(title)}</p>
        <p className="messageNoti">{validate(message)}</p>
        <p className="dateNoti">{validate(dayjs(date).format("MMMM DD, H:mm A"))}</p>
      </div>
      <Brightness1 style={{ color: `${view ? "grey" : colors.primaryColor}`, fontSize: 14 }} />
    </ItemNotification>
  );

  return (
    <MenuAccount anchor={"right"} open={isOpen} onClose={onCloseDrawer}>
      <div className="header">
        <p className="header__title">Notificaciones({total})</p>
        <div className="header__item">
          <IconButton size="small" onClick={() => setIsView(!isView)}>
            {isView ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <IconButton size="small">
            <Settings />
          </IconButton>
          <IconButton size="small" onClick={onCloseDrawer}>
            <Close />
          </IconButton>
        </div>
      </div>
      <Divider style={{ margin: 5 }} />
      {isFeching && (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      )}

      <div className="body_menu__body">
        {!isView &&
          !isFeching &&
          data?.map((item, index) => (
            <CustommItem
              key={index}
              title={item.title}
              message={item.message}
              date={item.createdAt}
              view={item.viewed}
              image={item.from.photo}
            />
          ))}
        <div className="contentIncrement">
          {total > limit && (
            <Tooltip title="Ver mas">
              <Button className="buttonIncrement" onClick={() => handleIncrement()}>
                {isFeching ? <CircularProgress size={20} /> : <p>Ver mas</p>}
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    </MenuAccount>
  );
}
const ItemNotification = styled.div`
  padding: 10px;
  display: flex;
  align-items: self-start;
  justify-content: space-around;
  gap: 10px;
  border-radius: 5px;
  :hover {
    background: ${colors.bg_overlay};
    cursor: pointer;
    color: #fff;
    .dateNoti {
      color: #fff;
    }
  }
  .row {
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .title {
    font-size: 15px;
    font-weight: 600;
  }
  .statusColor {
    width: 9px;
    height: 9px;
    background: green;
    border-radius: 50px;
    padding: 2px;
  }
  .messageNoti {
    font-size: 14px;
  }
  .dateNoti {
    font-size: 12px;
    color: #808080;
  }
`;
const MenuAccount = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: fit-content;
    height: fit-content;
    margin-top: 60px;
    margin-right: 20px;
    background-color: #fff;
    width: 30%;
    height: 90%;
    padding: 10px;
    border-radius: 12px;
  }
  .MuiBackdrop-root {
    background-color: transparent;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    &__item {
      display: flex;
      gap: 10px;
    }
    &__title {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .body_menu {
    padding: 10px;

    &__body {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
  }

  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide_img {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .contentIncrement {
    display: flex;
    justify-content: center;
    margin: 10px;
    .buttonIncrement {
      text-transform: capitalize;
      :hover {
        background: ${colors.iconColor};
        color: #fff;
      }
    }
  }
`;
