import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice";
import useAlertToast from "../hooks/useAlertToast";
import dayjs from "dayjs";
import { IconButton } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";

export default function Notificaciones() {
  const { id_user } = useSelector(userSelector);
  const router = useRouter();
  const [notificationes, setNotificationes] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const { showAlertError } = useAlertToast();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        let resp = await api.get("notifications", {
          params: {
            where: {
              toId: id_user,
            },
            count: 1,
            order: "-createdAt",
            include: "from",
            limit: limit,
            skip: page,
          },
        });

        setNotificationes(resp.data.results);
        setCount(resp.data.count);
      } catch (error) {
        console.log(error);
        showAlertError("Error al obtener las notificaciones");
      }
    };

    if (id_user) {
      getNotifications();
    }
  }, [id_user, page]);

  return (
    <NotificationsStyled>
      <div className="header-page">
        <div className="buttonback">
          <IconButton onClick={() => router.back()} aria-label="back">
            <ArrowBackIos />
          </IconButton>
        </div>
        <h3>Notificaciones</h3>
      </div>
      <div className="notification-list">
        {notificationes.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          notificationes.map((item, index) => {
            return (
              <div key={index} className={`notification-item ${item.viewed ? "viewed" : "unviewed"}`}>
                <div className="notification-item__header">
                  <p className="notification-item__title">{item.title}</p>
                  <p className="notification-item__date">{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</p>
                </div>
                <p className="notification-item__message">{item.message}</p>
                <p className="notification-item__sender">De: {item.metadata.fullname}</p>
              </div>
            );
          })
        )}

        {count > limit && (
          <Pagination
            onChange={(e, value) => {
              setPage(value);
              // setFlag(!flag);
            }}
            count={Math.ceil(count / limit)}
            value={page}
            size="small"
            color="primary"
          />
        )}
      </div>
    </NotificationsStyled>
  );
}

const NotificationsStyled = styled.div`
  max-width: 60%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .header-page {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    margin-bottom: 20px;
  }
  h2 {
    text-align: center;
    margin-bottom: 15px;
    color: #333;
  }

  .notification-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .notification-item {
    padding: 15px;
    border-radius: 5px;
    border-left: 5px solid #007bff;
    background: #f8f9fa;
    transition: background 0.3s;
  }

  .notification-item.unviewed {
    background: #e3f2fd;
  }

  .notification-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .notification-item__title {
    color: #007bff;
  }

  .notification-item__date {
    font-size: 0.85em;
    color: #6c757d;
  }

  .notification-item__message {
    margin-top: 5px;
    color: #333;
  }

  .notification-item__sender {
    font-size: 0.9em;
    color: #555;
    margin-top: 5px;
    font-style: italic;
  }
`;
