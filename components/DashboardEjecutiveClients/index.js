import React, { useEffect, useState } from "react";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { Replay, AccountCircle, Contacts, ArrowForwardIos } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { CircularProgress, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import { returnFomatTime } from "../../utils";
import { useRouter } from "next/router";
import { EjecutiveClientsStyled } from "./ejecutiveclients.styles";

const DashboardEjecutiveClients = ({ type, id_executive }) => {
  const { id_user } = useSelector(userSelector);
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataClients();
    }
    return () => (mounted = false);
  }, [flag]);

  const getDataClients = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.ejecutiveId = type === "ejecutive" ? id_user : id_executive;
      query.status = { gte: 2 };
      query.isclient = true;
      let clients = await api.get(
        `prospects?where=${JSON.stringify(query)}&limit=5&count=1&skip=${page}&order=updatedAt`
      );
      setClients(clients.data.results);
      setTotalClients(clients.data.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <EjecutiveClientsStyled>
      <div className="settings">
        <div className="settings__ctr_title">
          <p className="title">Mis Clientes</p>
          <Replay className="icon" onClick={() => setFlag(!flag)} />
        </div>
        <div className="settings__ctr_total_load">
          {isLoading ? (
            <>
              <CircularProgress size={15} color="primary" />
              <p>Cargando</p>
            </>
          ) : (
            <p>
              {clients.length} - {totalClients} Clientes
            </p>
          )}
        </div>
      </div>
      {clients.length > 0 ? (
        <div className="ctr_targets">
          {clients.map((item, index) => {
            return (
              <div key={index} className="ctr_targets__client">
                <Grid container>
                  <Grid item xs={2} md={2} className="ctr_targets__client__icon">
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={9} md={9}>
                    Cliente
                    <p className="name">{`${item?.name} ${item?.lastname}`}</p>
                  </Grid>
                </Grid>
                <div className="ctr_targets__client__info">
                  <label className="ctr_targets__client__info__label">
                    <Contacts />
                    Contacto
                  </label>
                  <p className="contact">
                    <a without="true" rel="noreferrer" href={`whatsapp://send?phone=+52${item.phone}`}>
                      {item.phone}
                    </a>
                  </p>
                  <p className="contact">
                    <a href={`mailto:${item?.email}`} without="true" rel="noreferrer">
                      {item?.email}
                    </a>
                  </p>
                  <label className="ctr_targets__client__info__label">
                    <Contacts />
                    Ultimo contacto:
                  </label>
                  <p className="last_contact">
                    {dayjs(item?.updatedAt).format("DD-MMMM-YYYY")} - {returnFomatTime(item?.updatedAt)}
                  </p>
                  {/* Redirecciona a ventas */}
                  <div className="ctr_targets__client__navigate" onClick={() => router.push("/ventas")}>
                    <p>Ver cliente</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="ctr_empty_clients">
          <div className="ctr_empty_clients__ctr_img">
            <img src="empty_tracking.svg" className="img" />
          </div>
          {isLoading ? <p>Cargando Clientes...</p> : <p>Sin clientes </p>}
        </div>
      )}
      <div className="ctr_pagination">
        <Pagination
          onChange={(e, value) => {
            setPage(value);
            setFlag(!flag);
          }}
          count={Math.ceil(totalClients / 5)}
          value={page}
          size="small"
          color="primary"
        />
      </div>
    </EjecutiveClientsStyled>
  );
};

export default DashboardEjecutiveClients;
