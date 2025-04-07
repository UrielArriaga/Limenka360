import React from "react";
import { DirectionsProviderStyled } from "./styles";

function DirectionsProviders(props) {
  const { address, setSelectedAddress, selectedAddress } = props;
  return (
    <DirectionsProviderStyled>
      {address?.data?.length > 0 &&
        address?.data?.map((item, index) => (
          <div
            className={selectedAddress?.id == item?.id ? "addressProviderSelected" : "addressProvider"}
            key={index}
            onClick={() => setSelectedAddress(item)}
          >
            <p>Estado: {item?.entity?.name}</p>
            <p>Ciudad: {item?.city?.name}</p>
            <p>C.P: {item?.postal?.postal_code}</p>
            <p>Asentamiento: {item?.postal?.settlement}</p>
            <p>Num.Exterior: {item?.ext_number}</p>
            <p>Num.Interior: {item?.int_number}</p>
            <p>Calle: {item?.street}</p>
          </div>
        ))}

      {address?.data?.length == 0 && <h3>El proveedor aun no agrega direcciones</h3>}
    </DirectionsProviderStyled>
  );
}

export default DirectionsProviders;
