// import React from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { LinearProgress, Tooltip } from "@material-ui/core";
// import {
//   TrendingUp,
//   MonetizationOn,
//   Group,
//   AssignmentTurnedIn,
// } from "@material-ui/icons";

// export const GoalsSection = () => {
//   const goals = [
//     {
//       id: 1,
//       name: "Ventas Mensuales",
//       target: 100000,
//       current: 75000,
//       icon: <TrendingUp />,
//     },
//     {
//       id: 2,
//       name: "Nuevos Clientes",
//       target: 50,
//       current: 32,
//       icon: <Group />,
//     },
//     {
//       id: 3,
//       name: "Conversión Oportunidades",
//       target: 30,
//       current: 18,
//       icon: <AssignmentTurnedIn />,
//     },
//     {
//       id: 4,
//       name: "Ingresos Recurrentes",
//       target: 50000,
//       current: 42000,
//       icon: <MonetizationOn />,
//     },
//   ];

//   return (
//     <GoalsContainer
//       as={motion.div}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <SectionTitle>Mis Metas</SectionTitle>
//       <GoalsGrid>
//         {goals.map((goal) => {
//           const progress = Math.min(
//             Math.round((goal.current / goal.target) * 100),
//             100
//           );
//           const isCurrency =
//             goal.name.includes("Ventas") || goal.name.includes("Ingresos");
//           const currentValue = isCurrency
//             ? `$${goal.current.toLocaleString()}`
//             : goal.current;
//           const targetValue = isCurrency
//             ? `$${goal.target.toLocaleString()}`
//             : goal.target;

//           return (
//             <GoalCard key={goal.id} layout>
//               <GoalHeader>
//                 <GoalIcon>{goal.icon}</GoalIcon>
//                 <GoalName>{goal.name}</GoalName>
//               </GoalHeader>
//               <GoalValues>
//                 <span>{currentValue}</span>
//                 <span>/ {targetValue}</span>
//               </GoalValues>
//               <Tooltip title={`${progress}% completado`} arrow>
//                 <ProgressContainer>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     color={
//                       progress >= 80
//                         ? "primary"
//                         : progress >= 50
//                         ? "secondary"
//                         : "inherit"
//                     }
//                   />
//                   <ProgressText>{progress}%</ProgressText>
//                 </ProgressContainer>
//               </Tooltip>
//             </GoalCard>
//           );
//         })}
//       </GoalsGrid>
//     </GoalsContainer>
//   );
// };

// // Estilos
// const GoalsContainer = styled.div`
//   background: #2a2f3a;
//   padding: 20px 30px;
//   color: white;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// const SectionTitle = styled.h3`
//   margin: 0 0 20px 0;
//   font-size: 16px;
//   font-weight: 500;
//   color: #39b8df;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const GoalsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 20px;
// `;

// const GoalCard = styled(motion.div)`
//   background: #343a46;
//   border-radius: 8px;
//   padding: 15px;
//   transition: all 0.3s ease;
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//   }
// `;

// const GoalHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 15px;
// `;

// const GoalIcon = styled.div`
//   color: #39b8df;
//   svg {
//     font-size: 22px;
//   }
// `;

// const GoalName = styled.div`
//   font-size: 14px;
//   font-weight: 500;
// `;

// const GoalValues = styled.div`
//   display: flex;
//   align-items: baseline;
//   gap: 5px;
//   margin-bottom: 10px;
//   span:first-child {
//     font-size: 20px;
//     font-weight: 600;
//     color: white;
//   }
//   span:last-child {
//     font-size: 14px;
//     color: #b0bec5;
//   }
// `;

// const ProgressContainer = styled.div`
//   position: relative;
//   margin-top: 8px;
// `;

// const ProgressText = styled.div`
//   position: absolute;
//   right: 0;
//   top: -20px;
//   font-size: 12px;
//   color: #b0bec5;
// `;

// import React from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { TrendingUp } from "@material-ui/icons";

// const GoalsSection = ({ goals }) => {
//   return (
//     <GoalsWrapper
//       as={motion.div}
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h2>Metas de Ventas</h2>
//       <GoalsList>
//         {goals.map((goal) => (
//           <GoalItem key={goal.id}>
//             <GoalTitle>
//               <TrendingUp style={{ marginRight: "8px", color: "#39b8df" }} />
//               {goal.title}
//             </GoalTitle>
//             <GoalProgress>
//               <span>
//                 {goal.current}/{goal.target}
//               </span>
//               <ProgressBar progress={(goal.current / goal.target) * 100} />
//             </GoalProgress>
//             <GoalChart>
//               <ResponsiveContainer width="100%" height={80}>
//                 <LineChart data={goal.chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" hide />
//                   <YAxis hide />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#39b8df"
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </GoalChart>
//           </GoalItem>
//         ))}
//       </GoalsList>
//     </GoalsWrapper>
//   );
// };

// export default GoalsSection;

// const GoalsWrapper = styled(motion.div)`
//   background: #2c3038;
//   color: white;
//   padding: 20px;
//   border-radius: 8px;
//   margin-bottom: 20px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

//   h2 {
//     font-size: 1.2rem;
//     margin-bottom: 15px;
//   }
// `;

// const GoalsList = styled.div`
//   display: flex;
//   gap: 20px;
//   overflow-x: auto;
// `;

// const GoalItem = styled.div`
//   background: #3a3f48;
//   padding: 15px;
//   border-radius: 6px;
//   min-width: 250px;
//   flex: 0 0 auto;
// `;

// const GoalTitle = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 1rem;
//   margin-bottom: 10px;
// `;

// const GoalProgress = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 10px;
// `;

// const ProgressBar = styled.div`
//   width: 60%;
//   height: 8px;
//   background: #4a505a;
//   border-radius: 4px;
//   position: relative;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: ${(props) => props.progress}%;
//     height: 100%;
//     background: #39b8df;
//     border-radius: 4px;
//   }
// `;

// const GoalChart = styled.div`
//   width: 100%;
// `;

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "@material-ui/icons";

const GoalsSectionCompact = ({ goals }) => {
  return (
    <GoalsWrapper
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Metas</h2>
      <GoalsGrid>
        {goals.map((goal) => (
          <GoalCard key={goal.id}>
            <GoalHeader>
              <TrendingUp style={{ marginRight: "8px", color: "#39b8df" }} />
              <span>{goal.title}</span>
            </GoalHeader>
            <GoalChart>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={goal.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#39b8df" />
                </BarChart>
              </ResponsiveContainer>
            </GoalChart>
            <GoalFooter>
              <span>
                {goal.current}/{goal.target}
              </span>
            </GoalFooter>
          </GoalCard>
        ))}
      </GoalsGrid>
    </GoalsWrapper>
  );
};

export default GoalsSectionCompact;

const GoalsWrapper = styled(motion.div)`
  background: #2c3038;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const GoalCard = styled.div`
  background: #3a3f48;
  padding: 15px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const GoalChart = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const GoalFooter = styled.div`
  text-align: right;
  font-size: 0.9rem;
  margin-top: 10px;
`;
