import React from "react";

export default function ClientInfo({ orderSelectedData }) {
  return (
    <>
      <div className="contentpreview__address--item">
        <p>Nombre:</p>
        <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.name || "N/A"}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Apellidos:</p>
        <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.lastname || "N/A"}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Teléfono:</p>
        <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.phone || "N/A"}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Telefono opcional:</p>
        <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.optionalphone || "N/A"}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Correo:</p>
        <p className="hightligth">{orderSelectedData?.oportunity?.prospect?.email || "N/A"}</p>
      </div>
    </>
  );
}
