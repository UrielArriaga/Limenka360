import React from "react";

export default function AddressInfo({ orderSelectedData,ShippingsData,innerRef }) {
  return (
    <div ref={innerRef}>
     <div className="contentpreview__address--item">
        <p>Tipo de entrega:</p>
        <p className="btnhightligth">{ShippingsData}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Nombre:</p>
        <p className="hightligth">{orderSelectedData?.receive}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Teléfono:</p>
        <p className="hightligth">{orderSelectedData?.phone}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Calle:</p>
        <p className="hightligth">{orderSelectedData?.address?.street}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Número Interior:</p>
        <p className="hightligth">{orderSelectedData?.address?.int_number}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Numero Exterio:</p>
        <p className="hightligth">{orderSelectedData?.address?.ext_number}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Colonia:</p>
        <p className="hightligth">{orderSelectedData?.address?.settlement}</p>
      </div>

      <div className="contentpreview__address--item">
        <p>Cp:</p>
        <p className="hightligth">{orderSelectedData?.address?.postal?.postal_code}</p>
      </div>

      <div className="contentpreview__address--item">
        <p>Delegación/ Municipio:</p>
        <p className="hightligth">{orderSelectedData?.address?.city?.name}</p>
      </div>

      <div className="contentpreview__address--item">
        <p>Estado:</p>
        <p className="hightligth">{orderSelectedData?.address?.entity?.name}</p>
      </div>

      <div className="contentpreview__address--item">
        <p>Referencias</p>
        <p className="hightligth">{orderSelectedData?.address?.references}</p>
      </div>
    </div>
  );
}
