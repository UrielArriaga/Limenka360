import {
  Business,
  BusinessOutlined,
  Cloud,
  Dashboard,
  DashboardOutlined,
  Person,
  PersonOutline,
  Star,
  StarBorder,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function SideBarAdmin({ open, setOpen }) {
  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();

  const validateActiveLink = (route) => {
    if (router.pathname === route) {
      return true;
    }
  };

  return (
    <SiderBarStyled
      isOpen={openThis}
      onMouseEnter={() => setOpenThis(!open)}
      onMouseLeave={() => setOpenThis(false)}
    >
      <div className="ctr_side">
        <div className="ctr_side__logo">
            <picture>
              <img  src="/LOGOLIMENKA360_COLOR-02.PNG" alt="logo"></img>
            </picture>
        </div>
        <div className="ctr_side__items">
          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg">
                <DashboardOutlined />
              </div>
            </div>
            <div className="ctr_side__items__item__text">
              <p>Dashboard</p>
            </div>
          </div>

          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg">
                <PersonOutline />
              </div>
            </div>
            <div className="ctr_side__items__item__text">
              <Link href={{ pathname: "/prospectos" }}>
                <p>Propectos</p>
              </Link>
            </div>
          </div>

          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg">
                <StarBorder />
              </div>
            </div>
            <div className="ctr_side__items__item__text">
              <p>Oportunidades</p>
            </div>
          </div>
          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg">
                <BusinessOutlined />
              </div>
            </div>
            <div className="ctr_side__items__item__text">
              <p>Clientes</p>
            </div>
          </div>
        </div>
      </div>
    </SiderBarStyled>
  );
}

const SiderBarStyled = styled.div`
  background-color: red;
  width: 70px;
  height: 100%;
  z-index: 10000000 !important;
  position: relative;

  .ctr_side {
    position: absolute;
    width: ${(props) => (props.isOpen ? "300px" : "70px")};
    transition: width 0.4s ease-in-out;
    height: 100%;
    background-color: #0c203b;
    /* padding: 20px; */
    &__logo {
      padding: 10px 10px 0 10px;
      color: #ffff;
      text-align: center;
      margin-bottom: 30px;
      picture{
          img{
            width: 200px;
            height: 126px;
          }
      }

      svg {
        color: #90a4ae;
      }
    }

    &__items {
      display: flex;
      flex-direction: column;
      &__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;

        &__icon {
          &__bg {
            padding: 8px;
            /* background: rgba(255, 255, 255, 0.2); */
            margin-right: 20px;
            color: #fff;
          }
        }

        &__text {
          color: rgba(255, 255, 255, 0.8);
          display: ${(props) => (props.isOpen ? "block" : "none")};
        }
        /* margin-bottom: 10px;
        &__button {
          border-radius: 0px;
          margin: 0;
          padding: 8px;
          svg {
            font-size: 24px;
          }
          display: flex;
          align-items: center;
          color: #fff;

          &--active {
            background: rgba(255, 255, 255, 0.2);
            margin: 0;
            padding: 8px;
            border-radius: 0px;
            color: #fff;
          }
        } */
      }
    }
  }
`;
