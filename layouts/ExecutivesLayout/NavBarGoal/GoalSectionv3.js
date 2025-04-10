import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <GoalsContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel responsive={responsive} infinite={true} autoPlay={false}>
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
              <GoalProgress>
                <ProgressBar progress={progress} />
                <ProgressText>{progress}%</ProgressText>
              </GoalProgress>
              <GoalValues>
                <span>
                  {currentValue} / {targetValue}
                </span>
              </GoalValues>
            </GoalCard>
          );
        })}
      </Carousel>
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

const GoalCard = styled(motion.div)`
  background: #343a46;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  margin: 0 10px; // Espacio entre las tarjetas en el carrusel
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

const GoalProgress = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #4a5568;
  border-radius: 5px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: ${(props) =>
      props.progress >= 80
        ? "#48bb78"
        : props.progress >= 50
        ? "#f6ad55"
        : "#a0aec0"};
    transition: width 0.3s ease;
  }
`;

const ProgressText = styled.div`
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 14px;
  color: #b0bec5;
`;

const GoalValues = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-align: center;
`;
