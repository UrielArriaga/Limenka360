import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import styled from "styled-components";
import { LoaderStyle } from "../../../PreviewProspect/style";
import { LinearProgress } from "@material-ui/core";
import LoaderPreview from "../../../LoaderPreviews";
import EmptyData from "../../../PreviewEmpty";
const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function TimeLinePrewiew({ trackings, fetching }) {
  const classes = useStyles();
  if (fetching) return <LoaderPreview />;
  if (trackings?.length <= 0) return <EmptyData />;
  return (
    <TimeLinePrewiewStyled>
      <Timeline align="alternate">
        {trackings.map((item, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(item.createdAt).format("MMMM D, YYYY	")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  {/* <FastfoodIcon /> */}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className="cardcontent">
                  <p className="txtcard reason">
                    <span className="titlecard">Asunto</span> {item.reason}
                  </p>
                  <p className="txtcard observations">
                    <span className="titlecard">Observaciones :</span>
                    {item.observations}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </TimeLinePrewiewStyled>
  );
}

// import React from "react";

// export default function TimeLinePrewiew({ trackings }) {

//   return <div>TimeLinePrewiew</div>;
// }

const TimeLinePrewiewStyled = styled.div`
  .cardcontent {
    padding: 10px;
    position: relative;
    box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;

    .titlecard {
      font-weight: bold;
      font-size: 12px;
    }

    .txtcard {
      color: #616161;
    }
  }
`;
