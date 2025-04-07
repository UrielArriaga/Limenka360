import { Close, KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Button, Dialog, IconButton } from "@material-ui/core";
import styled from "styled-components";
import useModal from "../../../../../hooks/useModal";
import Select from "react-select";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  scales: {
    x: {
      barThickness: 100, // Ajusta el ancho de las barras
      maxBarThickness: 60,
      barPercentage: 0.8, // Ajusta el espaciado entre las barras
    },
    y: {
      beginAtZero: true, // Comenzar en 0
      stepSize: 30000, // Establecer el incremento en 1000
    },
  },
};

export default function GoalsExecutives({
  ejecutiveGoalsData,
  orderBy,
  goalsNames,
  setTypeDataChart,
  typeDataChart,
  handleGetData,
  totalResults,
  setOrderBy,
  isFetching,
}) {
  const { open, toggleModal } = useModal();

  const handleClickViewBySold = () => {
    setTypeDataChart({
      id: "montovendido",
      name: "Monto Vendido",
    });

    setOrderBy({
      value: "-totalAmount",
      label: "Monto Vendido",
    });

    handleGetData({
      id: "montovendido",
      name: "Monto Vendido",
    });
  };

  return (
    <div className="chartsection" id="step-one">
      <div className="row">
        <h3>{typeDataChart?.name}</h3>

        <div className="actionschart">
          <div className="config">
            <Button id="step-two" onClick={toggleModal}>
              Configurar
            </Button>
          </div>
        </div>
      </div>
      <div className="content">
        {isFetching && (
          <div className="overlay_loader">
            <div className="message">
              <p>Cargando...</p>
            </div>
          </div>
        )}
        {isFetching === false && <Bar height={60} type="bar" data={ejecutiveGoalsData} options={options} />}

        {totalResults === 0 && isFetching === false && (
          <div className="overlay_emptydata">
            <div className="message">
              <p>No hay datos para mostrar</p>
              <Button onClick={() => handleClickViewBySold()} color="primary" variant="contained">
                Ver Por Monto Vendido
              </Button>
            </div>
          </div>
        )}
      </div>
      <ModalConfig
        handleGetData={handleGetData}
        setTypeDataChart={setTypeDataChart}
        open={open}
        toggleModal={toggleModal}
        goalsNames={goalsNames}
        typeDataChart={typeDataChart}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </div>
  );
}

const ModalConfigStyled = styled(Dialog)`
  .divider {
    margin-bottom: 20px;
  }
  .content {
    width: 600px;
    height: 400px;
  }
  .label {
    margin-bottom: 10px;
  }
  .body {
    height: 70%;
    padding: 20px;
  }

  .actions {
    // height: 20%;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .header {
    width: 100%;
    height: 40px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
    position: relatieve;
    p {
      font-size: 20px;
      font-weight: 600;
      color: #000000;
    }

    .close {
      position: absolute;
      right: 10px;
    }
  }
`;

const orderstypes = {
  montovendido: [
    {
      value: "-totalAmount",
      label: "Monto Vendido Desc",
    },
    {
      value: "totalAmount",
      label: "Monto Vendido Asc",
    },
  ],

  goal: [
    {
      value: "progress",
      label: "Menor Progreso",
    },
    {
      value: "goal",
      label: "Mayor Progreso",
    },
  ],
};
const ModalConfig = ({
  typeDataChart,
  open,
  toggleModal,
  goalsNames = [],
  setTypeDataChart,
  handleGetData,
  setOrderBy,
  orderBy,
}) => {
  return (
    <ModalConfigStyled
      open={open}
      keepMounted
      onClose={toggleModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="content">
        <div className="header">
          <p id="step-three">Configuracion de Grafias</p>

          <div className="close">
            <IconButton onClick={toggleModal}>
              <Close />
            </IconButton>
          </div>
        </div>

        <div className="body">
          <p className="label">Mostrar Datos por</p>
          <Select
            id="step-four"
            maxMenuHeight={140}
            option
            className="rnselect"
            options={goalsNames}
            getOptionValue={option => `${option["id"]}`}
            getOptionLabel={option => `${option["id"] === "montovendido" ? option.name : option.name + "(meta)"} `}
            placeholder="Vista de la grafica"
            onChange={e => {
              console.log(e);
              setTypeDataChart(e);

              if (e.id === "montovendido") {
                setOrderBy({
                  value: "-totalAmount",
                  label: "Monto Vendido Desc",
                });
              } else {
                setOrderBy({
                  value: "-progress",
                  label: "Menor Progreso",
                });
              }
            }}
          />

          <div className="divider" />

          {/* <p className="label">Orden</p> */}
          {/* <Select
            maxMenuHeight={140}
            option
            className="rnselect"            
            options={orderstypes[typeDataChart?.id === "montovendido" ? "montovendido" : "goal"]}
            onChange={e => {
              console.log(e);
            }}
          /> */}
        </div>

        <div className="actions">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              handleGetData(typeDataChart);
              toggleModal();
            }}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </ModalConfigStyled>
  );
};
