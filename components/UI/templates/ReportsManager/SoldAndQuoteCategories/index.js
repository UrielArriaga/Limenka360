import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, Switch, Tooltip as TooltipMaterial } from "@material-ui/core";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { FiberManualRecord } from "@material-ui/icons";
import { formatNumber } from "../../../../../utils";
import { colors } from "../../../../../styles/global.styles";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SoldAndQuoteCategories({ dataCategories = {}, handleSwtichRequest }) {
  const { chart, isFetching, values = [], res } = dataCategories;
  const router = useRouter();
  const classes = useStyles();

  const handleElementClick = elems => {
    if (elems.length > 0) {
      let params = {};
      const clickedElementIndex = elems[0].index;
      console.log("res", res[clickedElementIndex]);
      params = { catid: res[clickedElementIndex].id, catna: res[clickedElementIndex].name };

      if (dataCategories.showSold) {
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
      <ResumeExecutiveStyled>
        <p>cargando</p>
      </ResumeExecutiveStyled>
    );
  }

  return (
    <ResumeExecutiveStyled>
      <div className="top">
        <div className="row">
          <h3>Categorias mas {dataCategories.showSold ? "Vendidas" : "Cotizadas"} </h3>
          <div className="actionsrow">
            <p>{dataCategories.showSold ? "Vendido" : "Cotizado"}</p>
            <Switch
              onChange={e => handleSwtichRequest("ctr", e.target.checked)}
              className={classes.switchBase}
              checked={dataCategories.showSold}
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
          <Pie
            data={chart}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                  position: "bottom",
                },
              },
              onClick: (event, elements) => {
                handleElementClick(elements);
              },
            }}
          />
        </div>
      </div>

      {dataCategories?.count <= 0 && (
        <div className="overlay_emptydata">
          <div className="message">
            <p>No hay datos para mostrar</p>
          </div>
        </div>
      )}
    </ResumeExecutiveStyled>
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

const CustomizedSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: "#009688",
    },
    "&$checked + $track": {
      backgroundColor: "#009688",
    },
  },
  checked: {},
  track: {},
})(props => <Switch {...props} />);

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

const ResumeExecutiveStyled = styled.div`
  width: 95%;
  min-height: 400px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  .top {
    display: flex;
    margin-bottom: 20px;
  }
  h3 {
    text-transform: capitalize;
  }
  h3 {
    /* margin-bottom: 20px; */
    color: #495057;
  }
  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }

  .row {
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .actionsrow {
    display: flex;
    align-items: center;
  }
  .overlay_emptydata {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 210px;
    width: 100%;
    top: 74px;
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
