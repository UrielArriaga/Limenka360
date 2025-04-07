import React, { useState, useEffect } from "react";
import { LoaderStyle, PreviewProspectStyle } from "./style";
import InfoProspect from "../InformationProspect";
import TimeLinePrewiew from "../UI/molecules/TimeLinePrewiew";
import PreviewPendings from "../PreviewPendings";
import { api } from "../../services/api";
import { Badge, Box, IconButton, LinearProgress } from "@material-ui/core";
import usePagination from "../../hooks/usePagination";
import { Close } from "@material-ui/icons";
import { handleGlobalAlert } from "../../utils";
import { useDispatch } from "react-redux";

export default function PreviewProspectIntelligence(props) {
  const dispatch = useDispatch();
  const { prospect, isOpen, close } = props;
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const [optionSelected, setOptionSelected] = useState("tracking");
  const [trackings, setTrackings] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [prospectData, setProspectData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFetchingTrackings, setIsFetchingTrackings] = useState(false);
  const [isFetchingPendings, setIsFetchingPendings] = useState(false);
  const handleTabs = option => setOptionSelected(option);

  useEffect(() => {
    let mounted = true;
    if ((mounted, prospect?.id)) {
      getInitialData();
      getTrackings();
      getPendings();
      setLoader(true);
    }
    return () => (mounted = false);
  }, [prospect?.id]);

  const renderContent = () => {
    switch (optionSelected) {
      case "tracking":
        return <TimeLinePrewiew trackings={trackings} fetching={isFetchingTrackings} />;

      case "pending":
        return (
          <PreviewPendings
            pendings={pendings}
            fetching={isFetchingPendings}
            page={page}
            limit={limit}
            handlePage={handlePage}
          />
        );
      default:
        break;
    }
  };

  const getInitialData = async () => {
    try {
      let include =
        "ejecutive,city,entity,phase,clientcompany,origin,clienttype,specialty,postal,createdby,category,channel";

      let p = await api.get(`prospects/${prospect?.id}?include=${include}`);
      setProspectData(p.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      handleGlobalAlert("warning", `Prospecto - Error al cargar los datos!`, "basic", dispatch, 6000);
    }
  };
  const getTrackings = async () => {
    setIsFetchingTrackings(true);
    try {
      let queryPendings = {};
      queryPendings.prospectId = prospect?.id;
      let params = {
        where: JSON.stringify(queryPendings),
        order: "-createdAt",
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
      let queryPendings = {
        prospectId: prospect.id,
        isdone: false,
      };
      let params = {
        where: JSON.stringify(queryPendings),
        order: "createdAt",
        include: "pendingstype,prospect,prospect.phase",
        count: 1,
      };
      let response = await api.get(`pendings`, { params });
      let bodyPendings = {
        pendings: response.data.results,
        count: response.data.count,
      };
      setPendings(bodyPendings);
      fetchingFalse(setIsFetchingPendings);
    } catch (error) {
      setIsFetchingPendings(false);
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
          <p className="title">Datos del Prospecto</p>
          <IconButton className="bt_close" onClick={() => close()}>
            <Close />
          </IconButton>
        </div>
        <div className="preview_prospect__body">
          <div className="info_prospect">
            <InfoProspect prospect={prospectData} loader={loader} />
          </div>
          <div className="tabs">
            <p
              className={`title ${optionSelected === "tracking" && "selected"}`}
              onClick={() => handleTabs("tracking")}
            >
              Seguimientos {countData(trackings.length)}
            </p>
            <p className={`title ${optionSelected === "pending" && "selected"}`} onClick={() => handleTabs("pending")}>
              Pendientes {countData(pendings.count)}
            </p>
          </div>
          <div className="render_container">{renderContent()}</div>
        </div>
        <div className="preview_prospect__footer"></div>
      </div>
    </PreviewProspectStyle>
  );
}
