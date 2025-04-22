import React from "react";

const data = [
  // { name: "PROSPECTOS", value: 5000, color: "#C1E9D8" },
  // { name: "OPORT.", value: 3500, color: "#A3E0C8" },
  // { name: "CLIENTES", value: 2000, color: "#85D5B5" },
  // { name: "VENTAS", value: 1000, color: "#69CCA2" },


  { name: "PROSPECTOS", value: 5000, color: "#A3E8F7" }, // Azul claro pastel
  { name: "OPORT.", value: 3500, color: "#7ED8F0" },      // Azul suave
  { name: "CLIENTES", value: 2000, color: "#5BC9E8" },    // Azul intermedio
  { name: "VENTAS", value: 1000, color: "#39B8DF" },      // Azul más saturado

];

const FunnelChartWithTextAndLine = ({ funnelData }) => {
  const total = data[0].value;



  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 10,
        // display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <h4 style={{ marginBottom: 10 }}>Resumen General</h4>
      <svg width="500" height="300">
        {data.map((item, index) => {
          const width = (item.value / total) * 300;
          const height = 60;
          const x = (400 - width) / 2;
          const y = index * (height + 10);
          const radius = 20;

          return (
            <g key={index}>
              <rect x={x} y={y} width={width} height={height} rx={radius} ry={radius} fill={item.color} />

              <text
                x={x + width / 2}
                y={y + height / 2 + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="bold"
              >
                {item.value}
              </text>

              <line
                x1={x + width + 10}
                y1={y + height / 2}
                x2={400}
                y2={y + height / 2}
                stroke={item.color}
                strokeWidth="2"
              />

              <text x={410} y={y + height / 2 + 5} fill="#333" fontSize="14" fontWeight="bold">
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
