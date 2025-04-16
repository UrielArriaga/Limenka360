// TODO 4
import React from "react";
import styled from "styled-components";

export default function ExecutiveGoalsProgress({ data }) {
  const generateRandomGoals = () => {
    const goalNames = [
      "Ventas",
      "Cotizaciones",
      "Ultrasonidos",
      "Seguimientos",
    ];
    return Array.from({ length: 5 }, (_, i) => ({
      goal: { alias: goalNames[i] || `Goal ${i + 1}` },
      progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
      finalgoal: 100,
      _id: `goal-${i + 1}`,
    }));
  };

  let results = generateRandomGoals();

  return (
    <ExecutiveGoalsProgressStyled>
      {results?.length >= 1 && <h4>Metas asignadas</h4>}
      {results?.length === 0 && <h4>No hay metas asignadas</h4>}
      <div className="goals-container">
        {results.length === 0 &&
          [1, 2, 3].map((_, i) => (
            <HorizontalGoal
              key={i}
              goalData={{
                goal: { alias: "Meta" },
                progress: 0,
                finalgoal: 100,
              }}
            />
          ))}
        {results.map((goal) => (
          <HorizontalGoal key={goal._id} goalData={goal} />
        ))}
      </div>
    </ExecutiveGoalsProgressStyled>
  );
}

const ExecutiveGoalsProgressStyled = styled.div`
  width: 90%;
  padding: 10px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

  .goals-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const Bar = styled.div`
  background: #e5e5e5;
  height: 14px;
  border-radius: 7px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  background: ${(props) => (props.percent >= 100 ? "#4caf50" : "#39B8DF")};
  width: ${(props) => props.percent}%;
  transition: width 0.3s;
`;

const HorizontalGoal = ({ goalData }) => {
  const percent = Math.min(goalData.progress / goalData.finalgoal, 1) * 100;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{goalData?.goal?.alias}</span>
        <span>
          {goalData.progress}/{goalData.finalgoal}
        </span>
      </div>
      <Bar>
        <Fill percent={percent} />
      </Bar>
    </div>
  );
};

// TODO 3
// import React from "react";
// import styled from "styled-components";
// import { Typography, Box, LinearProgress } from "@material-ui/core";
// import { CheckCircle, ArrowForward, HourglassEmpty } from "@material-ui/icons";

// export default function ExecutiveGoalsProgress({ data }) {
//   const generateRandomGoals = () => {
//     const goalNames = [
//       "Ventas",
//       "Cotizaciones",
//       "Ultrasonidos",
//       "Seguimientos",
//     ];
//     return Array.from({ length: 5 }, (_, i) => ({
//       goal: { alias: goalNames[i] || `Goal ${i + 1}` },
//       progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
//       finalgoal: 100,
//       _id: `goal-${i + 1}`,
//     }));
//   };

//   let results = generateRandomGoals();

//   return (
//     <ExecutiveGoalsProgressStyled>
//       <Typography variant="h6" gutterBottom>
//         {results?.length >= 1 ? "Metas asignadas" : "No hay metas asignadas"}
//       </Typography>
//       <div className="goals-container">
//         {results.length === 0 &&
//           [1, 2, 3].map((_, i) => (
//             <HorizontalGoal
//               key={i}
//               goalData={{
//                 goal: { alias: "Meta" },
//                 progress: 0,
//                 finalgoal: 100,
//               }}
//             />
//           ))}
//         {results.map((goal) => (
//           <HorizontalGoal key={goal._id} goalData={goal} />
//         ))}
//       </div>
//     </ExecutiveGoalsProgressStyled>
//   );
// }

// const ExecutiveGoalsProgressStyled = styled.div`
//   width: 90%;
//   padding: 10px;
//   max-height: calc(100vh - 200px);
//   overflow-y: auto;
//   box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
//     rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

//   .goals-container {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//   }
// `;

// const HorizontalGoal = ({ goalData }) => {
//   const percent = Math.min((goalData.progress / goalData.finalgoal) * 100, 100);

//   // Deciding the icon based on the goal's progress
//   const Icon =
//     percent === 100 ? CheckCircle : percent > 0 ? ArrowForward : HourglassEmpty;

//   return (
//     <Box display="flex" flexDirection="column" gap={2}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="body1">{goalData?.goal?.alias}</Typography>
//         <Typography variant="body2" color="textSecondary">
//           {goalData.progress}/{goalData.finalgoal}
//         </Typography>
//       </Box>

//       <Box display="flex" alignItems="center" gap={2}>
//         <Icon
//           fontSize="small"
//           color={percent === 100 ? "primary" : "inherit"}
//         />
//         <Box flex={1}>
//           <LinearProgress
//             variant="determinate"
//             value={percent}
//             // color={percent === 100 ? "primary" : "secondary"}
//             style={{ borderRadius: 8, height: 8 }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// TODO 2

// import React from "react";
// import styled from "styled-components";

// export default function ExecutiveGoalsProgress({ data }) {
//   const generateRandomGoals = () => {
//     const goalNames = [
//       "Ventas",
//       "Cotizaciones",
//       "Ultrasonidos",
//       "Seguimientos",
//     ];
//     return Array.from({ length: 5 }, (_, i) => ({
//       goal: { alias: goalNames[i] || `Goal ${i + 1}` },
//       progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
//       finalgoal: 100,
//       _id: `goal-${i + 1}`,
//     }));
//   };

