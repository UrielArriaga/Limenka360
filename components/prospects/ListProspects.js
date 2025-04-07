import React from "react";
import CardProspect from "./CardProspect";

export default function ListProspects({ phase }) {
  return (
    <div className="containerPhase">
      <h2>{phase.name}</h2>
      {phase.prospects.map((prospect, index) => {
        return <CardProspect key={index} prospect={prospect} />;
      })}
    </div>
  );
}
