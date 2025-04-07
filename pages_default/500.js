import Link from "next/link";
import React from "react";
import styled from "styled-components";
import NavBarMain from "../components/UI/organism/NavBarMain";
export default function custom500() {
  return (
    <HomeStyled>
      <div className="hero">
        <NavBarMain black />

        <div className="main">
          <div className="main__content">
            <div className="cont-p">
              <div className="prueba1">
                <h1>Error</h1>
              </div>

              <h2 className="text">
                Ha ocurrido un error, intenta en unos momentos, si el error persiste, contacta a un administrador.
              </h2>
            </div>

            <div className="btn-container">
              <Link href="/login">
                <div className="btn">Login</div>
              </Link>
            </div>
          </div>

          <div className="main__images">
            <img src="/homeimage01.svg" alt="" />
          </div>
        </div>
      </div>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  background-color: #060608;
  .cont-p {
    color: #7c0822;
  }
  .prueba1 {
    display: flex;
    margin-top: 10em;

    @media (max-width: 690px) {
      margin-top: 6em;
    }
    .logoforb {
      height: 10em;
      @media (max-width: 450px) {
        height: 7em;
      }
    }
  }
  ul {
    list-style-type: disc;
    list-style-position: inside;
  }
  h1 {
    font-size: 10em;
    @media (max-width: 690px) {
      margin-top: 0em;
    }
    @media (max-width: 450px) {
      font-size: 7em;
    }
    @media (max-width: 690px) {
      background-size: 100%;
      background-position: right bottom;
    }
  }
  .hero {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: right bottom;
    height: 100vh;
    @media (max-width: 1050px) {
      background-size: 120%;
      background-position: right bottom;
    }
    @media (max-width: 860px) {
      background-size: 150%;
      background-position: right bottom;
    }
    @media (max-width: 690px) {
      background-size: 100%;
      background-position: right bottom;
    }
    @media (max-width: 520px) {
      background-size: 150%;
      background-position: right bottom;
    }
    @media (max-width: 400px) {
      background-size: 180%;
      background-position: right bottom;
    }
    transition: all 0.2s ease-in-out;
  }

  .main {
    max-width: 1300px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 60px);
    padding: 24px;

    h1,
    h2 {
      /* line-height: 1em; */
    }
    .btn-alt {
      /* margin-top: 2em; */
      text-align: center;
      padding: 15px 25px;
      border-radius: 100px;
      color: #3f7bff;
      width: 8em;
      display: table-cell;
      vertical-align: middle;
      display: flex;
      &:hover {
        border: 1px solid #3f7bff;
        transition: color 0.5s all;
        cursor: pointer;
      }
    }
    .btn-container {
      margin-top: 5em;
      display: flex;
      .btn {
        margin-top: 2em;
        text-align: center;
        background-color: #3f7bff;
        padding: 15px 25px;
        border-radius: 100px;
        color: #fff;
        width: 8em;
        display: table-cell;
        vertical-align: middle;
        &:hover {
          border: 1px solid #3f7bff;
          background-color: #fff;
          color: #3f7bff;
          transition: color 0.5s all;
          cursor: pointer;
        }
      }
    }

    &__content {
      width: 80%;
      @media (max-width: 570px) {
        height: 80%;
      }

      p:nth-child(1) {
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 20px;
      }

      p:nth-child(2) {
        font-size: 16px;
        margin-bottom: 40px;
      }
      button {
        border: none;
        color: #fff;
        background-color: #3f7bff;
        padding: 10px 40px;
        border-radius: 100px;
      }
    }

    &__images {
      display: flex;
      justify-content: center;
      img {
        width: 70%;
        @media (max-width: 690px) {
          display: none;
        }
      }
    }
  }
`;
