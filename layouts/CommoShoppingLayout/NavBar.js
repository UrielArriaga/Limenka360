import { Avatar, Badge } from "@material-ui/core";
import Pendientes from "../../components/EjecutivePendings";
import { colors } from "../../styles/global.styles";

import { clearState, userSelector } from "../../redux/slices/userSlice";
import { Add, ExitToApp, NotificationImportant, People, Receipt, AssignmentLateOutlined } from "@material-ui/icons";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  notificationsCenterSelector,
  resetUnReadNotifications,
  setNotificationPosition,
  toogleNotificacionCenter,
} from "../../redux/slices/notificationcenterSlice";

export default function NavBar({ role }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchOptionsNav = () => {
    let searchOptions = optionsNavbar.filter(item => item.role === roleId);
    let newOptions = searchOptions[0]?.navOptions;
    return newOptions?.map(item => <>{item.content}</>);
  };
  const showSlopes = ["director_compras", "gerente_compras"].includes(role);
  const handleRedirect = () => {
    if (role === "compras") {
      router.push({ pathname: "/comprasv2/actividades" });
    }
    if (role === "gerente_compras") {
      router.push({ pathname: "/gerentecompras/actividades" });
    } else if (role === "gestor_de_compras_int") {
      router.push({ pathname: "/gestorcomprasint/actividades" });
    } else {
      router.push({ pathname: "/directorcompras/actividades" });
    }
  };
  const { id_user } = useSelector(userSelector);
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

    if (isOpenNotificationCenter == false) {
      dispatch(resetUnReadNotifications(id_user));
    }
  };

  return (
    <NavBarStyled>
      <div className="inputContainer">
        <input placeholder="Buscar Cliente" type="text" className="inputContainer__input" />
      </div>

      <div className="items">
        <div className="items__item">
          <div className="add">
            <Add />
          </div>
        </div>

        <div className="items__item">
          <People />
        </div>

        {showSlopes ? (
          <div className="items__item">
            <Slopes role={role} />
          </div>
        ) : (
          <div className="items__item">
            <OptionButton>
              <AssignmentLateOutlined />
            </OptionButton>
          </div>
        )}

        <div className="items__item" ref={badgeRef}>
          <Badge
            overlap="rectangular"
            badgeContent={countunrednotifications}
            color="primary"
            onClick={handleToggleNotifications}
          >
            <NotificationImportant />
          </Badge>
        </div>
        <div className="items__item">
          <Badge overlap="rectangular" color="primary" onClick={handleRedirect}>
            <Receipt />
          </Badge>
        </div>

        <div className="items__item">
          <Avatar sizes="small">RD</Avatar>
        </div>

        <div
          className="items__item"
          onClick={() => {
            dispatch(clearState());
          }}
        >
          <ExitToApp />
        </div>
      </div>
    </NavBarStyled>
  );
}
function ExecutiveActivities() {
  const router = useRouter();
  return (
    <OptionButton onClick={() => router.push({ pathname: "/actividadescompras" })}>
      <Receipt fontSize="small" />
      <p className="title">Actividades</p>
    </OptionButton>
  );
}

function Slopes({ role }) {
  const [open, setOpen] = useState(false);
  const [totalSlope, setTotalSlope] = useState(0);
  return (
    <>
      <OptionButton onClick={() => setOpen(true)}>
        <Badge overlap="rectangular" badgeContent={totalSlope} color="error">
          <AssignmentLateOutlined />
          <p className="title">Pendientes</p>
        </Badge>
        <p className="count">{totalSlope}</p>
      </OptionButton>
      <Pendientes
        role={role}
        drawerShowPending={open}
        setDrawerShowPending={setOpen}
        totalPendings={totalSlope}
        setTotalPendings={setTotalSlope}
      />
    </>
  );
}

const optionsNavbar = [
  {
    id: 1,
    role: "ejecutivo",
    navOptions: [
      {
        identifier: "activitiescompras",
        label: "Actividades",
        content: <ExecutiveActivities />,
      },
    ],
  },
];

const NavBarStyled = styled.div`
  height: 50px;
  background-color: #f4f9ff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .inputContainer {
    &__input {
      /* border-radius: 20px; */
      width: 300px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      padding: 0 20px;
      font-size: 14px;
      color: #333;
      background-color: #fff;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ea se;
      outline: none;
      &:focus {
        border-color: #1890ff;
      }
    }
  }

  .items {
    display: flex;
    align-items: center;

    &__item {
      margin: 0 10px;
      cursor: pointer;

      .add {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
`;

const OptionButton = styled.div`
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
    color: #111;
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
