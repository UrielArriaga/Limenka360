// Ejemplo de uso
// <PaginationWithText
//   total={orderCount}
//   actualPage={orderTablePage}
//   setActualPage={setOrderTablePage}
//   totalPages={Math.ceil(orderCount / orderTableLimit)}
//   text={"Responsables: "} (Opcional)
// />;

import React from "react";
import styled from "styled-components";
import { Pagination } from "@material-ui/lab";

export default function PaginationWithText({ total, actualPage, setActualPage, totalPages, text }) {
  return (
    <PaginationStyle>
      {text ? (
        <p>{`${text} ${total} Página: ${actualPage} - ${totalPages}`}</p>
      ) : (
        <p>{`Página: ${actualPage} - ${totalPages}`}</p>
      )}
      <Pagination
        style={{ display: "flex", justifyContent: "center" }}
        onChange={(e, page) => setActualPage(page)}
        page={actualPage}
        shape="rounded"
        count={totalPages}
        color="primary"
      />
    </PaginationStyle>
  );
}

const PaginationStyle = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-top: 10px;

  p {
    text-align: right;
  }
`;
