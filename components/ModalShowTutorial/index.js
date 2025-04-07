import { useForm } from "react-hook-form";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { Dialog, Grid, Button, Fab, Card, Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import router from "next/router";
import ChangesCard from "../CarrouselLimenka/limenkaCard";
import CustomLeft from "../CarrouselLimenka/pagination/arrowleft";
import CustomRight from "../CarrouselLimenka/pagination/arrowright";
import Carousel from "react-multi-carousel";

export default function ModalShowTutorial() {
  const [openModalLimenka, setOpenModalLimenka] = useState(false);

  useEffect(() => {
    ShowModalLimenka();
  }, []);

  const closeModal = () => {
    setOpenModalLimenka(false);
  };

  const ShowModalLimenka = () => {
    let modalimenka = localStorage.getItem("modal_markimportant");

    if (modalimenka === null || modalimenka === undefined) {
      setOpenModalLimenka(true);
      localStorage.setItem("modal_markimportant", JSON.stringify(true));
      console.log(modalimenka);
    } else {
      if (JSON.parse(modalimenka) === true) {
        setOpenModalLimenka(true);
        localStorage.setItem("modal_markimportant", JSON.stringify(true));
      } else {
        localStorage.setItem("modal_markimportant", JSON.stringify(false));

        setOpenModalLimenka(false);
      }
    }
  };

  const navigate = () => {
    router.push("../cambioslimenka");
  };

  const agreed = () => {
    localStorage.setItem("modal_markimportant", JSON.stringify(false));
    setOpenModalLimenka(false);
  };

  return (
    <Main>
      <Dialog open={openModalLimenka} onClose={() => setOpenModalLimenka(false)}>
        <ModalLimenka>
          <div className="Head">
            <p className="Head__title">Cambios Limenka360 21/02/23</p>
            <Close onClick={closeModal} className="Head__Icon" />
          </div>
          <h1 style={{ textAlign: "center" }}>Marca tus oportunidades como importante y destacala sobre las demás</h1>

          <Box p={2}>
            <video width="100%" controls autoPlay={true} muted>
              <source
                src="https://limenka.sfo3.digitaloceanspaces.com/tutorials%2Fimportant_oportunity.mov"
                type="video/mp4"
              />
            </video>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="flex-end" mt={1} mr={2}>
            <Button variant="outlined" color="primary" onClick={closeModal} style={{ marginRight: 20 }}>
              Salir
            </Button>
            <Button variant="contained" color="primary" onClick={() => agreed()}>
              Entendido
            </Button>
          </Box>
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
  padding: 0px;
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
    background-color: #103c82;
    color: white;
    font-weight: bold;
    display: flex;
    padding: 10px;
    /* 
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 25px;
    */
    /* margin-top: -10px;
    margin-left: -25px;
    margin-right: -25px;
    padding: 10px; */
    /* margin-block-end: 7%; */

    &__title {
      /* margin-left: 3%; */
      font-size: 20px;
    }

    &__Icon {
      margin-left: 76%;
    }
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
