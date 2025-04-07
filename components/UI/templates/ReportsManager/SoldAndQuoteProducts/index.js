import { Switch, Tooltip as TooltipMaterial } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FiberManualRecord } from "@material-ui/icons";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useRef } from "react";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import styled from "styled-components";
import { formatNumber } from "../../../../../utils";
import { colors } from "../../../../../styles/global.styles";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SoldAndQuoteProducts({ dataProducts, handleSwtichRequest }) {
  const { chart, isFetching, values = [], res } = dataProducts;
  const chartRef = useRef();
  const classes = useStyles();
  const router = useRouter();

  const onClick = event => {
    console.log(getElementsAtEvent(chartRef.current, event));
  };

  const handleElementClick = elems => {
    if (elems.length > 0) {
      let params = {};
      const clickedElementIndex = elems[0].index;
      console.log("res", res[clickedElementIndex]);
      params = { proId: res[clickedElementIndex].id, proCo: res[clickedElementIndex].code };

      if (dataProducts.showSold) {
        // console.log("Vendidas");
        router.push({ pathname: "/ventas", query: params });
      } else {
        // console.log("Cotizadas");
        router.push({ pathname: "/oportunidades", query: params });
      }
    }
  };

  if (isFetching) {
    return (
      <SoldAndQuoteProductsStyled>
        <p>cargando</p>
      </SoldAndQuoteProductsStyled>
    );
  }

  return (
    <SoldAndQuoteProductsStyled>
      <div className="top">
        <div className="row">
          {/* <h3>Productos mas vendidos </h3> */}
          <h3>{dataProducts.showSold ? "Productos mas vendidos" : "Productos mas cotizados"}</h3>
          <div className="actionsrow">
            {/* <p>Cotizado</p> */}
            <p>{dataProducts.showSold ? "Vendido" : "Cotizado"}</p>
            <Switch
              onChange={e => handleSwtichRequest("prd", e.target.checked)}
              className={classes.switchBase}
              checked={dataProducts.showSold}
            />
          </div>
        </div>
      </div>

      <div className="values">
        {values.map((item, index) => {
          return (
            <NumberCard className="numbers" bg={item.color} key={index}>
              <div className="circle">
                <FiberManualRecord className={"icon"} />
              </div>
              <div className="column">
                <p className="total">{formatNumber(item.value)}</p>
                <TooltipMaterial title={item.name}>
                  <p className="title">{item.name.slice(0, 12)}...</p>
                </TooltipMaterial>
              </div>
            </NumberCard>
          );
        })}
      </div>

      <div className="graph">
        <div className="pie">
          <Bar
            height={400}
            data={chart}
            ref={chartRef}
            onClick={onClick}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              onClick: (event, elements) => {
                handleElementClick(elements);
              },
            }}
          />
        </div>
      </div>

      {dataProducts?.count <= 0 && (
        <div className="overlay_emptydata">
          <div className="message">
            <p>No hay datos para mostrar</p>
          </div>
        </div>
      )}
    </SoldAndQuoteProductsStyled>
  );
}

const useStyles = makeStyles(theme => ({
  switchRoot: {
    width: 10,
    height: 26,
  },
  switchBase: {
    color: "#3f51b5",
    "&$checked": {
      color: "#009688",
    },
    "&$checked + $track": {
      backgroundColor: "#009688",
    },
  },
  checked: {},
  track: {},
}));

const SoldAndQuoteProductsStyled = styled.div`
  min-height: 400px;
  padding: 10px;
  background-color: #fff;
  position: relative;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  .top {
    display: flex;
  }
  h3 {
    text-transform: capitalize;
  }
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }
  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }

  .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actionsrow {
    display: flex;
    align-items: center;
  }

  .graph {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pie {
    height: 200px;
    width: 100%;
    cursor: pointer;
  }

  .values {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .overlay_emptydata {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 210px;
    width: 100%;
    top: 75px;
    position: absolute;
    opacity: 0.8;
    z-index: 1000;

    .message {
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.4);
      width: 80%;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      p {
        margin-bottom: 10px;
      }
      button {
        background-color: ${colors.primaryColor};
      }
    }
  }
`;

const NumberCard = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  .icon {
    font-size: 12px;
    margin-right: 5px;

    color: ${props => props.bg};
  }
  .title {
    font-size: 12px;
    color: #878a99;
  }
  .total {
    color: #495057;
    font-weight: bold;
    font-size: 12px;
  }
`;
