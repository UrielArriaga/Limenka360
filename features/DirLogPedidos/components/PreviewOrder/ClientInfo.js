import React from "react";

export default function ClientInfo({orderSelectedData}){
    return(
        <>
        <div className="contentpreview__clientinfo--item">
         <p>Nombre:</p>
         <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.fullname}</p>
        </div>
        <div className="contentpreview__clientinfo--item">
         <p>Telefono:</p>
         <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.phone || "S/N"}</p>
        </div>
        <div className="contentpreview__clientinfo--item">
         <p>Email:</p>
         <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.email}</p>
        </div>
        </>
    )
}