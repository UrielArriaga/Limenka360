import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapDataMex from "./mapDataMex";
import styled from "styled-components";
import { formatNumber } from "../../utils";
if (typeof Highcharts === "object") {
  require("highcharts/modules/map")(Highcharts);
}

// #region styled-components
const MapContainer = styled.div`
  border-radius: 4px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  height: 100%;
  background-color: white;
  svg {
    border-radius: 4px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 100%;
  }
  .highcharts-credits {
    font-size: 0px !important;
  }
`;
// #endregion

// #region functions

// #endregion

// #region component

const defaultProps = { isLoading: true };

/**
 * Generic map
 * @author Montoya
 */
const MapSells = ({ data, isLoading }) => {
  const mapOptions = {
    title: {
      text: "Mapa de ventas por estado",
      style: {
        color: "#495057",
        fontWeight: "bold",
      },
    },
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
    },
    series: [
      {
        name: "México",
        data: data,
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
  return (
    <MapContainer>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <HighchartsReact options={mapOptions} constructorType={"mapChart"} highcharts={Highcharts} oneToOne={true} />
      )}
    </MapContainer>
  );
};

MapSells.defaultProps = defaultProps;

export default MapSells;
