import { IconButton } from "@material-ui/core";
import { AspectRatio, CallMade, Close, ExpandMore } from "@material-ui/icons";
import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/global.styles";

let items = [
  {
    title: "Notificacion 1",
    message: "Contenido de la notificacion 1",
    date: "2021-09-15",
    time: "10:00",
    user: {
      photo: "https://www.w3schools.com/howto/img_avatar.png",
    },
  },
];

export default function Notifications() {
  return (
    <NotificationsStyled>
      <div className="headerntf">
        <h3>Notificaciones</h3>
        <div className="headerntf__actions">
          <IconButton className="headerntf__actions--btn">
            <CallMade />
          </IconButton>

          <IconButton className="headerntf__actions--btn">
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="content">
        {items.map((item, index) => {
          return (
            <div className="content__item">
              <div className="content__item--avatar">
                <img src={item.user.photo} alt="" />
              </div>

              <div className="content__item--info">
                <h4>{item.title}</h4>
                <p>{item.message}</p>

                <div className="content__item--date">
                  <p>{item.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </NotificationsStyled>
  );
}

const NotificationsStyled = styled.div`
  position: absolute;
  width: 350px;
  top: 60px;
  right: 20px;
  background-color: #ffff;
  border: 1px solid #ccc;
  height: 70vh;
  border-radius: 6px;

  .headerntf {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;

    &__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /* width: 100px; */

      &--btn {
        padding: 0;
        margin: 0;
        /* background-color: red; */
        margin-right: 10px;
      }
    }
  }

  .content {
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.primaryColor};
    }

    &__item {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;

      &--avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      &--info {
        h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        p {
          font-size: 0.8rem;
          color: #666;
        }

        &--date {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
          p {
            font-size: 0.7rem;
            color: #999;
          }
        }
      }

      &:hover {
        /* background-color: #f9f9fb; */
      }
    }
  }
`;

const containerAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(50px); }
  100% { transform: translateX(0); }
`;

const itemAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: ${containerAnimation} 5s infinite;
`;
