import { LinearProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
export default function LoaderTable() {
  return (
    <Loader>
      <div className="ctr_load">
        <div className="ctr_load__img">
          <img src="/load.png" />
        </div>
        <div className="ctr_load__load">
          <p>Cargando</p>
          <LinearProgress color="primary" />
        </div>
      </div>
    </Loader>
  );
}

const Loader = styled.div`
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 5%;
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
