import { motion } from "framer-motion";
import React from "react";
import { Avatar } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../../redux/slices/userSlice";
import { AvatarContainer, Content, Indicator, NotificationItem } from "./notification.styled";
export default function NotificationNewComment({ notif }) {
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);

  return (
    <NotificationItem key={notif.id} onClick={() => dispatch(markReadNotification({ id: notif.id }))}>
      <AvatarContainer>
        <Avatar
          className="avatar"
          sizes="10"
          style={{
            marginRight: 10,
            backgroundColor: getColorFromLetter(notif.metadata?.fullname[0]),
          }}
          alt={notif.name}
        >
          {notif.metadata?.fullname[0]}
        </Avatar>
      </AvatarContainer>
      <Content>
        <p className="fullname">
          <strong>{notif.metadata?.fullname} </strong> realizo Nuevo comentario de pedido
          <strong> {notif.metadata?.folio}</strong>
        </p>
        <div className="message-container">
          <p className="message">{notif?.message}</p>
        </div>
        <small>
          {notif.time} {dayjs(notif?.metadata?.createdAt).fromNow()}
        </small>
      </Content>
      <Indicator>{notif?.viewed ? null : <FiberManualRecord className="indicator" />}</Indicator>
    </NotificationItem>
  );
}

function getColorFromLetter(letter) {
  letter = letter.toUpperCase();

  const colors = [
    "#FF5733",
    "#a10303",
    "#3357FF",
    "#F1C40F",
    "#9B59B6",
    "#1ABC9C",
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#F39C12",
    "#D35400",
    "#C0392B",
    "#7F8C8D",
    "#8E44AD",
    "#2980B9",
    "#27AE60",
    "#16A085",
    "#F39C12",
    "#D35400",
    "#BDC3C7",
    "#2C3E50",
    "#ECF0F1",
    "#95A5A6",
    "#34495E",
    "#9B59B6",
    "#E67E22",
    "#1F618D",
    "#D5DBDB",
    "#8E44AD",
    "#1ABC9C",
    "#C0392B",
    "#2ECC71",
  ];

  const index = letter.charCodeAt(0) - 65;

  if (index < 0 || index > 25) {
    return "#000000";
  }

  return colors[index % colors.length];
}

const ContainerPage = styled.div``;

const NotificationCenterStyled = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1e293b;
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 12px 12px 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000000;
`;

const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 60px;
  right: 20px;
  width: 420px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1000000;
`;

const Header = styled.div`
  padding: 20px 10px;
  font-weight: bold;

  display: flex;
  align-items: center;

  border-bottom: 1px solid #ddd;

  .row .rowactions {
    display: flex;
    align-items: center;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

// const NotificationItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px 10px;
//   border-bottom: 1px solid #ddd;

//   cursor: pointer;
//   &:hover {
//     background: #f5f5f5;
//   }

//   .avatar {
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     margin-right: 10px;
//   }
// `;

// const AvatarContainer = styled.div`
//   flex: 1;
//   font-size: 12px;

//   .fullname {
//     text-transform: capitalize;
//   }
// `;

// const Content = styled.div`
//   width: 90%;
//   font-size: 12px;

//   .fullname {
//     text-transform: capitalize;
//     /* margin-bottom: 5px; */
//   }

//   .message-container {
//     padding: 8px 10px;
//     background: #f5f5f5;
//     margin-top: 8px;
//     margin-bottom: 5px;
//     border-radius: 4px;
//   }
// `;

// const Indicator = styled.div`
//   flex: 1;
//   font-size: 12px;

//   .indicator {
//     font-size: 13px;
//     color: #1877f2;
//   }
// `;

const Button = styled.button`
  position: fixed;
  top: 10px;
  right: 20px;
  background: #1877f2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;
