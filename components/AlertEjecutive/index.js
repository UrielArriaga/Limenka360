import React from "react";
import { AlertStyle } from "./style";
import { useSelector } from "react-redux";
import { CheckCircle, InsertComment } from "@material-ui/icons";
import {
  globalNotificationsSelector,
  hideGlobalNotification,
  showGlobalNotification,
} from "../../redux/slices/globalNotificationsSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Button, Tooltip } from "@material-ui/core";
import {
  AddCommentToOrder,
  commonSelector,
  RemoveNotification,
  UpdateNotification,
  hideNotification,
  AddMultipleNotifications,
} from "../../redux/slices/commonSlice";

export default function AlertEjecutive({ close }) {
  const { data, initialState } = useSelector(globalNotificationsSelector);
  const { notifications } = useSelector(commonSelector);

  const AlertGlobals = data => {
    switch (data.type) {
      case "compras_missingstock":
        return <NotificationsMissingStock data={data} />;

      default:
        return <NewCommentInOrder data={data} />;
    }
  };

  return <AlertStyle>{AlertGlobals(data)}</AlertStyle>;
}

export const NewCommentInOrder = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="content_alert">
      <Tooltip title="Cerar">
        <div className="content_alert__header" onClick={() => dispatch(hideNotification())}>
          <InsertComment className="success" />
          <p className="title_header">Nuevo comentario en Pedido</p>
        </div>
      </Tooltip>
      <Tooltip title="Cerrar">
        <div className="content_alert__body" onClick={() => dispatch(hideNotification())}>
          <div className="content_map">
            <div className="title_folio">
              <p>tratese con delicadesa</p>
              <b>Folio: EERTT56</b>
            </div>
          </div>
        </div>
      </Tooltip>
      <div className="content_alert__footer">
        <p className="fromnow">{dayjs(data?.createdAt).fromNow()}</p>

        <div className="buttons">
          <Button
            className="view"
            onClick={() => {
              router.push({
                pathname: `/pedidos/pedido`,
                query: { pe:"X83EQKK1PiBISYMOnRwiVpvS", pr:"K1X91MPQyvErh0UhA3N1P7lk", op:"PenHkaZMNOXkytmBiA5ZW0Lc"},
              });
              dispatch(hideNotification());
            }}
          >
            Ver
          </Button>
        </div>
      </div>
    </div>
  );
};