//   let results = generateRandomGoals();

//   return (
//     <ExecutiveGoalsProgressStyled>
//       {results?.length >= 1 && <h4>Metas asignadas</h4>}
//       {results?.length === 0 && <h4>No hay metas asignadas</h4>}
//       <div className="goals-container">
//         {results.length === 0 &&
//           [1, 2, 3].map((_, i) => (
//             <HorizontalGoal
//               key={i}
//               goalData={{
//                 goal: { alias: "Meta" },
//                 progress: 0,
//                 finalgoal: 100,
//               }}
//             />
//           ))}
//         {results.map((goal) => (
//           <HorizontalGoal key={goal._id} goalData={goal} />
//         ))}
//       </div>
//     </ExecutiveGoalsProgressStyled>
//   );
// }

// const ExecutiveGoalsProgressStyled = styled.div`
//   width: 90%;
//   padding: 10px;
//   max-height: calc(100vh - 200px);
//   overflow-y: auto;
//   box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
//     rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

//   .goals-container {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//   }
// `;

// const Bar = styled.div`
//   background: #e5e5e5;
//   height: 14px;
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const Fill = styled.div`
//   height: 100%;
//   background: ${(props) => (props.percent >= 100 ? "#4caf50" : "#39B8DF")};
//   width: ${(props) => props.percent}%;
//   transition: width 0.3s;
// `;

// const HorizontalGoal = ({ goalData }) => {
//   const percent = Math.min(goalData.progress / goalData.finalgoal, 1) * 100;

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <span>{goalData?.goal?.alias}</span>
//         <span>
//           {goalData.progress}/{goalData.finalgoal}
//         </span>
//       </div>
//       <Bar>
//         <Fill percent={percent} />
//       </Bar>
//     </div>
//   );
// };

// TODO 1

// import { colors } from "@material-ui/core";
// import React from "react";

// import { PieChart, Pie, Cell } from "recharts";
// import styled from "styled-components";
// const COLORS = ["#39B8DF", "#E5E5E5"];

// export default function ExecutiveGoalsProgress({ data }) {
//   const { results = [] } = data;
//   return (
//     <ExecutiveGoalsProgressStyled>
//       {results?.length >= 1 && <h4>Metas asignadas</h4>}
//       {results?.length === 0 && <h4>No hay metas asignadas</h4>}
//       <div className="goals-container">
//         {results?.length === 0 &&
//           [1, 2, 3].map((goal, index) => {
//             return (
//               <GaugeChart
//                 key={index}
//                 goalData={{
//                   goal: {
//                     alias: "",
//                   },
//                   progress: 0,
//                   finalgoal: 100,
//                 }}
//               />
//             );
//           })}

//         {results.map((goal) => {
//           return <GaugeChart key={goal._id} goalData={goal} />;
//         })}
//       </div>
//       {/* <GaugeChart />
//       <GaugeChart />
//       <GaugeChart /> */}
//     </ExecutiveGoalsProgressStyled>
//   );
// }

// const ExecutiveGoalsProgressStyled = styled.div`
//   width: 90%;
//   box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
//     rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
//   padding: 10px;
//   max-height: calc(100vh - 200px);
//   overflow-y: auto;

//   ::-webkit-scrollbar {
//     width: 6px;
//     height: 6px;
//   }
//   ::-webkit-scrollbar-track {
//     -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
//   }
//   ::-webkit-scrollbar-thumb {
//     -webkit-box-shadow: inset 0 0 20px ${colors.primaryColor};
//   }
//   .goals-container {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const GaugeChartStyled = styled.div`
//   position: relative;
//   /* width: 400px; */
//   width: 100%;
//   /* height: 230px; */

//   /* box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; */

//   padding: 10px;
//   h4 {
//     margin-bottom: 30px;
//   }

//   .progress {
//     width: 100%;
//     height: 10px;
//     position: absolute;
//     top: 160px;
//   }

//   .progress-bar {
//     width: 50%;
//     height: 10px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: space-between;

//     span {
//       font-size: 12px;
//       color: #000;
//     }
//   }
// `;

// const GaugeChart = ({ goalData }) => {
//   const progress = Math.min(goalData.progress / goalData.finalgoal, 1) * 100;
//   const remaining = 100 - progress;

//   const data = [
//     { name: "Progress", value: progress },
//     { name: "Remaining", value: remaining },
//   ];
//   return (
//     <GaugeChartStyled
//       style={{ position: "relative", width: "400px", height: "230px" }}
//     >
//       <h5
//         style={{
//           marginBottom: 30,
//           color: "#616161",
//         }}
//       >
//         {goalData?.goal?.alias}
//       </h5>
//       <PieChart width={400} height={200}>
//         <Pie
//           data={data}
//           startAngle={180}
//           endAngle={0}
//           innerRadius={60}
//           outerRadius={90}
//           dataKey="value"
//         >
//           {data.map((entry, index) => {
//             return (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             );
//           })}
//         </Pie>
//       </PieChart>

//       <div className="progress">
//         <div className="progress-bar">
//           <span>{0}</span>
//           <span
//             style={{
//               fontWeight: "bold",
//               fontSize: 25,
//             }}
//           >
//             {goalData.progress}
//           </span>
//           <span>{goalData.finalgoal}</span>
//         </div>
//       </div>
//     </GaugeChartStyled>
//   );
// };
