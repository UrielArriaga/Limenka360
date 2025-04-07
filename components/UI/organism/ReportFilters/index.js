import React from "react";
import styled from "styled-components";

export default function ReportFilters() {
  return (
    <Container>
      <div className="input_container">
        <label htmlFor="">Por Categoria</label>
        <input type="text" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px 20px;
  background-color: #fff;

  .input_container {
    width: 20%;
    display: flex;
    flex-direction: column;
  }
`;
