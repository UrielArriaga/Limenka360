import React, { useEffect } from "react";
import { TrackingsInventory } from "./styled";
import { Close, FiberManualRecord, NavigateBefore, NavigateNext, Refresh, Today } from "@material-ui/icons";
import { formatDate } from "../../../../utils";
import { IconButton } from "@material-ui/core";

export default function TrackingInventory({
  open,
  toggleTrackingsModal,
  dataTracking,
  page,
  setPage,
  limit,
  dataTotal,
  isInventoryTracking,
  reloadTrackings,
}) {
  return (
    <TrackingsInventory open={open} anchor="right" onClose={toggleTrackingsModal}>
      <div className="header">
        <div className="header__title">
          <p>Historial de seguimientos</p>
          <Refresh className="header__refresh" onClick={reloadTrackings} />
        </div>
        <div className="header__close" onClick={toggleTrackingsModal}>
          <Close />
        </div>
      </div>

      <div className="trackings">
        {!isInventoryTracking && dataTotal === 0 && <p>No hay seguimientos disponibles.</p>}
        {!isInventoryTracking && dataTotal > 0 && (
          <>
            {" "}
            {dataTracking?.map((item, index) => (
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
        {dataTotal > 0 && (
          <div className="pagination">
            <p className="pageCount">
              Página {page} de {Math.ceil(dataTotal / limit)}
            </p>
            <IconButton onClick={() => setPage(page - 1)} disabled={page <= 1 ? true : false} className="pageBefore">
              <NavigateBefore style={{ fontSize: 28 }} />
            </IconButton>

            <IconButton
              className="pageNext"
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(dataTotal / limit) ? true : false}
            >
              <NavigateNext style={{ fontSize: 28 }} />
            </IconButton>
          </div>
        )}

        {isInventoryTracking && (
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
    </TrackingsInventory>
  );
}
