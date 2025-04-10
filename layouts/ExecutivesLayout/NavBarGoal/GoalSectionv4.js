import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";
import {
  TrendingUp,
  MonetizationOn,
  Group,
  AssignmentTurnedIn,
} from "@material-ui/icons";

const GoalsSection = () => {
  const goals = [
    {
      id: 1,
      name: "Ventas Mensuales",
      target: 100000,
      current: 75000,
      icon: <TrendingUp />,
      summary:
        "Falta un 25% para alcanzar la meta. Enfocarse en cerrar nuevas oportunidades.",
    },
    {
      id: 2,
      name: "Nuevos Clientes",
      target: 50,
      current: 32,
      icon: <Group />,
      summary:
        "Se necesitan 18 clientes más. Priorizar la prospección y el seguimiento.",
    },
    {
      id: 3,
      name: "Conversión Oportunidades",
      target: 30,
      current: 18,
      icon: <AssignmentTurnedIn />,
      summary:
        "La tasa de conversión está baja. Revisar el proceso de ventas y el seguimiento.",
    },
    {
      id: 4,
      name: "Ingresos Recurrentes",
      target: 50000,
      current: 42000,
      icon: <MonetizationOn />,
      summary:
        "A 8000 de la meta. Mantener el enfoque en renovaciones y upselling.",
    },
  ];

  return (
    <GoalsContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GoalsGrid>
        {goals.map((goal) => {
          const progress = Math.min(
            Math.round((goal.current / goal.target) * 100),
            100
          );
          const isCurrency =
            goal.name.includes("Ventas") || goal.name.includes("Ingresos");
          const currentValue = isCurrency
            ? `$${goal.current.toLocaleString()}`
            : goal.current;
          const targetValue = isCurrency
            ? `$${goal.target.toLocaleString()}`
            : goal.target;

          const data = [
            { name: "Completed", value: progress },
            { name: "Remaining", value: 100 - progress },
          ];
          const COLORS = [
            progress >= 80 ? "#48bb78" : progress >= 50 ? "#f6ad55" : "#a0aec0",
            "#4a5568",
          ];

          return (
            <GoalCard key={goal.id} layout>
              <GoalHeader>
                <GoalIcon>{goal.icon}</GoalIcon>
                <GoalName>{goal.name}</GoalName>
              </GoalHeader>
              <GoalChartContainer>
                <PieChart width={100} height={100}>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={30}
                    outerRadius={50}
                    fill="#8884d8"
                    startAngle={90}
                    endAngle={-270}
                    isAnimationActive={false}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <ProgressText>{progress}%</ProgressText>
              </GoalChartContainer>
              <GoalValues>
                <span>
                  {currentValue} / {targetValue}
                </span>
              </GoalValues>
              <GoalSummary>{goal.summary}</GoalSummary>
            </GoalCard>
          );
        })}
      </GoalsGrid>
    </GoalsContainer>
  );
};

export default GoalsSection;

// Estilos
const GoalsContainer = styled.div`
  background: #2a2f3a;
  padding: 20px 30px;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const GoalCard = styled(motion.div)`
  background: #343a46;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const GoalIcon = styled.div`
  color: #39b8df;
  svg {
    font-size: 24px;
  }
`;

const GoalName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const GoalChartContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #b0bec5;
`;

const GoalValues = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-bottom: 10px;
`;

const GoalSummary = styled.p`
  font-size: 14px;
  color: #b0bec5;
  text-align: center;
  margin-top: 10px;
`;
