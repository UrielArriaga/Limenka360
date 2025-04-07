import React, { useState } from "react";
import { TrackinsHistoryStyled } from "./styled";
import { Comment,AddComment } from "@material-ui/icons";
import useComments from "../../hooks/useComments";
import dayjs from "dayjs";

export default function TrackinsHistory({ orderData }) {
  const { commnents, isPosting, valueCommnet, handleOnChangeComment, handleOnSaveComment } = useComments(orderData);
  const [visibleComments, setVisibleComments] = useState(5);

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };


  const currentComments = commnents?.slice(0, visibleComments);

  return (
    <TrackinsHistoryStyled>
      <h3>Historial de seguimientos</h3>
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
        </div>
      </div>

      <h5>Comentarios</h5>

      <div className="containerlisttrackings">
        {currentComments?.map((item, index) => (
          <div className="itemtracking" key={index}>
            <div className="columnicon">
              <Comment className="iconsvg" />
              <div className="line"></div>
            </div>

            <div className="columninfo">
              <div className="columninfo__header">
              <p>Fecha de creacion {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}</p>
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
            <AddComment/> Mostrar más comentarios
          </button>
        </div>
      )}
    </TrackinsHistoryStyled>
  );
}