import React from "react";
import GaugeChart from "./GaugeChart";
import { ExecutiveGoalsProgressStyled } from "./styled";

export default function ExecutiveGoalsProgress({ data }) {
  const { results = [] } = data;
  return (
    <ExecutiveGoalsProgressStyled>
      {results?.length >= 1 && <h4>Metas asignadas</h4>}
      {results?.length === 0 && <h4>No hay metas asignadas</h4>}
      <div className="goals-container">
        {results?.length === 0 &&
          [1, 2, 3].map((goal, index) => {
            return (
              <GaugeChart
                key={index}
                goalData={{
                  goal: {
                    alias: "",
                  },
                  progress: 0,
                  finalgoal: 100,
                }}
              />
            );
          })}

        {results.map(goal => {
          return <GaugeChart key={goal._id} goalData={goal} />;
        })}
      </div>
      {/* <GaugeChart />
      <GaugeChart />
      <GaugeChart /> */}
    </ExecutiveGoalsProgressStyled>
  );
}
