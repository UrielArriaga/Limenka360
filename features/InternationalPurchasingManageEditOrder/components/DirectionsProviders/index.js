import React, { useState } from "react";
import { ContainerDirections, CardGrid, Card, SelectedAddress } from "./styled";
import { Check, CheckCircle, Info, Room } from "@material-ui/icons";

export default function DirectionsProviders({ selectedAddress, handleSelect, directions }) {
  const selectedIndex = selectedAddress
    ? directions?.results.findIndex(item => item?.id === selectedAddress?.id) + 1
    : null;

  return (
    <ContainerDirections>
      <div className="headContainer">
        <p className="title">Direcciones Proveedor:</p>
        {selectedIndex && (
          <div className="titles">
            <CheckCircle />
            <strong>Dirección seleccionada: (#{selectedIndex})</strong>
          </div>
        )}

        {!selectedIndex && directions?.count !== 0 && (
          <div className="titleRequired">
            <Info />
            <strong>Selecciona una dirección</strong>
          </div>
        )}
      </div>
      <CardGrid>
        {directions?.isFetching && <p>Cargando Direcciones</p>}
        {!directions?.isFetching && directions?.count == 0 && <p>No hay direcciones disponibles</p>}
        {!directions?.isFetching &&
          directions?.results?.map((item, index) => (
            <Card key={item?.id} onClick={() => handleSelect(item?.id)} selected={selectedAddress?.id === item?.id}>
              <div className="item">
                <Room className="icon" />
                <p className="capitalize">Dirección: {index + 1}</p>
              </div>
              <p className="title">
                <span>Calle:</span>
                {item?.street}
              </p>

              <p className="title">
                <span>Numero interior:</span>
                {item?.int_number}
              </p>
              <p className="title">
                <span>Numero exterior:</span>
                {item?.ext_number}
              </p>
              <p className="title">
                <span>Estado:</span>
                {item?.entity?.name}
              </p>
              <p className="title">
                <span>Municipio:</span>
                {item?.city?.name}
              </p>

              <p className="title">
                <span>C.P:</span>
                {item?.postal?.postal_code}
              </p>
            </Card>
          ))}
      </CardGrid>
    </ContainerDirections>
  );
}
