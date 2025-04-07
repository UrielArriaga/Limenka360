import React, { useState } from "react";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
import { Add, Dashboard, NotificationImportant, People, PersonOutline } from "@material-ui/icons";
import { Avatar, Badge } from "@material-ui/core";
import Notifications from "./Notifications";
import RecentActivities from "./RecentActivities";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearState } from "../../redux/slices/userSlice";

function NavBar() {
  const dispatch = useDispatch();
  return (
    <NavBarStyled>
      <div className="inputContainer">
        <input placeholder="Buscar Cliente" type="text" className="inputContainer__input" />
      </div>

      <p
        onClick={() => {
          dispatch(clearState());
        }}
      >
        close
      </p>

      <div className="items">
        <div className="items__item">
          <div className="add">
            <Add />
          </div>
        </div>

        <div className="items__item">
          <People />
        </div>

        <div className="items__item">
          <Badge badgeContent={4} color="primary">
            <NotificationImportant />
          </Badge>
        </div>

        <div className="items__item">
          <Avatar sizes="small">RD</Avatar>
        </div>
      </div>

      {/* <Notifications /> */}
    </NavBarStyled>
  );
}

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

export default function FloorManagerLayout({ children }) {
  const [openRecentActivities, setOpenRecentActivities] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Layout isOpenActivies={openRecentActivities} isOpenSideBar={openSideBar}>
      <SiderBarDirLog />
      <div className="max-contentlayoutdirector">
        <NavBar />

        {/* <div>
          {[...Array(115).keys()].map((item, index) => {
            return <div>xxx</div>;
          })}
        </div> */}
        {children}
      </div>
      <div className="max-contentlayoutdirectoractivities">
        <RecentActivities
          open={openRecentActivities}
          handleOpen={() => setOpenRecentActivities(!openRecentActivities)}
        />
      </div>

      {/* <Notifications /> */}
    </Layout>
  );
}

{
  /* <Layout sideBar={openMenuSide} activites={openRecentActivities}>
<SideBar />
<NavBarDashboard />
<div className="max-contentlayoutdirector">{children}</div>
<div className="max-contentlayoutdirectoractivities">
  <RecentActivityDirector />
</div>
</Layout> */
}

const getSizeMain = props => {
  switch (true) {
    case props.isOpenSideBar === true && props.isOpenActivies == true:
      return `
       width:calc(100% - 570px);
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == true:
      return `
      width:calc(100% - 370px);
        `;
    case props.isOpenSideBar === true && props.isOpenActivies == false:
      return `
      width:calc(100% - 360px);
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == false:
      return `
        width:calc(100% - 160px);
        `;
  }
};

const getSizeRecent = props => {
  switch (true) {
    case props.isOpenSideBar === true && props.isOpenActivies == true:
      return `
       width:300px;
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == true:
      return `
      width:300px;
        `;
    case props.isOpenSideBar === true && props.isOpenActivies == false:
      return `
      width:88px;
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == false:
      return `
      width:88px;
      `;
  }
};

const Layout = styled.div`
  display: flex;
  height: 100vh;
  transition: all 2s ease;

  .max-contentlayoutdirector {
    /* width: 100%; */
    width: calc(100% - 250px - 40px);
    height: calc(100vh);
    /* margin: 60px 0; */
    overflow-y: auto;

    transition: all 0.1s ease-in;
    /* width: 30%; */

    .main {
      width: 100%;
    }
    /* @media ${device.md} {
      ${getSizeMain}
    } */
  }

  .max-contentlayoutdirectoractivities {
    max-height: 100vh;
    display: none;
    background-color: red;
    @media ${device.md} {
      display: block;
      ${getSizeRecent}
    }
  }
`;

// import { Dashboard, PersonOutline } from "@material-ui/icons";
// import React from "react";
// import styled from "styled-components";
// import { colors } from "../../styles/global.styles";
// import { useRouter } from "next/router";
function SiderBarDirLog() {
  const ItemMenu = ({ title = "Titulo Item", count = 0, icon = <PersonOutline />, route = "/" }) => {
    const router = useRouter();
    return (
      <div
        className={`item ${router.pathname === route && "item__higlight"} `}
        onClick={() => {
          console.log(router.pathname, route);
          router.push(route);
        }}
      >
        <div className="item__icon">
          <div className="bg">{icon}</div>
        </div>

        <div className="item__text">
          <a>{title}</a>
        </div>

        <div className="item__count">
          {count && (
            <div className="">
              <p>{count}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <SiderBarDirLogStyled isOpen={true}>
      <div className="logo">
        <img src="/logowhite.png" alt="LOGO LIMENKA" />
        <p>Logistica</p>
      </div>

      <div className="items">
        {/* <ItemMenu title="Inicio" icon={<Dashboard />} route="/directorlogistica" /> */}
        <ItemMenu title="Pedidos" route="/jefedepiso/pedidos" />
        <ItemMenu title="Inventario" route="/jefedepiso/inventario" />
        <ItemMenu title="Entradas" route="/jefedepiso/entradas" />
        <ItemMenu title="Salidas" route="/jefedepiso/salidas" />

        {/* 
        <ItemMenu title="Entradas" route="/directorlogistica/entradas" />
        <ItemMenu title="Salidas" route="/directorlogistica/salidas" />
        <ItemMenu title="Reportes" />
        <ItemMenu title="Ordenes de compra" /> */}
      </div>
    </SiderBarDirLogStyled>
  );
}

const SiderBarDirLogStyled = styled.div`
  width: 200px;
  background-color: #034d6f;

  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    margin-bottom: ${({ isOpen }) => (isOpen ? "30px" : "30px")};
    padding: ${({ isOpen }) => (isOpen ? "20px 0" : "40px 0")};

    img {
      width: 60%;
      height: auto;
    }

    p {
      color: white;
      font-size: 18px;
      margin-top: 2px;
    }
  }

  .item {
    :hover {
      cursor: pointer;
      background-color: ${colors.primaryColorDark};
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0;
    flex-direction: ${({ isOpen }) => (isOpen ? "flex" : "column")};

    align-items: center;

    &__icon {
      text-align: center;
      width: ${({ isOpen }) => (isOpen ? "20%" : "100%")};

      .bg {
        padding: 8px;
        /* margin-right: 20px; */
        color: #e0e0e0;
      }
    }

    &__text {
      font-size: 13px;
      width: 72%;
      /* font-weight: 600; */
      /* color: #44cbe4; */
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};

      color: #f5f5f5;
    }

    &__count {
      width: 20%;
      margin-right: 10px;
      display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
      justify-content: right;
      visibility: hidden;
      div {
        background-color: rgba(64, 123, 254, 255);
        padding: 0px 7px 0px 7px;
        border-radius: 4px;
        p {
          text-align: center;
          color: rgb(255, 255, 255, 1);
          font-weight: bold;
        }
      }

      &--disable {
        width: 10%;
        margin-right: 10px;
        visibility: hidden;
        div {
          background-color: rgba(220, 225, 246, 0.2);
          padding: 2px;
          border-radius: 10px;
          p {
            text-align: center;
            color: rgb(220, 225, 246, 0.8);
          }
        }
      }
    }
  }

  .item__higlight {
    cursor: pointer;
    background-color: ${colors.primaryColorDark};
  }
`;
