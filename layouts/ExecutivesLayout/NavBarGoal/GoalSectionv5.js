import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";

const COLORS = ["#39B8DF", "#E5E5E5"];

const GaugeChart = ({ goalData }) => {
  const progress = Math.min(goalData.progress / goalData.finalgoal, 1) * 100;
  const remaining = 100 - progress;

  const data = [
    { name: "Progress", value: progress },
    { name: "Remaining", value: remaining },
  ];

  return (
    <GaugeChartStyled>
      <GoalName>{goalData?.goal?.alias}</GoalName>
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <ProgressValues>
        {goalData.progress} / {goalData.finalgoal}
      </ProgressValues>
      <GoalSummary>{goalData.summary || "Sin resumen disponible"}</GoalSummary>
    </GaugeChartStyled>
  );
};

const GaugeChartStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  margin: 10px;
`;

const GoalName = styled.h5`
  margin-bottom: 10px;
  color: #616161;
  font-size: 16px;
  font-weight: 500;
`;

const ProgressValues = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-top: 10px;
`;

const GoalSummary = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: 10px;
  text-align: center;
`;

export default function GoalsSection({ useDummyData = false }) {
  const dummyData = {
    results: [
      {
        _id: "dummy1",
        goal: { alias: "Meta de Ejemplo 1" },
        progress: 50,
        finalgoal: 100,
        summary: "Esto es un resumen de ejemplo.",
      },
      {
        _id: "dummy2",
        goal: { alias: "Meta de Ejemplo 2" },
        progress: 80,
        finalgoal: 100,
        summary: "Otro resumen de ejemplo aquí.",
      },
      {
        _id: "dummy3",
        goal: { alias: "Meta de Ejemplo 3" },
        progress: 20,
        finalgoal: 100,
        summary: "Un tercer resumen para ilustrar.",
      },
    ],
  };

  const goalsData = dummyData;
  const { results = [] } = goalsData || {};

  return (
    <ExecutiveGoalsProgressStyled>
      {results?.length >= 1 && <h4>Metas asignadas</h4>}
      {results?.length === 0 && <h4>No hay metas asignadas</h4>}
      <GoalsContainer>
        {results?.map((goal) => (
          <GaugeChart key={goal._id} goalData={goal} />
        ))}
      </GoalsContainer>
    </ExecutiveGoalsProgressStyled>
  );
}

const ExecutiveGoalsProgressStyled = styled.div`
  width: 90%;
  padding: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #39b8df;
  }
`;

const GoalsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;
