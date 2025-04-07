import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import styled from "styled-components";

export default function LoaderGoals() {
  const [skeletonArray] = useState([1, 2, 3, 4, 5]);
  return (
    <Card>
      {skeletonArray.map((item, index) => {
        return (
          <div key={index}>
            <Grid container className="" spacing={1}>
              <Grid item md={3} style={{ marginBottom: 10 }}>
                <Skeleton variant="text" />
              </Grid>

              <Grid item md={3}>
                <Skeleton variant="text" />
              </Grid>
              <Grid item md={3}>
                <Skeleton variant="text" />
              </Grid>

              <Grid item md={3}>
                <Skeleton variant="text" />
              </Grid>
            </Grid>
            <div className="divider"></div>
          </div>
        );
      })}
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  background-color: #ffff;
  height: 100%;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffff;
`;
