import { Avatar, Badge } from "@material-ui/core";
import {
  AssignmentLateOutlined,
  EventOutlined,
  LocalOfferOutlined,
  NotificationsOutlined,
  People,
} from "@material-ui/icons";
import React from "react";
import ProgressGoalNavBar from "../../molecules/ProgressGoalNavBar";
import SearchEjecutives from "../../molecules/SearchEjecutives";
import { ManagarNavbarLayout } from "./styles";
export default function NavBarManager({ sideBar }) {
  return (
    <ManagarNavbarLayout sideBar={sideBar}>
      <div className="search row-center">
        <p className="txt-group">Medial Buy</p>
        <SearchEjecutives />
      </div>

      <div className="container">
        <div className="items row-center">
          <div className="item">
            <People fontSize="small" />
          </div>

          <div className="item">
            <NotificationsOutlined fontSize="small" />
          </div>

          <div className="item">
            <Badge overlap="rectangular" badgeContent={1} color="error">
              <AssignmentLateOutlined fontSize="small" />
            </Badge>
          </div>

          <div className="item">
            <Badge overlap="rectangular" badgeContent={1} color="error">
              <LocalOfferOutlined />
            </Badge>
          </div>

          <div className="item">
            <EventOutlined fontSize="small" />
          </div>
        </div>

        <div className="divider"></div>

        <div className="profile">
          <Avatar className="ctr_nav__column2__account__avatar" />
        </div>
      </div>
    </ManagarNavbarLayout>
  );
}

// TODO add
{
  /* <div className="progress">
          <ProgressGoalNavBar />
        </div> */
}
