import React from "react";
import { LimenkaNotificationCenterStyled } from "./styles";
import { Fade, Grid } from "@material-ui/core";
import useMain from "./hooks/useMain";

export default function LimenkaNotificationCenter() {
  const { count, isOpenPreview } = useMain();

  return (
    <LimenkaNotificationCenterStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Notificaciones <span>({count})</span>
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
    </LimenkaNotificationCenterStyled>
  );
}
