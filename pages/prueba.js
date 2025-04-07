import React from "react";

const data = [
  { name: "PROSPECTOS", value: 5000, color: "#C1EAD8" },
  { name: "OPORTUNIDADES", value: 3500, color: "#A5E1C9" },
  { name: "CLIENTES", value: 2000, color: "#85D6B6" },
  { name: "VENTAS", value: 1000, color: "#A2DFC7" },
];

const FunnelChartWithTextAndLine = () => {
  const total = data[0].value;

  return (
    <div>
      <svg width="500" height="400">
        {data.map((item, index) => {
          const width = (item.value / total) * 300;
          const height = 60;
          const x = (400 - width) / 2;
          const y = index * (height + 10);
          const radius = 20;

          return (
            <g key={index}>
              {/* Rectángulo principal */}
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={radius} // Bordes redondeados
                ry={radius}
                fill={item.color}
              />

              {/* Texto dentro del rectángulo */}
              <text
                x={x + width / 2} // Centrado horizontalmente
                y={y + height / 2 + 5} // Centrado verticalmente
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="bold"
              >
                {item.value}
              </text>

              {/* Línea para el título */}
              <line
                x1={x + width + 10}
                y1={y + height / 2}
                x2={400} // Línea extendida hasta el borde del SVG
                y2={y + height / 2}
                stroke={item.color}
                strokeWidth="2"
              />

              {/* Título al lado */}
              <text
                x={410} // Posición alineada después del borde derecho del SVG
                y={y + height / 2 + 5}
                fill="#333"
                fontSize="14"
                fontWeight="bold"
              >
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FunnelChartWithTextAndLine;
