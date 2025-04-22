import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LinearProgress, Tooltip } from "@material-ui/core";
import {
  TrendingUp,
  MonetizationOn,
  Group,
  AssignmentTurnedIn,
} from "@material-ui/icons";

const GoalsSection = ({ setShowGoal }) => {
  const goals = [
    {
      id: 1,
      name: "Ventas Mensuales",
      target: 100000,
      current: 75000,
      icon: <TrendingUp />,
    },
    {
      id: 2,
      name: "Nuevos Clientes",
      target: 50,
      current: 32,
      icon: <Group />,
    },
    {
      id: 3,
      name: "Conversión Oportunidades",
      target: 30,
      current: 18,
      icon: <AssignmentTurnedIn />,
    },
    {
      id: 4,
      name: "Ingresos Recurrentes",
      target: 50000,
      current: 42000,
      icon: <MonetizationOn />,
    },
  ];

  return (
    <GoalsContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GoalHeader>
        <h2>Mis Metas</h2>

        <button onClick={() => setShowGoal(false)}>Cerrar</button>
      </GoalHeader>
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

          return (
            <GoalCard key={goal.id} layout>
              <GoalHeader>
                <GoalIcon>{goal.icon}</GoalIcon>
                <GoalName>{goal.name}</GoalName>
              </GoalHeader>
              <GoalValues>
                <span>{currentValue}</span>
                <span>/ {targetValue}</span>
              </GoalValues>
              <Tooltip title={`${progress}% completado`} arrow>
                <ProgressContainer>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    color={
                      progress >= 80
                        ? "primary"
                        : progress >= 50
                        ? "secondary"
                        : "inherit"
                    }
                    style={{
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          progress >= 80
                            ? "#66bb6a"
                            : progress >= 50
                            ? "#ffca28"
                            : "#9e9e9e",
                      },
                    }}
                  />
                  <ProgressText>{progress}%</ProgressText>
                </ProgressContainer>
              </Tooltip>
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
  background: #f0f4f8;
  padding: 20px 30px;
  color: #333333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const GoalCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  h2 {
    font-size: 18px;

    font-weight: 600;
    color: #333333;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: #ff1744;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #d50000;
    }
  }
`;

const GoalIcon = styled.div`
  color: #42a5f5;
  svg {
    font-size: 22px;
  }
`;

const GoalName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const GoalValues = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 10px;
  span:first-child {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }
  span:last-child {
    font-size: 14px;
    color: #777777;
  }
`;

const ProgressContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const ProgressText = styled.div`
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 12px;
  color: #777777;
`;
