import React, { useEffect, useState } from "react";
import { Close, FiberManualRecord, Today, Refresh, PostAdd, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { TrackingsOrderStyled } from "./styles";
import { formatDate } from "../../../../utils";
import AddTrackings from "./AddTrackings";
import { IconButton, LinearProgress, Tooltip } from "@material-ui/core";

export default function TrackingsRoutes({
  open,
  toggleTrackingsModal,
  trackingData,
  reloadTrackings,
  isFetching,
  orderSelectedData,
  page,
  setPage,
  limit,
  orderBy,
  setOrderBy,
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (open) {
      setShowAddForm(false);
    }
  }, [open]);

  return (
    <TrackingsOrderStyled open={open} anchor="right" onClose={toggleTrackingsModal}>
      <div className="header">
        <div className="header__title">
          <p>Historial de seguimientos</p>
          <Refresh style={{ cursor: "pointer", marginLeft: 8 }} onClick={reloadTrackings} />
        </div>
        <div className="header__close" onClick={toggleTrackingsModal}>
          <Close />
        </div>
      </div>

      {showAddForm && (
        <AddTrackings
          orderSelectedData={orderSelectedData}
          reloadTrackings={reloadTrackings}
          setShowAddForm={setShowAddForm}
        />
      )}

      <div className="titleTrackings">
        <div className="TitleAdd">
          <p className="subtitle">Seguimientos ({trackingData.count})</p>
          <Tooltip title="Agregar seguimiento">
            <PostAdd onClick={() => setShowAddForm(true)} className="icon" />
          </Tooltip>
        </div>
        <div className="selectContainer">
          <select
            value={orderBy.value}
            onChange={e =>
              setOrderBy({
                ...orderBy,
                value: e.target.value,
              })
            }
          >
            <option value="-createdAt">Seguimientos Recientes</option>
            <option value="createdAt">Seguimientos Antiguos</option>
          </select>
        </div>
      </div>
      <div className="trackings">
        {!isFetching && trackingData.results.length === 0 && <p>No hay seguimientos disponibles.</p>}
        {!isFetching && trackingData.results.length > 0 && (
          <>
            {trackingData.results.map((item, index) => (
              <div key={index} style={{ padding: 5 }}>
                <div className="target_tracing">
                  <div className="top">
                    <div className="item">
                      <FiberManualRecord className="icon" />
                      <p className="date capitalize">{item.phase?.name}</p>
                    </div>
                    <div className="item">
                      <Today className="icon" />
                      <p className="date">{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  <span className="span">Asunto</span>
                  <p>{item.reason}</p>
                  <span className="span">Observación</span>
                  <p className="observation">{item.observations}</p>
                </div>
              </div>
            ))}
          </>
        )}
        {isFetching && (
          <div className="ctr_load">
            <div className="ctr_load__img">
              <img src="/load.png" />
            </div>
            <div className="ctr_load__load">
              <p>Cargando Seguimientos</p>
            </div>
          </div>
        )}
      </div>
      {trackingData?.count > limit && (
        <div className="pagination">
          <p className="pageCount">
            Página {page} de {Math.ceil(trackingData.count / limit)}
          </p>
          <IconButton onClick={() => setPage(page - 1)} disabled={page <= 1 ? true : false} className="pageBefore">
            <NavigateBefore style={{ fontSize: 28 }} />
          </IconButton>

          <IconButton
            className="pageNext"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(trackingData.count / limit) ? true : false}
          >
            <NavigateNext style={{ fontSize: 28 }} />
          </IconButton>
        </div>
      )}
    </TrackingsOrderStyled>
  );
}
