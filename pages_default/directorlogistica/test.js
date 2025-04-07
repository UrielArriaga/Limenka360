import styled from "styled-components";

import React from "react";
import DirLogLayout from "../../layouts/DirLogLayout";

export default function Test() {
  return (
    <DirLogLayout>
      <Container>
        <div className="header">
          <div className="header__title">
            <h4>Pedidos</h4>
          </div>
        </div>

        <div className="main">
          {[...Array(100).keys()].map((item, index) => {
            return (
              <div>
                <p>{index}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </DirLogLayout>
  );
}

const Container = styled.div`
  /* border: 1px solid red; */
  height: calc(100vh - 50px);
  background-color: #fff59d;
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    background-color: #ef9a9a;
    /* flex-shrink: 0; */
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        color: #616161;
      }
    }
  }

  .main {
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    max-height: 700px;
    overflow: scroll;
    /* border: 1px solid green; */
    /* height: calc(100vh - 50px); */
    background-color: #80cbc4;
  }
`;
