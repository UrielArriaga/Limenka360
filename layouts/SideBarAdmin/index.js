import {
    AcUnit,
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
  import { SiderBarStyled } from "./styles";
  
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
        // onMouseEnter={() => setOpenThis(!open)}
        // onMouseLeave={() => setOpenThis(false)}
      >
        <div className="ctr_side">
          <div className="ctr_side__logo">
            <AcUnit />
            <p>HYPERION</p>
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
  