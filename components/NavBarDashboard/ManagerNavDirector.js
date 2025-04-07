import React, { useState } from "react";
import { NavBarStyled, CustomDreawer, NavBarDirectorStyled } from "./styles";
import { Avatar, Badge, Hidden } from "@material-ui/core";
import { URL_SPACE } from "../../services/api";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Searcher from "../UI/organism/Searcher";
import {
  AccountCircleOutlined,
  ArrowForward,
  ArrowLeft,
  ArrowLeftSharp,
  AssignmentLateOutlined,
  Business,
  DashboardOutlined,
  ExitToAppOutlined,
  LocalOfferOutlined,
  NotificationsOutlined,
  TodayOutlined,
} from "@material-ui/icons";
import { dialogSelector, handleToggleMenu } from "../../redux/slices/dialogSlice";
import DrawerAutorization from "../DrawerAutorization";
import useModal from "../../hooks/useModal";
import Link from "next/link";

export default function NavBarDashboardDirector() {
  const {
    userData,
    userPhoto,
    group,
    name,
    isFetching,
    isSuccess,
    isLogged_User,
    isError,
    errorMessage,
    email,
    roleId,
    isOnline,
  } = useSelector(userSelector);
  const { openMenuSide } = useSelector(dialogSelector);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  const [totalPendings, setTotalPendings] = useState(0);

  const { open: isOpenDiscount, toggleModal: toogleDiscounts } = useModal();
  const dispatch = useDispatch();

  const handleClickOpenNav = () => {
    localStorage.setItem("openMenuSide", JSON.stringify(!openMenuSide));
    dispatch(handleToggleMenu(!openMenuSide));
  };
  return (
    <NavBarDirectorStyled sideBar={openMenuSide} isOpen={openMenuSide}>
      <div className="wrapper_nav">
        <div className="grid-left">
          <ArrowForward onClick={() => handleClickOpenNav()} />
          <Hidden smDown>
            <Searcher />
          </Hidden>
        </div>
        <div className="grid-rigth">
          <div className="grid-rigth__icons">
            <div className="icon">
              <NotificationsOutlined fontSize="small" />
            </div>

            <div className="icon">
              <Badge badgeContent={totalPendings} color="error" overlap="rectangular">
                <AssignmentLateOutlined fontSize="small" />
              </Badge>
            </div>
            <div className="icons" onClick={() => toogleDiscounts()}>
              <Badge badgeContent={totalDiscounts} color="error" overlap="rectangular">
                <LocalOfferOutlined />
              </Badge>
            </div>
          </div>
          <div className="account">
            <Avatar
              src={userPhoto ? URL_SPACE + userPhoto : ""}
              className="ctr_nav__column2__account__avatar"
            />
            <div className="fullname">
              {isFetching && <p>......</p>}
              <p style={{ marginLeft: 14 }}>{name}</p>
            </div>

            <div className="dropdown">
              <div className="dropdownmenu">
                <div className="dropdownmenu__item">
                  <DashboardOutlined className="dropdownmenu__icon" />
                  <p>Dashboard</p>
                </div>

                <Link href={"/director/micuenta"}>
                  <div className="dropdownmenu__item">
                    <AccountCircleOutlined className="dropdownmenu__icon" />
                    <p>Mi cuenta</p>
                  </div>
                </Link>

                <Link href={"/director/empresa"}>
                  <div className="dropdownmenu__item">
                    <Business className="dropdownmenu__icon" />
                    <p>Empresa</p>
                  </div>
                </Link>

                <div className="dropdownmenu__item">
                  <TodayOutlined className="dropdownmenu__icon" />
                  <p>Calendario</p>
                </div>

                <div className="dropdownmenu__item" onClick={() => dispatch(clearState())}>
                  <ExitToAppOutlined className="dropdownmenu__icon" />
                  <p>Cerrar sesión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DrawerAutorization
        drawerShowDiscount={isOpenDiscount}
        setDrawerShowDiscount={toogleDiscounts}
        totalDiscounts={totalDiscounts}
        setTotalDiscounts={setTotalDiscounts}
      />
    </NavBarDirectorStyled>
  );
}
