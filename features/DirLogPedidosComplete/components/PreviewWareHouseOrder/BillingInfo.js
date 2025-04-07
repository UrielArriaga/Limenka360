import React from "react";

const renderValue = value => {
  if (value == null || value === undefined || value === "") {
    return "N/A";
  }
  return value;
};

const BillingInfo = ({ orderSelectedData }) => {
  return (
    <>
      <div className="contentpreview__customer--item">
        <p>Razón Social:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.businessname)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>RFC:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.rfc)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>CFDI:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.cfdi?.name)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Forma de pago:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.paymentway?.name)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Método de pago:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.paymentmethod?.name)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Regimen Fiscal :</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.taxregime?.name)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Teléfono:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.phone)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Colonia:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.address?.settlement)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Codigo Postal:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.address?.postal?.postal_code)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Estado:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.address?.entity?.name)}</p>
      </div>
      <div className="contentpreview__customer--item">
        <p>Municipio:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.bill?.address?.city?.name)}</p>
      </div>
    </>
  );
};

export default BillingInfo;
