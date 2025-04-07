import React, { useState, useEffect } from "react";
import { LoaderStyle, PreviewProspectStyle } from "./style";
import InfoProspect from "../InformationProspect";
import TimeLinePrewiew from "../UI/molecules/TimeLinePrewiew";
import PreviewPendings from "../PreviewPendings";
import { api } from "../../services/api";
import ProspectFiles from "../ProspectFiles";
import { Badge, Box, IconButton, LinearProgress } from "@material-ui/core";
import EmptyData from "../PreviewEmpty";
import useFetch from "../../hooks/useFetch";
import OportunitiesCloseout from "../OportunitiesCloseout";
import PreviewOportunities from "../PreviewOportunities";
import Files from "../Files";
import { Close } from "@material-ui/icons";

export default function PreviewClient(props) {
  const { prospect, isOpen, close } = props;
  const [optionSelected, setOptionSelected] = useState("sells");
  const [trackings, setTrackings] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [files, setFiles] = useState([]);
  const [isFetchingTrackings, setIsFetchingTrackings] = useState(false);
  const [isFetchingPendings, setIsFetchingPendings] = useState(false);
  const [isFetchingFiles, setIsFetchingFiles] = useState(false);

  const { isFetching: isFetchingOportunities, response } = useFetch({
    path: "oportunities",
    condition: prospect,
    refetch: prospect,
    paramsfn: () => ({
      count: 1,
      include: "prospect",
      order: "-createdAt",
      showproducts: 1,
      where: {
        iscloseout: true,
        prospectId: prospect.id,
      },
    }),
  });

  const fn = () => ({ x: 1 });

  const handleTabs = option => setOptionSelected(option);
  const handlePage = () => {};
  useEffect(() => {
    if (prospect.id) {
      getTrackings();
      getPendings();
      getFiles();
    }
  }, [prospect]);

  const renderContent = () => {
    switch (optionSelected) {
      case "files":
        return <Files filesFrom="prospect" data={prospect}></Files>;

      case "tracking":
        return <TimeLinePrewiew trackings={trackings} fetching={isFetchingTrackings} />;

      case "pending":
        return <PreviewPendings pendings={pendings} fetching={isFetchingPendings} handlePage={handlePage} />;

      case "sells":
        return <PreviewOportunities closeout oportunities={response.results} fetching={isFetchingOportunities} />;

      default:
        break;
    }
  };
  const getTrackings = async () => {
    setIsFetchingTrackings(true);
    try {
      let queryPendings = {};
      queryPendings.prospectId = prospect?.id;
      let params = {
        where: JSON.stringify(queryPendings),
        order: "createdAt",
        include: "phase",
        all: 1,
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
      let queryPendings = {};
      queryPendings.prospectId = prospect?.id;
      queryPendings.isdone = false;
      let params = {
        where: JSON.stringify(queryPendings),
        order: "createdAt",
        include: "pendingstype,prospect,prospect.phase",
      };
      let response = await api.get(`pendings`, { params });
      setPendings(response.data.results);
      fetchingFalse(setIsFetchingPendings);
    } catch (error) {
      setIsFetchingPendings(false);
      console.log(error);
    }
  };
  const getFiles = async () => {
    setIsFetchingTrackings(true);
    try {
      let params = {
        include: "filestype",
        count: 1,
      };
      let response = await api.get(`documents/prospect/${prospect.id}`, { params });
      setFiles(response.data);

      fetchingFalse(setIsFetchingTrackings);
    } catch (error) {
      setIsFetchingTrackings(false);
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
    <PreviewProspectStyle open={isOpen} onClose={close} anchor="right">
      <div className="preview_prospect">
        <div className="preview_prospect__header">
          <p className="title">Datos del Cliente</p>
          <IconButton className="bt_close" onClick={() => close()}>
            <Close />
          </IconButton>
        </div>
        <div className="preview_prospect__body">
          <div className="info_prospect">
            <InfoProspect prospect={prospect} />
          </div>
          <div className="tabs">
            <p className={`title ${optionSelected === "sells" && "selected"}`} onClick={() => handleTabs("sells")}>
              Ventas {isFetchingOportunities ? "-" : countData(response.count)}
            </p>
            <p
              className={`title ${optionSelected === "tracking" && "selected"}`}
              onClick={() => handleTabs("tracking")}
            >
              Seguimientos {countData(trackings.length)}
            </p>
            <p className={`title ${optionSelected === "pending" && "selected"}`} onClick={() => handleTabs("pending")}>
              Pendientes {countData(pendings.length)}
            </p>
            <p className={`title ${optionSelected === "files" && "selected"}`} onClick={() => handleTabs("files")}>
              Archivos {countData(files?.count)}
            </p>
          </div>
          <div className="render_container">{renderContent()}</div>
        </div>
        <div className="preview_prospect__footer"></div>
      </div>
    </PreviewProspectStyle>
  );
}
