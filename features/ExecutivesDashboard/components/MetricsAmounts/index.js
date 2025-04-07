import React from "react";
import { MetricsAmountsStyled } from "./styled";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MetricsAmounts() {
  const data = [
    { title: "Monto Cotizado", value: 5000, bgColor: "#8884d8" },
    { title: "Monto Vendido", value: 4000, bgColor: "#82ca9d" },
    { title: "Monto a Cobrar", value: 3000, bgColor: "#ffc658" },
    { title: "Monto Pagado", value: 2500, bgColor: "#ff8042" },
  ];
  // const data = [
  //   { name: "Enero", Cotizado: 5000, Vendido: 4000, Cobrar: 3000, Pagado: 2500 },
  //   { name: "Febrero", Cotizado: 6000, Vendido: 4500, Cobrar: 3500, Pagado: 3000 },
  // ];

  return (
    <MetricsAmountsStyled>
      <h4>Resumen Montos</h4>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.bgColor,
              padding: "20px",
              borderRadius: "8px",
              color: "#fff",
              flex: "1 0 calc(50% - 20px)",
              textAlign: "center",
            }}
          >
            <h4>{item.title}</h4>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>${item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Cotizado" stroke="#8884d8" strokeWidth={4} />
          <Line type="monotone" dataKey="Vendido" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Cobrar" stroke="#ffc658" />
          <Line type="monotone" dataKey="Pagado" stroke="#ff8042" />
        </LineChart>
      </ResponsiveContainer> */}

      {/* <div className="list">
        <div className="list-item">
          <p className="title">Monto Cotizado</p>

          <p className="total">$200000</p>
        </div>

        <div className="list-item">
          <p className="title">Monto vendido</p>

          <p className="total">$200000</p>
        </div>

        <div className="list-item">
          <p className="title">Monto a Cobrar</p>

          <p className="total">$200000</p>
        </div>

        <div className="list-item">
          <p className="title">Monto Pagado</p>

          <p className="total">$200000</p>
        </div>
      </div> */}
    </MetricsAmountsStyled>
  );
}
