import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function LimenkaChanges() {
  const [showTutorial, setShowTutorial] = useState(false);

  const router = useRouter();

  const routesNoTutorial = ["/", "/login", "/register"];

  useEffect(() => {
    setTimeout(() => {
      const isShowed = localStorage.getItem("tutorialShowed");
      if (!isShowed && !routesNoTutorial.includes(router.pathname)) {
        setShowTutorial(true);
      }
    }, 3000);
  }, []);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialShowed", "true");
  };

  if (!showTutorial) {
    return null;
  }

  return (
    <LimenkaChangesStyled>
      <div className="header">
        <h1>Cambios Limenka 360</h1>

        <div className="closebutton">
          <IconButton
            onClick={() => {
              setShowTutorial(false);
            }}
          >
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="bodytutorial">
        <div className="cardtutorial">
          <h1>1.- Edicion de una cotización</h1>
          <p>Agrega, elimina o edita los productos de una cotización, solo da click en el boton "Editar Cotizacion"</p>

          <div className="video">
            <video
              controls
              src="https://res.cloudinary.com/dvmpejtlj/video/upload/v1703706612/ji6rhjp6nnxew4huhamc.mp4"
            />
          </div>
        </div>
        <div className="cardtutorial">
          <h1>2.- Elimacion de una venta</h1>
          <p>
            Ahora puedes eliminar una venta, solo da click en el boton "Eliminar Venta" y seras redirigido a la pagina
          </p>

          <div className="video">
            <video controls src="https://res.cloudinary.com/dvmpejtlj/video/upload/v1703782935/deletesale_a7nbzs.mov" />
          </div>
        </div>

        <div className="cardtutorial">
          <h1>3. Filtro de prospectos sin seguimiento</h1>
          <p>
            Visualiza todos los prospectos que no tengan seguimiento, recuerda que el seguimiento creado con exito no se
            toma en cuenta
          </p>

          <div className="video">
            <video
              controls
              src="https://res.cloudinary.com/dvmpejtlj/video/upload/v1703783714/filterbyproduct_fkbmw7.mp4"
            />
          </div>
        </div>
        <div className="cardtutorial">
          <h1>4. Filtro de oportunidades por producto cotizado</h1>
          <p>Filtra las cotizaciones por producto o categoria de producto</p>

          <div className="video">
            <video
              controls
              src="https://res.cloudinary.com/dvmpejtlj/video/upload/v1703783835/filterbycategory_enhhuj.mp4"
            />
          </div>
        </div>
      </div>

      <div className="actions">
        <Button
          onClick={() => {
            closeTutorial();
          }}
        >
          Vale,Lo entiendo
        </Button>
      </div>
    </LimenkaChangesStyled>
  );
}

const appearFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const LimenkaChangesStyled = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  width: 500px;
  height: 90%;
  animation: ${appearFromTop} 0.5s ease-in-out; /* Agregar animación */

  /* background: rgba(64, 122, 255, 0.6); */
  /* background: rgba(0, 0, 0, 0.7); */
  /* background: rgba(38, 134, 118, 0.8); */
  background: rgba(149, 75, 148, 0.8);
  z-index: 9999;
  border-radius: 8px;
  padding: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .closebutton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      .MuiSvgIcon-root {
        color: #fff;
      }
    }
  }

  h1 {
    color: #fff;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .bodytutorial {
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;

    scrollbar-width: thin; /* Firefox */
    scrollbar-color: darkgray lightgray; /* Firefox */

    &::-webkit-scrollbar {
      width: 12px; /* Chrome/Safari/Webkit */
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgray; /* Color de la barra de desplazamiento */
      border-radius: 10px;
      border: 3px solid lightgray; /* Borde alrededor de la barra de desplazamiento */
    }

    &::-webkit-scrollbar-track {
      background-color: lightgray; /* Color de fondo de la barra de desplazamiento */
      border-radius: 10px;
    }

    .cardtutorial {
      padding: 10px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 10px;
      h1 {
        color: #000;
        font-size: 18px;
        margin-bottom: 10px;
      }
      p {
        color: #000;
        font-size: 16px;
      }

      .video {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 250px;

        video {
          height: 200px;
          margin-top: 10px;
        }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    button {
      background: rgba(64, 122, 255, 1);
      color: #fff;
      margin-left: 10px;
    }
  }
`;
