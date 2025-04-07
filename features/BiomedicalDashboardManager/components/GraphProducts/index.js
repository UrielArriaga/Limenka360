import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function GraphProducts() {
  const data = [
    {
      name: "Articulos",
      Completados: 4000,
      ["No Completados"]: 2400,
      Encontrados: 2900,
    },
  ];
  return (
    <div style={{ width: "100%", height: "450px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completados" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="No Completados" fill="#C70039" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar dataKey="Encontrados" fill="#ebee0f" activeBar={<Rectangle fill="gold" stroke="red" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphProducts;
