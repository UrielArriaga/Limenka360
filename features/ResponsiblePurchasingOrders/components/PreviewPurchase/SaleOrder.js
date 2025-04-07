export const SaleOrder = ({ orderSelectedData }) => {

  const renderValue = value => {
    if (value == null || value === undefined || value === "") {
      return "N/A";
    }
    return value;
  };
  return (
    <>
     
      <div className="contentpreview__customer--item">
        <p>RFC:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.provider?.rfc)}</p>
      </div>
     
      <div className="contentpreview__customer--item">
        <p>Correo:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.provider?.email)}</p>
      </div>
     
     
      <div className="contentpreview__customer--item">
        <p> Observaciones:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.provider?.observations)}</p>
      </div>

      <div className="contentpreview__customer--item">
        <p>Telefono:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.provider?.phone)}</p>
      </div>

      <div className="contentpreview__customer--item">
        <p>Calle:</p>
        <p className="hightligth">{renderValue(orderSelectedData?.provider?.street)}</p>
      </div>

    </>
  );
};

export default SaleOrder;
