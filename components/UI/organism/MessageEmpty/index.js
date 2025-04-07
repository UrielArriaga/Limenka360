import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "../../../../styles/global.styles";

// #region constants

// #endregion

// #region styled-components
const GoalsChartDirectorEmpty = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 200px;
  overflow-y: scroll;
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
  }
  .createnew {
    color: ${colors.bgDirector};
    font-weight: bold;
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
  .nodata {
    width: 100%;
    text-align: center;
    padding: 20px 10px;
    margin-bottom: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    p {
      font-weight: bold;
    }
  }
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const MessageEmpty = ({ title, subtitle, description, actionText, action }) => {
  return (
    <GoalsChartDirectorEmpty>
      <h3>{title}</h3>
      <div className="divider"></div>
      <div className="content">
        <div className="nodata">
          <p>{subtitle}</p>
        </div>
        <p>
          {description}
          <span className="createnew" onClick={action}>
            {actionText}
          </span>
        </p>
      </div>
    </GoalsChartDirectorEmpty>
  );
};

MessageEmpty.propTypes = propTypes;
MessageEmpty.defaultProps = defaultProps;
// #endregion

export default MessageEmpty;
