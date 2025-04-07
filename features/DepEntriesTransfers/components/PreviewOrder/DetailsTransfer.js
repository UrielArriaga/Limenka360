import dayjs from "dayjs";
import React from "react";

export default function DetailsTransfer({selectedTransfer}){
    return(
        <>
        <div className="contentpreview__clientinfo--item">
         <p>Almacen de Origen:</p>
         <p className="hightligth">{selectedTransfer?.exitwarehouse}</p>
        </div>
        <div className="contentpreview__clientinfo--item">
         <p>Almacen Destino:</p>
         <p className="hightligth">{selectedTransfer?.entrywarehouse}</p>
        </div>
        <div className="contentpreview__clientinfo--item">
         <p>Creado Por:</p>
         <p className="hightligth">{selectedTransfer?.createdBy}</p>
        </div>
        <div className="contentpreview__clientinfo--item">
         <p>Fecha de Creación:</p>
         <p className="hightligth">{dayjs(selectedTransfer?.data?.createdAt).format("D,MMMM  YYYY")}</p>
        </div>
        </>
    )
}