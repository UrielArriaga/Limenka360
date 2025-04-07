import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";
import { validateIncludes, validateJoins } from "../../../../utils";
import CardGoalExecutivePage from "../../molecules/CardGoalExecutivePage";
import CardGoalManager from "../../molecules/CardGoalManager";
import CardGoalManagerEmpty from "../../molecules/CardGoalManagerEmpty";
import CarouselComponent from "../Carousel";
import MessageEmpty from "../MessageEmpty";
export default function GoalsExecutivePage({ startDate, finishDate, executive, periodDate, refetchData, goals }) {
  return (
    <GoalsExecutivePageStyled>
      <h3>Avance de metas</h3>
      <CarouselComponent renderChildren={true} time={5000}>
        {goals.length < 1 && (
          <MessageEmpty
            title={"Resumen de las metas"}
            subtitle={"No hay registros disponibles"}
            description={"Monitore los avances de tus grupos"}
            actionText={"Revisar ejecutivo para saber sus actividades"}
            action={console.log("log")}
          />
        )}
        {goals.map((item, index) => {
          return <CardGoalExecutivePage item={item} key={item.id} />;
        })}
      </CarouselComponent>
    </GoalsExecutivePageStyled>
  );
}

const GoalsExecutivePageStyled = styled.div`
  padding: 10px;
  height: 450px;
  border-radius: 8px;
  /* border: 1px solid #000; */
  background-color: #ffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h3 {
    margin-bottom: 20px;
  }
`;
