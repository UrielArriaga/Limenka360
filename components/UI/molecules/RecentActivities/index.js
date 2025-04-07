import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AddCircle, Delete, Edit } from "@material-ui/icons";
import dayjs from "dayjs";
import { motion } from "framer-motion";

// #region constants

// #endregion

// #region styled-components
export const ActivityCard = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  overflow: hidden;
  transition: padding 0.3s ease;
  min-height: 100px;
  .card__leftcontent {
    margin-right: 10px;
    min-height: 40px;

    .line {
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: #eee;
    }
  }

  .card__rigthcontent {
    .listtitle {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .listdescription {
      font-size: 13px;
      color: #757575;
      margin-bottom: 10px;
    }
    .createdAt {
      font-size: 0.6em;
      color: #757575;
    }
  }

  :hover {
    cursor: pointer;
    padding: 0.3em 0;
    background-color: ${props => (props.isOpen ? "#eee" : "white")};

    ${props =>
      props.isOpen &&
      css`
        border-bottom: 1px solid #6eabce;
      `}
    ${props =>
      props.isOpen &&
      css`
        border-top: 1px solid #6eabce;
      `}
    
        ${props =>
      props.isOpen &&
      css`
        border-top: 1px solid #6eabce;
      `}
      border-radius: 5px;
  }
`;

const IconBG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  background-color: #eee;

  .iconBG {
    font-size: 1.5em;
  }

  /* Colors of icons */
  .create {
    color: #6adebb;
  }
  .update {
    color: #3d85c6;
  }
  .delete {
    color: #d63c5d;
  }
`;

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = { activitiesList: PropTypes.array.isRequired };

const defaultProps = { activitiesList: [] };

/**
 *
 */
const RecentActivities = ({ activitiesList, showInfo, handleOpenActivity }) => {
  const renderIconType = {
    create: (
      <IconBG className="create">
        <AddCircle className="iconBG create" />
      </IconBG>
    ),
    update: (
      <IconBG className="update">
        <Edit className="iconBG update" />
      </IconBG>
    ),
    delete: (
      <IconBG className="">
        <Delete className="iconBG delete" />
      </IconBG>
    ),
  };

  return (
    <>
      {activitiesList?.map(activity => {
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={activity.id}
            onClick={() => handleOpenActivity(activity)}
          >
            <ActivityCard>
              <div className="card__leftcontent">
                {renderIconType[activity?.type]}
                <div className="line" />
              </div>
              {showInfo && (
                <div className="card__rigthcontent">
                  <p className="listtitle">{activity?.message}</p>
                  <p className="listdescription">
                    {activity?.data?.observations ? activity?.data?.observations : activity?.data?.xxx}
                  </p>

                  <p className="createdAt">
                    {dayjs(activity?.createdAt).format("DD/MM/YY - HH:mmA")} <i>por</i> {activity?.ejecutive?.fullname}
                  </p>
                </div>
              )}
            </ActivityCard>
          </motion.div>
        );
      })}
    </>
  );
};

RecentActivities.propTypes = propTypes;
RecentActivities.defaultProps = defaultProps;
// #endregion

export default RecentActivities;
