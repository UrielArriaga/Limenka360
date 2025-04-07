import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import NavBarMain from "../components/UI/organism/NavBarMain";
export default function custom404() {
  const router = useRouter();
  const hadleReturn = () => {
    router.back();
  };
  return (
    <HomeStyled>
      <div className="hero">
        <NavBarMain />

        <div className="main">
          <div className="main__content">
            <div className="btn-alt" onClick={hadleReturn}>
              <ArrowBack></ArrowBack>
              Atrás
            </div>
            <div className="cont-p">
              <div className="p">
                <h1>4</h1> <img src="/LOGOLIMENKA360_COLOR-02_small.png" alt="" className="logoforb" />
                <h1>4</h1>
              </div>

              <h2 className="text">Página no encontrada</h2>
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
  .cont-p {
    display: inline-block;
    @media (max-width: 690px) {
      display: flow;
    }
  }
  .p {
    display: flex;
    margin-top: 10em;
    @media (max-width: 690px) {
      margin-top: 6em;
      justify-content: center;
    }
    .logoforb {
      height: 10em;
      @media (max-width: 450px) {
        height: 7em;
      }
    }
  }
  .text {
    text-align: center;
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
    /* background-image: url("/backgroundhome.png"); */
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: right bottom;
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
  nav {
    .nav_content {
      max-width: 1300px;
      margin: auto;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .logo {
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 12px;
        padding: 16px;

        &_small {
          width: 40px;
          @media (min-width: 530px) {
            display: none;
          }
        }
        &_big {
          margin-top: 36px;
          width: 250px;
          @media (max-width: 530px) {
            display: none;
          }
        }
      }

      .items {
        display: flex;
        align-items: center;
        &__item {
          margin-right: 30px;
          display: flex;
          align-items: center;
          color: #616161;
          &:hover {
            color: #3f7bff;
            transition: color 0.3s ease-in-out;
            cursor: pointer;
          }
        }

        &__item--getstarted {
          margin-right: 30px;
          display: flex;
          align-items: center;
          background-color: #3f7bff;
          padding: 10px 20px;
          border-radius: 100px;
          color: #fff;
          &:hover {
            color: #fff;
            transition: color 0.3s ease-in-out;
            cursor: pointer;
          }
        }
      }
    }
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
      line-height: 1em;
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
      justify-content: center;
      .btn {
        margin-left: 1em;
        margin-top: 2em;
        text-align: center;
        background-color: #3f7bff;
        padding: 15px 25px;
        border-radius: 100px;
        color: #fff;
        width: 8em;
        display: table-cell;
        vertical-align: middle;
        font-size: 18px;
        font-weight: bold;
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
      /* height: 80vh; */
      /* height: calc(100% - 60px); */

      @media (max-width: 530px) {
        /* height: 80%; */
        height: calc(100% - 60px);
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
