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

export default function Limenka() {
  const [openModalLimenka, setOpenModalLimenka] = useState(false);

  useEffect(() => {
    ShowModalLimenka();
  }, []);

  const closeModal = () => {
    setOpenModalLimenka(false);
  };

  const items = [
    {
      id: "1",
      title: "Nuevo apartado de pendientes en Calendario",
      img: "/LimenkaTutorials/filtroPemdiente.gif",
      message: " Podras visualizar tus pendientes del dia, su progreso y filtrarlo ",
    },
    {
      id: "2",
      title: "Asignar pendiente a un Ejecutivo",
      img: "/LimenkaTutorials/asignPending.gif",
      message:
        " Desde el apartado de Calendario puedes asignar un pendiente a un ejecutivo y si tiene cotizaciones anexarla a una en especifico",
    },
    {
      id: "3",
      title: "Costo de Envío",
      img: "/LimenkaTutorials/envio.gif",
      message:
        "En el apartado de cotización podrás seleccionar  agregar envío en el cual tendrás como opción: costo de instalación o agregar costo de envío asi mismo seleccionar  agregar IVA o mostrar en el PDF ",
    },

    {
      id: "4",
      title: "Alertas en tus pendientes",
      img: "/LimenkaTutorials/alerta.gif",
      message:
        "¡No olvides más tus pendientes te recordaremos mediante una alerta cuando tengas que cumplirlos! Podrás agregar un seguimiento desde la alerta, acceder al prospecto y  marcarlo como completado",
    },
    {
      id: "5",
      title: "Lleva un control y administración de tus pagos",
      img: "/LimenkaTutorials/pagos.gif",
      message: "En el apartado cuentas por cobrar podrás visualizar, editar y marcar como pagados las notas de ventas de tus clientes ",
    },
    {
      id: "6",
      title: "Buscador rápido de Prospectos, Oportunidades y Clientes ",
      img: "/LimenkaTutorials/buscador.gif",
      message:
        "En cualquier pantalla  del sistema en la parte inicial encontraras un buscador rápido donde por medio del nombre o correo podrás acceder a Prospectos, Oportunidades y Clientes  ",
    },

    {
      id: "7",
      title: "Accede de manera rápida al Catalogo de Productos ",
      img: "/LimenkaTutorials/productos.gif",
      message:
        "En cualquier pantalla del sistema en la parte superior podrás encontrar el icono de productos y así acceder a todo el catálogo filtrando por nombre, tipo de producto o marca",
    },
  ];

  const ShowModalLimenka = () => {
    let modalimenka = localStorage.getItem("modal");

    if (modalimenka === null || modalimenka === undefined) {
      setOpenModalLimenka(true);
      localStorage.setItem("modal", JSON.stringify(true));
      console.log(modalimenka);
    } else {
      localStorage.setItem("modal", JSON.stringify(false));
      setOpenModalLimenka(false);
    }
  };

  const navigate = () => {
    router.push("../cambioslimenka");
  };

  const agreed = () => {
    localStorage.setItem("modal", JSON.stringify(false));
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

          <Grid className="Container">
            <Carousel
              additionalTransfrom={0}
              arrows
              // autoPlay
              // autoPlaySpeed={time ? time : 15000}
              centerMode={false}
              className=""
              containerClass="carousel-container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              responsive={responsive}
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              CustomLeft={<CustomLeft />}
              CustomRight={<CustomRight />}
              autoPlaySpeed
            >
              {items.map((item, index) => (
                <ChangesCard key={item.id} item={item} />
              ))}
            </Carousel>
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

            <Grid item xs={12} md={12} lg={3}>
              <Button className="btn" onClick={() => navigate()}>
                Ver todo
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
