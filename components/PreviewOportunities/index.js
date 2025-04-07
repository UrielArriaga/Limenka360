import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Box, LinearProgress } from "@material-ui/core";
import { colors } from "../../styles/global.styles";
import { AttachMoney, Event, PinDrop } from "@material-ui/icons";
import dayjs from "dayjs";
import { formatNumberNoSymbol } from "../../utils";

// #region constants

// #endregion

// #region styled-components
const PreviewOportunitiesStyle = styled.div`
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #0c203b;
  }

  .card {
    .title {
      font-size: 12px;
      color: grey;
    }
    .data {
      font-size: 14px;
      font-weight: 500;
    }
    .observations {
      width: 100%;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
      resize: vertical;
      outline: none;
      cursor: default;
    }
    border-radius: 8px;
    border: 1px solid #c0c0c0;
    padding: 10px;
    margin: 1em;

    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    &-header {
      display: flex;
      justify-content: space-between;
      .location {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        .icon {
          color: ${colors.primaryColorDark};
          font-size: 18px;
        }
      }
      .date {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
        .icon {
          color: ${colors.primaryColorDark};
          font-size: 18px;
        }
      }
    }
    &-body {
    }
    &-footer {
    }
  }
`;

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <div variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</div>
      </Box>
    </Box>
  );
}

/**
 *
 */
const PreviewOportunities = ({ oportunities, closeout, fetching }) => {
  if (fetching) {
    return <p>Esta cargando</p>;
  }
  return (
    <PreviewOportunitiesStyle>
      {oportunities.map(oportunity => {
        return (
          <div key={oportunity.id} className="card">
            <div className="card-header">
              <p className="location">
                <AttachMoney className="icon" />
                {formatNumberNoSymbol(oportunity?.amount)}
              </p>

              {closeout ? (
                <p className="date">
                  <Event className="icon" /> {dayjs(oportunity?.soldat).format("MMMM DD, YYYY")}
                </p>
              ) : (
                <p className="date">
                  <Event className="icon" /> {dayjs(oportunity?.createdAt).format("MMMM DD, YYYY")}
                </p>
              )}
            </div>
            <div className="card-body">
              <p className="title">Nombre:</p>
              <p className="data status">{oportunity.prospect?.fullname}</p>
              <p className="title">Fecha estimada de cierre:</p>
              <p className="data status">{dayjs(oportunity?.estimatedclossing).format("MMMM DD, YYYY")}</p>
              <p className="title">Observaciones:</p>
              <textarea
                className="observations"
                value={oportunity?.generalobservations ? oportunity.generalobservations : "Sin Observaciones"}
                readOnly={true}
              />
            </div>
            <div className="card-footer">
              <p className="title">Certeza:</p>

              <LinearProgressWithLabel value={oportunity.certainty}></LinearProgressWithLabel>
            </div>
          </div>
        );
      })}
    </PreviewOportunitiesStyle>
  );
};

PreviewOportunities.propTypes = propTypes;
PreviewOportunities.defaultProps = defaultProps;
// #endregion

export default PreviewOportunities;
