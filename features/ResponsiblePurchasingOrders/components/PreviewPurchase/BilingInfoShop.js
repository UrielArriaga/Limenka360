import React from "react";

const renderValue = value => {
  if (value == null || value === undefined || value === "") {
    return "N/A";
  }
  return value;
};

export default function BillingInfoShop ({ orderSelectedData }) {
    
  return (
    <>
    <div className="contentpreview__address--item">
      <p>Contacto:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.contact)}</p>
    </div>
    <div className="contentpreview__address--item">
      <p>Esfera:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.name)}</p>
    </div>
    <div className="contentpreview__address--item">
      <p>Teléfono:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.phone)}</p>
    </div>
    <div className="contentpreview__address--item">
      <p>Correo:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.email)}</p>
    </div>

    <div className="contentpreview__address--item">
      <p>RFC:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.rfc)}</p>
    </div>
    <div className="contentpreview__address--item">
      <p>Municipio:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.address?.settlement)}</p>
    </div>

    <div className="contentpreview__address--item">
      <p>Numero Exterio:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.address?.ext_number)}</p>
    </div>

    <div className="contentpreview__address--item">
      <p>Numero Interior:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.address?.int_number)}</p>
    </div>

    <div className="contentpreview__address--item">
      <p>Calle:</p>
      <p className="hightligth">{renderValue(orderSelectedData?.taxinformation?.address?.street)}</p>
    </div>
  </>
   
  );
};


