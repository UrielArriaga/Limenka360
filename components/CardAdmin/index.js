import { CallMade, CallReceived } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

import {device} from "../../styles/global.styles";
import { Grid } from "@material-ui/core";


export default function CardAdmin({
  total,
  title,
  percentaje,
  isUp,
  Icon,
}) {

  

  return (
    <CardResumeStyled>
    <Grid className="card"  >
    <div className="card-cointainer">
    <h6 className="title">{title}</h6>
    <h3 className="count"><span>{total}</span></h3>
    {isUp ? <CallMade className="call"/> : <CallReceived className="callfase"/>}
            {percentaje}%
    </div>
    <div className="card-icon">
      {Icon}  
    </div>
    </Grid>
    </CardResumeStyled>
  );
}

const CardResumeStyled = styled.div`
background-color: white;
width: 100%;
padding:8px;
margin-bottom:10px;
border-radius: 5px;
@media ${device.md} {
    background-color: white;
    width: 22%;
    padding: 12px;
}
    .card-cointainer {
    width: 75%;
}
.card {
    display: flex;
}
.title {
    color: inherit;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.1;
    font-size: .875rem;
    margin: 7px 0px 8px 0px;
}
.count {
    margin: 7px 0 7px 0px;
    font-size: 1.5rem;
}
.card-icon {
    height: 59px;
    width: 59px;
    border-radius: 50px;
    align-items: center;
    display: flex;
    color: white;
    align-content: center;
    justify-content: center;
    justify-items: center;
    margin-top: 16px;
    background: rgb(91,83,230);
background: linear-gradient(90deg, rgba(91,83,230,1) 0%, rgba(67,67,228,1) 56%, rgba(0,212,255,1) 100%);

svg {
font-weight:900;
font-size:2em;
}

}
.call {
    background: #0fd915;
    border-radius: 13px;
    font-size: 17px;
    color: white;
    text-align: center;
    margin-right: 6px;
    margin-top: 3px;
}
.callfase {
    background: red;
    border-radius: 13px;
    font-size: 17px;
    color: white;
    text-align: center;
    margin-right: 6px;
    margin-top: 3px;
}
`;
