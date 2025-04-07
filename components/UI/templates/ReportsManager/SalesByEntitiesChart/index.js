import { IconButton, Switch, Tooltip as TooltipMaterial } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Equalizer, Map } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import mapDataMex from "../../../../MapSells/mapDataMex";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  require("highcharts/modules/map")(Highcharts);
}

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import { formatNumber } from "../../../../../utils";
ChartJS.register(ArcElement, Tooltip, Legend);

const defaultProps = { isLoading: true };

export default function SalesByEntitiesChart({ isLoading, dataEntities, handleChangeViewEntities, dataSales }) {
  // const { chart, isFetching, values = [] } = dataCategories;

  const classes = useStyles();

  // if (isFetching) {
  //   return (
  //     <ResumeExecutiveStyled>
  //       <p>cargando</p>
  //     </ResumeExecutiveStyled>
  //   );
  // }

  const mapOptions = {
    colorAxis: {
      min: 0,
      stops: [
        [0, "#fff"],
        [0.00001, "#ffffdd"],
        [0.1, "#ffffdd"],
        [0.2, "#ffffcc"],
        [0.4, "#ffff99"],
        [0.6, "#ffff33"],
        [0.8, "#cccc00"],
        [1, "#666600"],
      ],
    },
    chart: {
      map: mapDataMex,
      title: null,
    },
    series: [
      {
        name: "México",
        data: dataSales.map(subArray => subArray.slice(1)),
      },
    ],
    tooltip: {
      formatter: function () {
        return (
          "Cantidad vendida de <b>" +
          this.key +
          "</b> es <b>" +
          formatNumber(this.point?.value ? this.point?.value : 0) +
          "</b>"
        );
      },
    },
  };

  const renderChart = () => {
    switch (dataEntities.typeview) {
      case "map":
        return (
          <HighchartsReact
            options={{ ...mapOptions, title: null }}
            constructorType={"mapChart"}
            highcharts={Highcharts}
            oneToOne={true}
            className="custom-highcharts-container"

            // containerProps={{ style: { height: "200px" } }}
          />
        );

      case "bar":
        return (
          <Bar
            height={400}
            data={dataEntities.chart}
            // ref={chartRef}
            // onClick={onClick}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        );

      default:
        break;
    }
  };

  return (
    <ResumeExecutiveStyled>
      <div className="top">
        <div className="row">
          <h3>Ventas Por estado </h3>
          <div className="actionsrow">
            <div className="chartOption">
              <IconButton onClick={() => handleChangeViewEntities("map")}>
                <TooltipMaterial title="Ver Mapa">
                  <Map />
                </TooltipMaterial>
              </IconButton>
            </div>

            <div className="chartOption">
              <IconButton onClick={() => handleChangeViewEntities("bar")}>
                <TooltipMaterial title="Ver Grafica">
                  <Equalizer />
                </TooltipMaterial>
              </IconButton>
            </div>

            <div className="chartOption row">
              {/* <p>Cotizado</p> */}
              {/* <Switch
                onChange={e => handleSwtichRequest("ens_t", e.target.checked)}
                className={classes.switchBase}
                checked={dataEntities.showSold}
              /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="graph">{dataEntities.isFetching ? <p>Cargando datos</p> : renderChart()}</div>
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

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
    /* height: 200px; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 200px; */

    svg {
      border-radius: 4px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      width: 100%;
      /* height: 300px; */
    }

    .custom-highcharts-container {
      height: 400px;
      border: 2px solid red;
    }
  }

  .pie {
    height: 200px;
    width: 100%;
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

  .highcharts-credits {
    font-size: 0px !important;
  }
`;
