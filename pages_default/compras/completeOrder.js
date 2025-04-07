import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";

function CompleteOrder({ seeCompleteOrder, setSeeCompleteOrder }) {
  return (
    <CompleteOrderStyled>
      <div className="title_information_orders">
        <ArrowBackIcon className="arrowback" onClick={() => setSeeCompleteOrder({ ...seeCompleteOrder, state: false })} />
        <h2>Información de pedido</h2>
      </div>
    </CompleteOrderStyled>
  );
}

export default CompleteOrder;

const CompleteOrderStyled = styled.div`
  .title_information_orders {
    display: grid;
    grid-template-columns: 40px auto;

    .arrowback{
        margin-top: 6px;
    }
  }
`;
