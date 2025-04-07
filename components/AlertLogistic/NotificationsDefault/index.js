import { CheckCircle } from '@material-ui/icons';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { hideGlobalNotification } from "../../../redux/slices/globalNotificationsSlice";
import { useDispatch } from 'react-redux';


export default function NotificationsDefault(data) {
   const dispatch = useDispatch();   
  return (
    <div className="content_alert">
    <div className="content_alert__header">
      <CheckCircle className="success" />
      {/* <Warning className="warning" /> */}
      {/* <AirportShuttle className="delivery " /> */}
      <p className="title_header">Estado del Pedido</p>
    </div>
    <div className="content_alert__body">
        <p>{data?.message}</p>
    </div>
    <div className="content_alert__footer">
      <p className="fromnow">{dayjs(data?.createdAt).fromNow()}</p>

      <div className="buttons">

        <Button
          className="accept"
          onClick={() => {
            dispatch(hideGlobalNotification({}));
          }}
        >
          Aceptar
        </Button>
      </div>
    </div>
  </div>
  )
}
