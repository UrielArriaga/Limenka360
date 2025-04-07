import React, { useEffect, useState } from "react";
import { PaperPending, SectionPendingsLayout } from "./styles";
import { api } from "../../../../services/api";
import { CircularProgress, Grid, IconButton, LinearProgress, Paper, Tooltip, Button } from "@material-ui/core";
import {
  Assignment,
  Check,
  NavigateBefore,
  NavigateNext,
  NotificationsActive,
  PersonPinCircle,
  RingVolume,
  Visibility,
  WatchLater,
} from "@material-ui/icons";
import dayjs from "dayjs";
import ViewInfoPending from "../../../ViewPendingEjecutive";
import { Pagination } from "@material-ui/lab";
export default function SectionExecutivesPendings(props) {
  const { ejecutive, date, viewOption, groupId } = props;
  const [dataPendingView, setDataPendingView] = useState({});
  const [pendingsByEjecutive, setPendingsByEjecutive] = useState([]);
  const [isLoaderData, setIsLoaderData] = useState(true);
  const [countPendings, setCountPendings] = useState(0);
  const [isOpenViewPending, setIsOpenViewPending] = useState(false);
  const handleCloseViewPending = () => setIsOpenViewPending(false);
  const totalPages = Math.ceil((countPendings || 1) / 10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (groupId !== "" || groupId !== undefined || groupId !== null) {
      getPendingsExecutive();
    }
  }, [groupId, page, viewOption, date, ejecutive]);

  useEffect(() => {
    restorePage();
  }, [viewOption, date, ejecutive]);

  const generateFilters = () => {
    let query = {};
    let inQuery = {};
    query.ejecutive = inQuery;
    if (ejecutive.id) {
      query.ejecutiveId = ejecutive.id;
    } else {
      inQuery.groupId = groupId;
    }
    query.isdone = false;
    switch (viewOption) {
      case "month":
        query.date_from = {
          between: [
            dayjs(date).startOf("month").toISOString(),
            dayjs(date).add(1, "month").startOf("month").toISOString(),
          ],
        };
        break;
      case "week":
        query.date_from = {
          between: [
            dayjs(date).startOf("week").toISOString(),
            dayjs(date).add(1, "week").startOf("week").toISOString(),
          ],
        };
        break;
      case "day":
        query.date_from = {
          between: [dayjs(date).startOf("day").toISOString(), dayjs(date).add(1, "day").startOf("day").toISOString()],
        };
        break;

      default:
        query.date_from = {
          between: [
            dayjs(date).startOf("month").toISOString(),
            dayjs(date).add(1, "month").startOf("month").toISOString(),
          ],
        };
        break;
    }
    return query;
  };

  const getPendingsExecutive = async () => {
    setIsLoaderData(true);
    try {
      let params = {
        where: generateFilters(),
        order: "-date_from",
        limit: 10,
        skip: page,
        count: 1,
        include:
          "prospect,prospect.clienttype,prospect.city,prospect.entity,prospect.specialty,prospect.phase,prospect.ejecutive,oportunity,oportunity.phase,pendingstype,ejecutive,ejecutive.group",
        join: "prospect,pct,pc,pe,ps,pp,prospect.ejecutive,opo,opha,pendingstype,ejecutive,eg",
      };
      let response = await api.get("pendings", { params });
      setPendingsByEjecutive(response.data.results);

      setCountPendings(response.data.count);
      setIsLoaderData(false);
    } catch (error) {
      setIsLoaderData(false);
      console.log(error);
    }
  };

  const restorePage = () => {
    if (page > 1) {
      setPage(1);
    }
  };

  const handlePage = (event, page) => {
    setPage(page);
  };

  const iconTypePending = type => {
    switch (type) {
      case "Visita":
        return <PersonPinCircle className="iconTitle visit" />;
      case "Cita":
        return <WatchLater className="iconTitle date" />;
      case "Recordatorio":
        return <NotificationsActive className="iconTitle remember" />;
      case "Llamada":
        return <RingVolume className="iconTitle call" />;
      case "Tarea":
        return <Assignment className="iconTitle task" />;
      default:
        return <Check />;
    }
  };

  return (
    <SectionPendingsLayout>
      <div className="container_main">
        <div className="header_pendings">
          <p className="titlePendings" onClick={() => console.log("paginas", page)}>
            Pendientes por Ejecutivo ({countPendings})
          </p>
          <p>
            Pagina <span className="spanPage">{page} </span> de <span className="spanPage">{totalPages}</span>
          </p>
        </div>
        {isLoaderData ? (
          <div className="ctr_load">
            <div className="ctr_load__img">
              <img src="/load.png" />
            </div>
            <div className="ctr_load__load">
              <p>Cargando</p>
              <LinearProgress color="primary" />
            </div>
          </div>
        ) : (
          <>
            <div className="body_pendings">
              <p className="title_nameEjecutive">
                {ejecutive.fullname ? ejecutive.fullname : "Todos los Ejecutivos       "}
              </p>
              <div className="pendings">
                {pendingsByEjecutive.map((item, index) => (
                  <PaperPending key={index} elevation={2}>
                    <div className="container_typePending">
                      <p className="typePending">
                        {iconTypePending(item.pendingstype.name)} {item.pendingstype.name}
                      </p>
                      <Button
                        className="buttonSeePending"
                        onClick={() => {
                          setDataPendingView(item);
                          setIsOpenViewPending(true);
                        }}
                      >
                        <p>Ver</p>
                      </Button>
                    </div>
                    <p className="title">{item.subject}</p>
                    <p className="description">
                      {item.description ? "Descripción: " + item.description : "Sin descripción"}
                    </p>
                    <div className="executive">
                      <p className="title">
                        Ejecutivo: <span className="capitalize">{item.ejecutive.fullname}</span>
                      </p>
                      <p className="title">
                        Correo: <span>{item.ejecutive.email}</span>
                      </p>
                    </div>
                    <div className="footerPending">
                      <p className="date_from">
                        Inicio: <span className="span">{dayjs(item.date_from).format("DD/MM/YYYY")}</span>
                      </p>
                      {item.date_to && (
                        <p className="date_to">
                          Fin:
                          <span className="span">{dayjs(item.date_to).format("DD/MM/YYYY")}</span>
                        </p>
                      )}
                    </div>
                  </PaperPending>
                ))}
                {pendingsByEjecutive.length === 0 && (
                  <div className="message_ctr">
                    <img src="/empty_table.svg" />
                    <p>Sin Pendientes</p>
                  </div>
                )}
              </div>
            </div>
            {countPendings >= 11 && (
              <div className="pagination">
                <Pagination
                  className="paginationItem"
                  count={totalPages}
                  page={page}
                  color="primary"
                  shape="rounded"
                  onChange={handlePage}
                  defaultPage={1}
                />
              </div>
            )}
          </>
        )}
      </div>
      <ViewInfoPending open={isOpenViewPending} onClose={handleCloseViewPending} pending={dataPendingView} />
    </SectionPendingsLayout>
  );
}
