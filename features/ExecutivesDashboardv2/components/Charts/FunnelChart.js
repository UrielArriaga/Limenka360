import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const data = [
  { name: "PROSPECTOS", value: 5000, color: "#A3E8F7" },
  { name: "OPORT.", value: 3500, color: "#7ED8F0" },
  { name: "CLIENTES", value: 2000, color: "#5BC9E8" },
  { name: "VENTAS", value: 1000, color: "#39B8DF" },
];

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.p`
  margin-bottom: 20px !important;
  font-weight: bold;
`;

const Svg = styled.svg`
  width: 500px;
  height: auto; /* Ajustar altura dinámicamente */
`;

const BarGroup = styled.g`
  transform: translateX(100px); /* Ajustar para espacio de etiquetas */
`;

const Bar = styled.rect`
  rx: 10px;
  ry: 10px;
`;

const ValueText = styled.text`
  text-anchor: middle;
  fill: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  margin-bottom: 30px;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  margin-right: 10px;
`;

const LabelText = styled(Typography)`
  font-size: 0.9rem !important;
  font-weight: bold !important;
`;

const ValueLabel = styled(Typography)`
  font-size: 0.8rem !important;
  color: #777;
  margin-left: 15px !important;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-left: 20px;
`;

const FunnelChartWithIcons = () => {
  const total = data[0].value;
  const barHeight = 40;
  const barSpacing = 15;
  const svgHeight = data.length * (barHeight + barSpacing) + 20; // Ajustar altura del SVG

  return (
    <ChartContainer>
      <Title variant="h6">Embudo de Conversión</Title>
      <div style={{ display: "flex" }}>
        <div>
          {data.map((item, index) => (
            <LabelContainer key={index}>
              <ColorBox style={{ backgroundColor: item.color }} />
              <LabelText>{item.name}</LabelText>
              <ValueLabel>({item.value})</ValueLabel>
            </LabelContainer>
          ))}
        </div>
        <Svg width={400} height={svgHeight}>
          <BarGroup>
            {data.map((item, index) => {
              const width = (item.value / total) * 250; // Ancho máximo de la barra
              const y = index * (barHeight + barSpacing);
              const x = 0;

              return (
                <g key={index}>
                  <Bar
                    x={x}
                    y={y}
                    width={width}
                    height={barHeight}
                    fill={item.color}
                  />
                  <ValueText x={width / 2} y={y + barHeight / 2 + 4}>
                    {item.value}
                  </ValueText>
                </g>
              );
            })}
          </BarGroup>
        </Svg>
        {/* <IconWrapper style={{ height: svgHeight }}>
          {data.slice(0, -1).map((_, index) => (
            <ArrowDownwardIcon
              key={`arrow-${index}`}
              color="action"
              style={{ fontSize: 30 }}
            />
          ))}
        </IconWrapper> */}
      </div>
    </ChartContainer>
  );
};

export default FunnelChartWithIcons;
