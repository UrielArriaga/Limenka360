import { CheckCircle } from "@material-ui/icons";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { hideGlobalNotification } from "../../../redux/slices/globalNotificationsSlice";
import { useRouter } from "next/router";

export default function NotificationsMissingStock(props) {
    const {data} = props
  const dispatch = useDispatch();
  const router = useRouter();

  
  return (
    <div className="content_alert">
      <div className="content_alert__header">
        <CheckCircle className="success" />
        {/* <Warning className="warning" /> */}
        {/* <AirportShuttle className="delivery " /> */}
        <p className="title_header">Estado del Pedido</p>
      </div>
      <div className="content_alert__body">
          <div className="content_map">
            <div className="title_folio">
              <p>{data?.message}:</p>
              <b>{data?.body?.orderFolio}</b>
            </div>
            <div>
              <div className="title_table">
                <b>Código</b>
                <b>Cantidad</b>
              </div>
              {data?.body?.productsrequest?.map((item, index) => {
                return (
                  <div key={index} className="title_desc">
                    <p>{item?.code}</p>
                    <p>{item?.quantity}</p>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
      <div className="content_alert__footer">
        <p className="fromnow">{dayjs(data?.createdAt).fromNow()}</p>

        <div className="buttons">
            <Button
              className="view"
              onClick={() => {
                router.push({
                  pathname: `/comprasv2`,
                  query: { folio: data?.body?.orderFolio },
                });
                dispatch(hideGlobalNotification({}));
              }}
            >
              Ver
            </Button>
        </div>
      </div>
    </div>
  );
}
