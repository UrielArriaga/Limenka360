import Link from "next/link";
import React from "react";
import styled from "styled-components";
import NavBarMain from "../components/UI/organism/NavBarMain";
export default function TerminosYCondiciones() {
  return (
    <HomeStyled>
      <div className="hero">
        <NavBarMain></NavBarMain>

        <div className="main">
          <div className="main__content">
            <h1>Terminos y condiciones</h1>
            <h2>Terminos de la aplicación</h2>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Eu volutpat odio facilisis mauris. In mollis nunc sed id semper risus. Pellentesque
                id nibh tortor id aliquet lectus proin nibh. Leo vel fringilla est ullamcorper. At ultrices mi tempus
                imperdiet nulla malesuada. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Porttitor
                lacus luctus accumsan tortor posuere ac. Nulla posuere sollicitudin aliquam ultrices sagittis orci a
                scelerisque. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Mauris rhoncus aenean
                vel elit scelerisque mauris pellentesque. In hac habitasse platea dictumst.
              </li>
              <li>
                At erat pellentesque adipiscing commodo elit at. Erat nam at lectus urna duis convallis convallis tellus
                id. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Aliquam ut porttitor leo a diam
                sollicitudin tempor. Suspendisse potenti nullam ac tortor vitae purus. Nullam non nisi est sit amet
                facilisis magna etiam tempor. Commodo quis imperdiet massa tincidunt. Nisl tincidunt eget nullam non
                nisi. Potenti nullam ac tortor vitae purus faucibus ornare. Vel quam elementum pulvinar etiam non quam
                lacus suspendisse. Lectus sit amet est placerat in. Quisque id diam vel quam elementum pulvinar etiam
                non quam. Cursus eget nunc scelerisque viverra mauris.
              </li>
              <li>
                Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Suspendisse interdum consectetur
                libero id faucibus. Commodo ullamcorper a lacus vestibulum sed arcu. Magna sit amet purus gravida quis
                blandit. Libero justo laoreet sit amet cursus sit amet. Euismod nisi porta lorem mollis. Proin fermentum
                leo vel orci porta non pulvinar. Risus commodo viverra maecenas accumsan lacus. Odio tempor orci dapibus
                ultrices. Nibh sit amet commodo nulla.
              </li>
              <li>
                Velit aliquet sagittis id consectetur purus ut. Volutpat odio facilisis mauris sit amet massa. Non
                consectetur a erat nam at lectus urna. Nisl pretium fusce id velit ut tortor pretium viverra. Venenatis
                tellus in metus vulputate eu. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Dui
                nunc mattis enim ut tellus elementum sagittis vitae et. Elit at imperdiet dui accumsan sit amet nulla.
                Leo in vitae turpis massa sed elementum tempus egestas sed. Lectus arcu bibendum at varius vel pharetra
                vel. Mattis nunc sed blandit libero volutpat sed. Vitae sapien pellentesque habitant morbi.
              </li>
            </ul>
            <h2>Condiciones de la aplicación</h2>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Eu volutpat odio facilisis mauris. In mollis nunc sed id semper risus. Pellentesque
                id nibh tortor id aliquet lectus proin nibh. Leo vel fringilla est ullamcorper. At ultrices mi tempus
                imperdiet nulla malesuada. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Porttitor
                lacus luctus accumsan tortor posuere ac. Nulla posuere sollicitudin aliquam ultrices sagittis orci a
                scelerisque. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Mauris rhoncus aenean
                vel elit scelerisque mauris pellentesque. In hac habitasse platea dictumst.
              </li>
              <li>
                At erat pellentesque adipiscing commodo elit at. Erat nam at lectus urna duis convallis convallis tellus
                id. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Aliquam ut porttitor leo a diam
                sollicitudin tempor. Suspendisse potenti nullam ac tortor vitae purus. Nullam non nisi est sit amet
                facilisis magna etiam tempor. Commodo quis imperdiet massa tincidunt. Nisl tincidunt eget nullam non
                nisi. Potenti nullam ac tortor vitae purus faucibus ornare. Vel quam elementum pulvinar etiam non quam
                lacus suspendisse. Lectus sit amet est placerat in. Quisque id diam vel quam elementum pulvinar etiam
                non quam. Cursus eget nunc scelerisque viverra mauris.
              </li>
              <li>
                Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Suspendisse interdum consectetur
                libero id faucibus. Commodo ullamcorper a lacus vestibulum sed arcu. Magna sit amet purus gravida quis
                blandit. Libero justo laoreet sit amet cursus sit amet. Euismod nisi porta lorem mollis. Proin fermentum
                leo vel orci porta non pulvinar. Risus commodo viverra maecenas accumsan lacus. Odio tempor orci dapibus
                ultrices. Nibh sit amet commodo nulla.
              </li>
              <li>
                Velit aliquet sagittis id consectetur purus ut. Volutpat odio facilisis mauris sit amet massa. Non
                consectetur a erat nam at lectus urna. Nisl pretium fusce id velit ut tortor pretium viverra. Venenatis
                tellus in metus vulputate eu. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Dui
                nunc mattis enim ut tellus elementum sagittis vitae et. Elit at imperdiet dui accumsan sit amet nulla.
                Leo in vitae turpis massa sed elementum tempus egestas sed. Lectus arcu bibendum at varius vel pharetra
                vel. Mattis nunc sed blandit libero volutpat sed. Vitae sapien pellentesque habitant morbi.
              </li>
            </ul>
            <div className="btn-container">
              <Link href="/login">
                <div className="btn">Empezar</div>
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
  /* background-image: linear-gradient(to right top, #046cbc, #2a6bdb, #6363f3, #9f4fff, #dc00ff); */
  ul {
    list-style-type: disc;
    list-style-position: inside;
  }
  .hero {
    background-image: url("/backgroundhome.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: right bottom;
    height: 100vh;
    overflow-y: hidden;
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
    /* align-items: center;
    justify-content: center; */
    height: calc(100% - 60px);
    padding: 24px;

    h1,
    h2 {
      /* font-size: 35px; */
      line-height: 2em;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
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
      height: 90vh;
      overflow-x: auto;
      @media (max-width: 530px) {
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
