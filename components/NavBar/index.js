import { AddAlert } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import React from "react";
import { NavBarStyled } from "./styles";

export default function NavBar() {
  return (
    <NavBarStyled>
      <div className="navctr">
        <div className="navctr__company">
          <img
            src="https://s3-us-west-2.amazonaws.com/usrlogos/logos/logo59567.png"
            alt=""
          />
        </div>
        <div className="navctr__profile">
          <div className="navctr__profile__submenu">
            <p>Holaaa</p>
          </div>
          <div className="navctr__profile__items">
            <div className="navctr__profile__items__item">
              <AddAlert />
            </div>
            <div className="navctr__profile__items__item"></div>
            <div className="navctr__profile__items__item"></div>
          </div>
          <div className="navctr__profile__infouser">
            <Avatar />
            <p>URIEL ARRIAGA</p>
          </div>
        </div>
      </div>
    </NavBarStyled>
  );
}
