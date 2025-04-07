import { Button, IconButton, Paper } from "@material-ui/core";
import { Cached, FiberManualRecord, LibraryAdd, Today } from "@material-ui/icons";
import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { formatDate } from "../../../../utils";
import ModalTracking from "../ModalTracking";
import useTrackings from "./hooks/useTrackings";
import TimeLinePrewiew from "../TimeLinePrewiew";

export default function InfoTrackings(props) {
  const { orderData, trackingsData, refreshTrackings } = props;
  const { showAddTracking, handleCloseTracking, handleOpenTracking } = useTrackings();

  return (
    <TrackingStyle>
      <div className="head">
        <p className="title_tracking">Seguimientos Recientes</p>
        <IconButton className="bt" onClick={() => handleOpenTracking()}>
          <LibraryAdd />
        </IconButton>
        <IconButton className="bt" onClick={() => refreshTrackings()}>
          <Cached />
        </IconButton>
      </div>
      <div className="container_tracks">
        <TimeLinePrewiew trackings={trackingsData.trackings} fetching={trackingsData?.isFetching} />
      </div>
      <ModalTracking
        orderData={orderData}
        open={showAddTracking}
        close={handleCloseTracking}
        refreshTrackings={refreshTrackings}
      />
    </TrackingStyle>
  );
}

const TrackingStyle = styled.div`
  margin-bottom: 30px;
  .head {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .title_tracking {
      font-size: 16px;
      font-weight: 500;
    }
    .bt {
      margin-left: 5px;
      height: 20px;
      width: 20px;
      border-radius: 5px;
      margin-bottom: -3px;
      svg {
        font-size: 18px;
        color: ${colors.primaryColorDark};
      }
    }
  }
  .container_tracks {
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: center;
    height: 400px;
    width: 100%;
    padding: 5px 1px;
  }
`;

const CardTrack = styled(Paper)`
  min-width: 320px;
  max-height: 210px;
  padding: 10px;
  margin-right: 10px;
  .head {
    display: flex;
    justify-content: space-between;
    color: ${colors.primaryColorDark};
    margin-bottom: 10px;
    .title {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 13px;
      svg {
        font-size: 14px;
      }
    }
    .date {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 13px;
      svg {
        font-size: 14px;
      }
    }
  }
  .body {
    .title {
      font-weight: 500;
      font-size: 13px;
    }
    .data {
      font-size: 15px;
    }
  }
`;
