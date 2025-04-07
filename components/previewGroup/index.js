import React, { useState, useEffect } from "react";
import { PreviewGroupStyle } from "./style";
import TimeLinePrewiew from "../UI/molecules/TimeLinePrewiew";
import PreviewPendings from "../PreviewPendings";
import { api } from "../../services/api";
import PropTypes from "prop-types";
import InformationGroup from "../InformationGroup";
import ChartSellsExecutives from "../UI/organism/ChartSellsExecutives";
import PreviewOportunities from "../PreviewOportunities";
import { Close } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {};

export default function PreviewGroup({ group, isOpen, close }) {
  const [optionSelected, setOptionSelected] = useState("oportunity");
  const [trackings, setTrackings] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [oportunities, setOportunities] = useState([]);
  const [isFetchingTrackings, setIsFetchingTrackings] = useState(false);
  const [isFetchingPendings, setIsFetchingPendings] = useState(false);

  const [isFetchingOportunities, setIsFetchingOportunities] = useState(false);

  const renderContent = {
    oportunity: <PreviewOportunities oportunities={oportunities} />,
    sell: <ChartSellsExecutives groupID={group.id || ""} chartName={"Ventas por ejecutivo"} getTop />,
    pending: <PreviewPendings pendings={pendings} fetching={isFetchingPendings} />,
    tracking: <TimeLinePrewiew trackings={trackings} fetching={isFetchingTrackings} />,
  };

  const handleTabs = option => setOptionSelected(option);

  useEffect(() => {
    if (group) {
      getTrackings();
      getPendings();
      getOportunities();
    }
  }, [group]);

  const getTrackings = async () => {
    setIsFetchingTrackings(true);
    try {
      let queryTrakings = { prospect: { ejecutive: { groupId: group.id } } };

      let params = {
        count: 1,
        where: JSON.stringify(queryTrakings),
        order: "createdAt",
        include: "phase,prospect,prospect.ejecutive",
        limit: 20,
      };
      let response = await api.get(`trackings`, { params });
      setTrackings(response.data.results);
      fetchingFalse(setIsFetchingTrackings);
    } catch (error) {
      setIsFetchingTrackings(false);
      console.log(error);
    }
  };
  const getPendings = async () => {
    setIsFetchingPendings(true);
    try {
      let queryPendings = { ejecutive: { groupId: group.id } };
      let params = {
        where: JSON.stringify(queryPendings),
        include: "ejecutive",
      };
      let response = await api.get(`pendings`, { params });
      setPendings(response.data.results);
      fetchingFalse(setIsFetchingPendings);
    } catch (error) {
      setIsFetchingPendings(false);
      console.log(error);
    }
  };

  const getOportunities = async () => {
    setIsFetchingOportunities(true);
    try {
      let queryOportunities = { prospect: { ejecutive: { groupId: group.id } } };

      let params = {
        where: JSON.stringify(queryOportunities),
        include: "prospect,prospect.ejecutive",
      };
      let response = await api.get(`oportunities`, { params });
      setOportunities(response.data.results);

      setIsFetchingOportunities(false);
    } catch (error) {
      setIsFetchingOportunities(false);
      console.log(error);
    }
  };

  const countData = number => {
    let count = "";
    if (number > 99) {
      count = "99+";
    } else {
      count = number;
    }
    return <span className="count">({count})</span>;
  };

  const fetchingFalse = setValue => {
    setTimeout(() => {
      setValue(false);
    }, 2000);
  };

  return (
    <PreviewGroupStyle open={isOpen} onClose={close} anchor="right">
      <div className="preview_group">
        <div className="preview_group__header">
          <p className="title">Datos del Grupos</p>
          <Tooltip title="Cerrar">
            <Close onClick={close} />
          </Tooltip>
        </div>
        <div className="preview_group__body">
          <div className="info_group">
            <InformationGroup group={group} />
          </div>
          <div className="tabs">
            <p
              className={`title ${optionSelected === "oportunity" && "selected"}`}
              onClick={() => handleTabs("oportunity")}
            >
              Oportunidades {countData(oportunities.length)}
            </p>
            <p className={`title ${optionSelected === "sell" && "selected"}`} onClick={() => handleTabs("sell")}>
              Top<span className="count">(3)</span> vendedores
            </p>

            <p className={`title ${optionSelected === "pending" && "selected"}`} onClick={() => handleTabs("pending")}>
              Pendientes {countData(pendings.length)}
            </p>

            <p
              className={`title ${optionSelected === "tracking" && "selected"}`}
              onClick={() => handleTabs("tracking")}
            >
              Seguimientos {countData(trackings.length)}
            </p>
          </div>
          <div className="render_container">{renderContent[optionSelected]}</div>
        </div>
        <div className="preview_group__footer"></div>
      </div>
    </PreviewGroupStyle>
  );
}

PreviewGroup.propTypes = propTypes;
PreviewGroup.defaultProps = defaultProps;
