import React from "react";
import { SkeletonFeatureStyled } from "./styles";
import useSkeleton from "./hooks/useSkeleton";
import { Fade, Grid } from "@material-ui/core";

export default function ManagerGoals() {
  const { count, isOpenPreview } = useSkeleton();

  return (
    <SkeletonFeatureStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Pedidos <span>({count})</span>
          </h4>
        </div>
      </div>
      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            1
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9}>
                2
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </SkeletonFeatureStyled>
  );
}
