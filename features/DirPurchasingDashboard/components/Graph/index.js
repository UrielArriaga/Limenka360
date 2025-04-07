import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Graph({providerData}) {
  let newds = providerData?.slice(0, 15);
  const data = newds?.map(item => ({
    name: item.name || "Unknown", 
    uv: item.national ? 1 : 0, 
    pv: item.system ? 1 : 0, 
  }));

  return (
    <div style={{ padding: "10px", width:"40%" }}>
      <h2 style={{ marginBottom: "20px" }}>Proveedores</h2>
      <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
        <ResponsiveContainer width={"100%"} height={500}>
          <LineChart
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
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
