export const InfoProvider = ({ orderSelectedData }) => {

    const renderValue = value => {
      if (value == null || value === undefined || value === "") {
        return "N/A";
      }
      return value;
    };
    return (
      <>
       
        <div className="contentpreview__customer--item">
          <p>Referencias:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.settlement)}</p>
        </div>
        <div className="contentpreview__customer--item">
          <p>Numero Interior:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.int_number)}</p>
        </div>
        <div className="contentpreview__customer--item">
          <p>Numero Exterior:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.ext_number)}</p>
        </div>
       
        <div className="contentpreview__customer--item">
          <p>Calle:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.street)}</p>
        </div>
        <div className="contentpreview__customer--item">
          <p>C.P:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.postal?.postal_code)}</p>
        </div>
        <div className="contentpreview__customer--item">
          <p>Ciudad:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.city?.name)}</p>
        </div>
        <div className="contentpreview__customer--item">
          <p> Estado:</p>
          <p className="hightligth">{renderValue(orderSelectedData?.provideraddress?.entity?.name)}</p>
        </div>
  
      </>
    );
  };
  
  export default InfoProvider;
  