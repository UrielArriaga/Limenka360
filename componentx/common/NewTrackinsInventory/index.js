import React, { useState } from "react";
import { TrackinsHistoryStyled } from "./styles";
import { Comment, AddComment, Cached } from "@material-ui/icons";
import useComments from "../../../hooks/useNewCommentInventory";
import dayjs from "dayjs";
import { IconButton } from "@material-ui/core";

export default function NewTrackinsInventory({ orderData, inventoryType }) {
  const {
    commnents,
    isPosting,
    isFetching,
    valueCommnet,
    fetchComments,
    handleOnChangeComment,
    handleOnSaveComment,
    handleOnSaveCommentAndTracking,
  } = useComments(orderData, inventoryType);
  const [visibleComments, setVisibleComments] = useState(5);
  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 5);
  };

  const currentComments = commnents?.slice(0, visibleComments);
  const capitalizarString = str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  return (
    <TrackinsHistoryStyled>
      <div className="row">
        <h3>Historial de seguimientos</h3>

        <IconButton onClick={() => fetchComments()}>
          <Cached />
        </IconButton>
      </div>
      <div className="containertext">
        <div className="headercontainertracking">
          <p className="subtitle">Agregar Comentario</p>
        </div>
        <textarea
          value={valueCommnet}
          onChange={handleOnChangeComment}
          className="textareatrackings"
          name="trackings"
          id="trackings"
        ></textarea>
        <div className="line"></div>
        <div className="actionscontainertracking">
          <button
            onClick={handleOnSaveComment}
            disabled={valueCommnet.length < 4 || isPosting}
            className={`${valueCommnet.length >= 4 || isPosting ? "active" : "disablebutton"} `}
          >
            Publicar
          </button>
          <button
            onClick={handleOnSaveCommentAndTracking}
            disabled={valueCommnet.length < 4 || isPosting}
            className={`${valueCommnet.length >= 4 || isPosting ? "active" : "disablebutton"}`}
          >
            {" "}
            Guardar comentario y como seguimiento{" "}
          </button>
        </div>
      </div>

      <h5>Comentarios</h5>

      <div className="containerlisttrackings">
        {isFetching && <p>Cargando comentarios...</p>}
        {!isFetching &&
          currentComments?.map((item, index) => (
            <div className="itemtracking" key={index}>
              <div className="columnicon">
                <Comment className="iconsvg" />
                <div className="line"></div>
              </div>

              <div className="columninfo">
                <div className="columninfo__header">
                  <p>
                    Fecha de creacion {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}, Creado Por:{" "}
                    {capitalizarString(item?.createdby?.title)} {capitalizarString(item?.createdby?.fullname)}
                  </p>
                </div>
                <div className="columninfo__description">
                  <p>{item.observations}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {visibleComments < commnents?.length && (
        <div className="load-more-container">
          <button onClick={loadMoreComments} className="load-more-button">
            <AddComment /> Mostrar más comentarios
          </button>
        </div>
      )}
    </TrackinsHistoryStyled>
  );
}
