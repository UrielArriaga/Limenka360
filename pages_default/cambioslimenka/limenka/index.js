import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import { Grid, Button, Tooltip } from "@material-ui/core";
import router from "next/router";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

export default function ChangesLimenka() {
  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

  return (
    <ChangeStyled>
      <SideBar />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <Grid container className="container">
          <Grid item xs={12} md={12} className="title">
            <ArrowBack
              className="arrow"
              onClick={
                () => router.push({ pathname: `/cambioslimenka` })
                // console.log(item)
              }
            />
            <h1> {router.query.title}</h1>
          </Grid>

          <Grid container className="subContainter ">
            <Grid xs={12} lg={12} item className="item">
              <img className="img" src={router.query.img} />

              <p>{router.query.message}</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ChangeStyled>
  );
}

const ChangeStyled = styled.div`
  background-color: rgba(385, 255, 255, 20.9);
  height: 100vh;
  width: 100%;
  display: flex;
  .main {
    display: flex;
    width: calc(100%);
    height: calc(100vh - 60px);
    padding: 0px 20px;
    margin-top: 60px;
    overflow-y: scroll;
    background: url(https://img.freepik.com/foto-gratis/textura-pared-estuco-azul-marino-relieve-decorativo-abstracto-grunge-fondo-color-rugoso-gran-angular_1258-28311.jpg?t=st=1660239016~exp=1660239616~hmac=cfca96be2fc16afcbcbebcde45a58e0f4f6b8d3dad43c0600c676f1d640b7b92);
    .container {
      width: 100%;
      max-width: 1500px;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      overflow-y: scroll;
      /* min-height: calc(100% - 50px); */
      padding: 20px 20px;
      background: rgba(385, 255, 255, 0.9);
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      ::-webkit-scrollbar {
        width: 10px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      ::-webkit-scrollbar-thumb {
        background-color: #898989;
        border-radius: 5px;
        &:hover {
          background-color: #1976d2;
        }
      }

      .title {
        background-color: #fff;
        border-radius: 15px;
        display: flex;
        flex-direction: row;

        .arrow {
          width: 3%;
          height: 45px;
          color: #1976d2;
          font-size: 15px;
          margin-top: 10px;
          margin-left: 5px;

          &:hover {
            transform: translate(-10px);
          }
        }

        h1 {
          margin: 0 auto;
          margin-top: 1%;
          font-size: 40px;
        }
      }
      .subContainter {
        padding: 2%;
        border-radius: 10px;
        display: flex;

        .item {
          margin-left: 4.7%;
          margin-right: 3%;
          border-radius: 15px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding: 10px;
          margin-block-end: 2%;

          .btn {
            display: flex;
            border: 1px solid beige;
            border-radius: 10px;
            width: 35%;
            height: 35px;
            background-color: #1976d2;
            color: white;
            font-size: 15px;
            margin-left: 65%;
          }
          .arrow {
            display: flex;
            border: 1px solid beige;
            border-radius: 40px;
            width: 15%;
            height: 45px;
            color: #1976d2;
            font-size: 15px;
            margin-left: 80%;

            &:hover {
              transform: translate(10px);
            }
          }
          h2 {
            padding-top: 30px;
            padding-left: 20px;
          }

          p {
            text-align: center;
            padding: 20px;
            opacity: 0.8;
            line-height: 30px;
            font-size: 22px;
          }

          .img {
            border-radius: 15px;
            height: 65vh;
            width: 100%;
          }
        }
      }
    }
  }
`;
