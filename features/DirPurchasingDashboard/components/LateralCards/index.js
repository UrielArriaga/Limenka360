import React from "react";
import { StyledCard, ContainerStyles } from "../LateralCards/styles";
import { FiberSmartRecord, ListAlt } from "@material-ui/icons";
import { Skeleton } from "@mui/material";

export default function LateralCards({ dataAllProducts, dataOrders, countOrders, peddinsData }) {
  const cardsData = [
    {
      title: "Proximas llegadas",
      description: "Descripción de la tarjeta 1",
      cant: dataAllProducts?.count?.toFixed(1),
      icon: FiberSmartRecord,
      iconColor: "#80dfe6",
      backgroundColor: "#e2f7f8",
      fetching: dataAllProducts?.isFetching,
    },
    {
      title: "Garantias",
      description: "Descripción de la tarjeta 2",
      cant: dataOrders?.count,
      icon: ListAlt,
      iconColor: "#f1a472",
      backgroundColor: "#f7e3d7",
      fetching: dataOrders?.isFetching,
    },
    {
      title: "Ordenes",
      description: "Descripción de la tarjeta 3",
      cant: countOrders?.count,
      icon: ListAlt,
      iconColor: "#3c8219",
      backgroundColor: "#daf4cf",
      fetching: dataOrders?.isFetching,
    },

    {
      title: "Pendientes",
      description: "Descripción de la tarjeta 3",
      cant: peddinsData?.count,
      icon: ListAlt,
      iconColor: "#3c8219",
      backgroundColor: "#daf4cf",
      fetching: dataOrders?.isFetching,
    },
  ];

  return (
    <ContainerStyles>
      {cardsData.map((card, index) => (
        <StyledCard key={index} style={{ borderBottom: `4px solid ${card?.iconColor}` }}>
          <div className="content_des">
            <div className="content_icon">
              <div className="d_icon" style={{ backgroundColor: card?.backgroundColor }}>
                <card.icon className="icon" style={{ color: card?.iconColor }} />
              </div>
            </div>
            <div className="title">
              <b>{card.title}</b>
              {card?.fetching === true ? <Skeleton variant="rounded" width={210} height={40} /> : <h2>{card.cant}</h2>}
            </div>
          </div>

          {/* <div className="content_des">
            <p></p>
          </div> */}
        </StyledCard>
      ))}
    </ContainerStyles>
  );
}
