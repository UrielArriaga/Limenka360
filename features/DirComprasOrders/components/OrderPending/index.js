import React, { useEffect, useState } from "react";
import { Close, FiberManualRecord, Today, Refresh, PostAdd, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { TrackingsOrderStyled } from "./styles";
import { formatDate } from "../../../../utils";
import AddTrackings from "./AddTrackings";
import { IconButton, LinearProgress, Tooltip } from "@material-ui/core";


export default function OrderPending({
  open,
  togglePendingWorkModal,
  pendingData,
  reloadPendings,
  Fetching,
  pages,
  setPages,
  lmt,
  orderByPending,
  setOrderByPending,
  orderSelectedData,
  
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (open) {
      setShowAddForm(false);
    }
  }, [open]);

  return (
    <TrackingsOrderStyled open={open} anchor="right" onClose={togglePendingWorkModal}>
      <div className="header">
        <div className="header__title">
          <p>Historial de Pendientes</p>
          <Refresh style={{ cursor: "pointer", marginLeft: 8 }} onClick={reloadPendings} />
        </div>
        <div className="header__close" onClick={togglePendingWorkModal}>
          <Close />
        </div>
      </div>

      {showAddForm && (
        <AddTrackings
          orderSelectedData={orderSelectedData}
          reloadPendings={reloadPendings}
          setShowAddForm={setShowAddForm}
        />
      )}

      <div className="titleTrackings">
        <div className="TitleAdd">
          <p className="subtitle">Pendientes ({pendingData.count})</p>
          <Tooltip title="Agregar Pendiente">
            <PostAdd onClick={() => setShowAddForm(true)} className="icon" />
          </Tooltip>
        </div>
        <div className="selectContainer">
          <select
            value={orderByPending.value}
            onChange={e =>
              setOrderByPending({
                ...orderByPending,
                value: e.target.value,
              })
            }
          >
            <option value="-createdAt">Pendientes Recientes</option>
            <option value="createdAt">Pendientes Antiguos</option>
          </select>
        </div>
      </div>
      <div className="trackings">
        {!Fetching && pendingData.results.length === 0 && <p>No hay Pendientes disponibles.</p>}
        {!Fetching && pendingData.results.length > 0 && (
          <>
            {pendingData.results.map((item, index) => (
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
        {Fetching && (
          <div className="ctr_load">
            <div className="ctr_load__img">
              <img src="/load.png" />
            </div>
            <div className="ctr_load__load">
              <p>Cargando Pendientes</p>
            </div>
          </div>
        )}
      </div>
      {pendingData?.count > lmt && (
        <div className="pagination">
          <p className="pageCount">
            Página {pages} de {Math.ceil(pendingData.count / lmt)}
          </p>
          <IconButton onClick={() => setPages(pages - 1)} disabled={pages <= 1 ? true : false} className="pageBefore">
            <NavigateBefore style={{ fontSize: 28 }} />
          </IconButton>

          <IconButton
            className="pageNext"
            onClick={() => setPages(pages + 1)}
            disabled={pages >= Math.ceil(pendingData.count / lmt) ? true : false}
          >
            <NavigateNext style={{ fontSize: 28 }} />
          </IconButton>
        </div>
      )}
    </TrackingsOrderStyled>
  );
}
