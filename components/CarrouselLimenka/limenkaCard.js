import React from "react";
import styled from "styled-components";
import { device } from "../../styles/global.styles";

export default function ChangesCard({ showNoData, item }) {
  if (item) {
    return (
      <ContainerCard>
        <div className="title">{item.title} </div>

        <div className="flex">
          <img className="img" src={item.img} />
          <p>{item.message}</p>
        </div>
      </ContainerCard>
    );
  }
}

const ContainerCard = styled.div`
  border-radius: 10px;
  padding: 5px 5px;
  position: relative;
  height: 67vh;
  width: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: #417afe;
  display: flex;
  flex-direction: row;

  .title {
    color: #fff;
    font-weight: bold;
    margin-block-end: 2%;
    font-size: 24px;
    position: absolute;
    top: 6%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px 2px;
    margin-right: 9%;
    .img {
      display: flex;
      height: 58vh;
      width: 110%;
      margin: auto;
    }
    p {
      /* text-transform: capitalize; */
      color: #fff;
      font-size: 20px;
      margin-top: 1%;
      display: flex;
      align-items: center;

      @media ${device.xxl} {
        font-size: 15px;
        display: flex;
        align-items: center;
        padding: 5px;
      }
    }
    svg {
      color: #fff;
    }
  }

  .actions {
    button {
      cursor: pointer;
      margin-top: 20px;
      margin-left: 2px;
      width: 100%;
      background-color: #fec541;
      font-weight: bold;
      color: #fff;
      padding: 5px 10px;
      border-width: 0px;
    }
  }
`;
