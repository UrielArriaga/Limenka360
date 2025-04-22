import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { GaugeChartStyled } from "./styled";

const COLORS = ["#39B8DF", "#E5E5E5"];

const GaugeChart = ({ goalData }) => {
  const progress = Math.min(goalData.progress / goalData.finalgoal, 1) * 100;
  const remaining = 100 - progress;

  const data = [
    { name: "Progress", value: progress },
    { name: "Remaining", value: remaining },
  ];
  return (
    <GaugeChartStyled style={{ position: "relative", width: "400px", height: "230px" }}>
      <h5

        style={{
          marginBottom: 30,
          color: "#616161"
        }}
      >
        {goalData?.goal?.alias}
      </h5>
      <PieChart width={400} height={200}>
        <Pie data={data} startAngle={180} endAngle={0} innerRadius={60} outerRadius={90} dataKey="value">
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
          })}
        </Pie>
      </PieChart>

      <div className="progress">
        <div className="progress-bar">
          <span>{0}</span>
          <span
            style={{
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {goalData.progress}
          </span>
          <span>{goalData.finalgoal}</span>
        </div>
      </div>
    </GaugeChartStyled>
  );
};

export default GaugeChart;
