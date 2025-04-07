import { useForm } from "react-hook-form";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { Dialog, Grid, Button, Fab, Card } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import router from "next/router";
import ChangesCard from "../CarrouselLimenka/limenkaCard";
import CustomLeft from "../CarrouselLimenka/pagination/arrowleft";
import CustomRight from "../CarrouselLimenka/pagination/arrowright";
import Carousel from "react-multi-carousel";

export default function ModalCustomTutorial() {
  const [openModalLimenka, setOpenModalLimenka] = useState(false);

  useEffect(() => {
    ShowModalLimenka();
  }, []);

  const closeModal = () => {
    setOpenModalLimenka(false);
  };

  const ShowModalLimenka = () => {
    let modalimenka = localStorage.getItem("modalmorethanone");
    if (modalimenka === null || modalimenka === undefined) {
      setOpenModalLimenka(true);
      localStorage.setItem("modalmorethanone", JSON.stringify(true));
      console.log(modalimenka);
    } else {
      localStorage.setItem("modalmorethanone", JSON.stringify(false));
      setOpenModalLimenka(false);
    }
  };

  const agreed = () => {
    localStorage.setItem("modalmorethanone", JSON.stringify(false));
    setOpenModalLimenka(false);
  };

  return (
    <Main>
      <Dialog open={openModalLimenka}>
        <ModalLimenka>
          <div className="Head">
            <p className="Head__title">Cambios Limenka</p>

            <Close onClick={closeModal} className="Head__Icon" />
          </div>

          <h3>Agrega mismas partidas en una cotizacion</h3>
          <Grid className="Container">
            <img src="/tutorials/oportunitiesproducts.gif" />
          </Grid>

          <Grid container style={{ marginTop: "1%" }}>
            <Grid item xs={12} md={12} lg={6}>
              <Button className="btnEntendido" onClick={() => agreed()}>
                Entendido
              </Button>
            </Grid>

            <Grid item xs={12} md={12} lg={3}>
              <Button className="btnSalir" onClick={closeModal}>
                Salir
              </Button>
            </Grid>
          </Grid>
        </ModalLimenka>
      </Dialog>
    </Main>
  );
}

const Main = styled.div``;

const ModalLimenka = styled.div`
  position: fixed;
  top: 8%;
  left: 20%;
  right: 20%;
  bottom: auto;
  transform: "translate(50%, 50%)";
  background: white;
  border-radius: 13px;
  padding: 10px 10px;
  overflow-y: auto;
  height: 87vh;
  overflow-x: hidden;

  @media only screen and (max-width: 1190px) {
    height: 85vh;
    left: 5%;
    right: 5%;
  }
  ::-webkit-scrollbar {
    width: 8px;
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

  .Head {
    display: flex;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 25px;
    background-color: #103c82;
    color: white;
    margin-top: -10px;
    margin-left: -25px;
    margin-right: -25px;
    padding: 10px;
    /* margin-block-end: 7%; */

    &__title {
      margin-left: 3%;
      font-size: 20px;
    }

    &__Icon {
      margin-left: 76%;
    }
  }

  h3 {
    margin-bottom: 10px;
  }

  .Container {
    display: flex;
    justify-content: center;
  }

  .padre {
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }

  .btnEntendido {
    color: white;
    background-color: #103c82;
    border: 1px solid #103c82;
    margin-top: 2.5%;

    @media only screen and (max-width: 1279px) {
      width: 100%;
      margin-top: 1%;
      margin-block-end: 0.5%;
    }
  }

  .btnSalir {
    color: #103c82;
    background-color: white;
    border: 1px solid #103c82;
    width: 95%;
    margin-top: 2.5%;
    @media only screen and (max-width: 1279px) {
      width: 100%;
      margin-block-end: 0.5%;
    }
  }

  .btn {
    color: white;
    background-color: #103c82;
    width: 95%;
    margin-top: 2.5%;
    @media only screen and (max-width: 1279px) {
      width: 100%;
    }
  }

  .requiredAlert {
    color: red;
  }

  /*InputNumber without arrows*/
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Container = styled.div`
  .carousel-container {
    /* background-color: #ffff; */
    background-color: red;
    width: 100%;
    height: 110px;
  }
`;
