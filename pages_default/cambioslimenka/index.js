import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../components/NavBarDashboard";
import { Grid, Button, Tooltip } from "@material-ui/core";
import router from "next/router";
import { ArrowForward } from "@material-ui/icons";

export default function Limenka() {
  const [small, setSmall] = useState([]);
  const [medium, setMedium] = useState([]);
  const [big, setBig] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const limenka = [
    {
      id: "1",
      size: "small",
      title: "Nuevo apartado de pendientes en Calendario",
      img: "/LimenkaTutorials/filtroPemdiente.gif",
      message: " Podrás visualizar tus pendientes del dia, su progreso y filtrarlo. ",
    },
    {
      id: "2",
      size: "medium",
      title: "Descartar cotizaciones",
      img: "/LimenkaTutorials/descarting.gif",
      message: "En la pantalla oportunidades podrás descartar tus cotizaciones seleccionando el motivo. ",
    },
    {
      id: "3",
      size: "medium",
      title: "Costo de Envío",
      img: "/LimenkaTutorials/envio.gif",
      message:
        "En el apartado de cotización podrás seleccionar  agregar envío en el cual tendrás como opción: costo de instalación o agregar costo de envío asi mismo agregar IVA o mostrar en el PDF. ",
    },

    {
      id: "4",
      size: "small",
      title: "Alertas en tus pendientes",
      img: "/LimenkaTutorials/alerta.gif",
      message:
        "¡No olvides más tus pendientes te recordaremos mediante una alerta cuando tengas que cumplirlos! Podrás agregar un seguimiento desde la alerta, acceder al prospecto y  marcarlo como completado.",
    },
    {
      id: "5",
      size: "small",
      title: "Lleva un control y administración de tus pagos",
      img: "/LimenkaTutorials/pagos.gif",
      message: "En el apartado cuentas por cobrar podrás visualizar, editar y marcar como pagados las notas de ventas de tus clientes.",
    },

    {
      id: "6",
      size: "small",
      title: "Cotizar Nuevamente a un cliente",
      img: "/LimenkaTutorials/cotizar.gif",
      message: " Desde la pantalla de Clientes podrás generar en una opción cotizar nuevamente.",
    },
    {
      id: "7",
      size: "medium",
      title: "Cotizaciones",
      img: "/LimenkaTutorials/coti.PNG",
      message: " En la pantalla Cliente podrás visualizar la tabla de todas las cotizaciones. ",
    },

    {
      id: "8",
      size: "big",
      title: "Buscador rápido de Prospectos, Oportunidades y Clientes ",
      img: "/LimenkaTutorials/buscador.gif",
      message:
        "En cualquier pantalla  del sistema en la parte inicial encontraras un buscador rápido donde por medio del nombre o correo podrás acceder a Prospectos, Oportunidades y Clientes  ",
    },
    {
      id: "9",
      size: "big",
      title: "Accede de manera rápida al Catalogo de Productos ",
      img: "/LimenkaTutorials/productos.gif",
      message:
        "En cualquier pantalla del sistema en la parte superior podrás encontrar el icono de productos y así acceder a todo el catálogo filtrando por nombre, tipo de producto o marca",
    },
  ];

  const getData = () => {
    let dataSmall = limenka.filter((item) => item.size == "small");
    setSmall(dataSmall);

    let dataMedium = limenka.filter((item) => item.size == "medium");
    setMedium(dataMedium);
    // console.log(dataMedium);

    let dataBig = limenka.filter((item) => item.size == "big");
    setBig(dataBig);
    // console.log(dataBig);
  };

  return (
    <LimenkaStyled>
      <SideBar />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <Grid container className="container">
          <Grid item xs={12} md={12} className="title">
            <h1>Cambios Limenka</h1>
          </Grid>

          <Grid container className="subContainter ">
            {big.map((item) => (
              <Grid key={item.id} item={item} xs={12} lg={12} className="itemBig">
                <img className="img" src={item.img} />
                <h2> {item.title}</h2>
                <p>{item.message}</p>

                <Tooltip title="Saber más">
                  <ArrowForward
                    className="arrow"
                    onClick={
                      () => router.push({ pathname: `/cambioslimenka/limenka`, query: item })
                      // console.log(item)
                    }
                  />
                </Tooltip>
              </Grid>
            ))}

            {small.map((item) => (
              <Grid key={item.id} xs={12} lg={5} item className="item">
                <img className="img" src={item.img} />
                <h2>{item.title}</h2>
                <p>{item.message}</p>

                <Tooltip title="Saber más">
                  <ArrowForward
                    className="arrow"
                    onClick={
                      () => router.push({ pathname: `/cambioslimenka/limenka`, query: item })
                    }
                  />
                </Tooltip>
              </Grid>
            ))}

            {medium.map((item) => (
              <Grid key={item.id} item xs={12} lg={3} className="item">
                <img className="img" src={item.img} />
                <h2>{item.title}</h2>
                <p>{item.message}</p>

                <Tooltip title="Saber más">
                  <ArrowForward
                    className="arrow"
                    onClick={
                      () => router.push({ pathname: `/cambioslimenka/limenka`, query: item })
                      // console.log(item)
                    }
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </LimenkaStyled>
  );
}

const LimenkaStyled = styled.div`
  background-color: rgba(385, 255, 255, 20.9);
  height: 100vh;
  width: 100%;
  display: flex;
  .main {
    display: flex;
    width: calc(100% - 250px);
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
        flex-direction: column;
        text-align: center;

        h1 {
          margin-top: 1%;
          font-size: 40px;
        }
      }

      .subContainter {
        padding: 2%;
        border-radius: 10px;
        display: flex;

        .itemBig {
          background: green;
          border-radius: 10px;
          padding: 5px 5px;
          position: relative;
          height: 87vh;
          margin-block-end: 2%;

          background-color: #fff;
          display: flex;
          flex-direction: column;
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
            position: static;
            text-align: justify;
            padding: 20px;
            opacity: 0.8;
            line-height: 30px;
          }

          .img {
            border-radius: 15px;
            height: 60vh;
            width: 100%;
          }
        }

        .item {
          margin-left: 4.7%;
          margin-right: 3%;
          border-radius: 15px;
          background-color: #fff;
          display: flex;
          flex-direction: column;

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
            /* border: 1px solid beige;
            border-radius: 40px; */
            width: 14%;
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
            position: static;
            text-align: justify;
            padding: 20px;
            opacity: 0.8;
            line-height: 30px;
          }

          .img {
            border-radius: 15px;
            height: 30vh;
            width: 100%;
          }
        }
      }
    }
  }
`;
