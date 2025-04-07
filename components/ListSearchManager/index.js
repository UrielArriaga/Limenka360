import React, { useEffect, useRef } from "react";
import { BusinessOutlined, Person, StarBorderOutlined } from "@material-ui/icons";
import { formatDate, formatNumber } from "../../utils";

export default function ListSearchManager({ focusedIndex, data, handleOnClickItem }) {
  const resultContainer = useRef();
  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [focusedIndex]);
  return (
    <>
      <div className="items">
        <>
          {data.map((item, index) => (
            <div
              className="item"
              ref={index === focusedIndex ? resultContainer : null}
              key={index}
              style={{
                backgroundColor: index === focusedIndex ? "#dfdfdf" : "",
              }}
              onClick={() => handleOnClickItem(item)}
            >
              {item?.isoportunity == false && item?.isclient == false && (
                <ul className="container">
                  <li className="person">
                    <Person />
                  </li>
                  <li className="div">
                    <p className="dates">
                      Datos Prospecto {item.discarted && <span className="discarted">(Prospecto descartado)</span>}
                    </p>
                    <p className="email">
                      <span>Nombre:</span> {item?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span> {item?.email}
                    </p>
                    <p className="date">
                      <span>Fecha Creación:</span> {formatDate(item?.createdAt)}
                    </p>
                    <p className="dates">
                      <span>Datos Ejecutivo:</span>
                    </p>
                    <p className="email">
                      <span>Nombre:</span> {item?.ejecutive?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span> {item?.ejecutive?.email}
                    </p>
                  </li>
                </ul>
              )}
              {item?.isoportunity == true && item?.isclient == false && (
                <ul className="container">
                  <li className="person">
                    <StarBorderOutlined />
                  </li>
                  <li className="div">
                    <p className="dates">
                      Datos Oportunidad {item.discarted && <span className="discarted">(Oportunidad descartada)</span>}
                    </p>
                    <p className="email">
                      <span>Nombre:</span>
                      {item?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span>
                      {item?.email}
                    </p>

                    <p className="dates">
                      <span>Datos Ejecutivo:</span>
                    </p>
                    <p className="email">
                      <span>Nombre:</span> {item?.ejecutive?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span> {item?.ejecutive?.email}
                    </p>
                  </li>
                </ul>
              )}
              {item?.isclient == true && item?.isoportunity == true && (
                <ul className="container">
                  <li className="person">
                    <BusinessOutlined />
                  </li>
                  <li className="div">
                    <p className="dates">
                      <span>Datos del cliente:</span>
                    </p>
                    <p className="email">
                      <span>Nombre:</span>
                      {item?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span>
                      {item?.email}
                    </p>

                    <p className="dates">
                      <span>Datos Ejecutivo:</span>
                    </p>
                    <p className="email">
                      <span>Nombre:</span> {item?.ejecutive?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span> {item?.ejecutive?.email}
                    </p>
                  </li>
                </ul>
              )}
              {item?.isclient == true && item?.isoportunity == false && (
                <ul className="container">
                  <li className="person">
                    <BusinessOutlined />
                  </li>
                  <li className="div">
                    <p className="dates">
                      <span>Datos Cliente:</span>
                    </p>
                    <p className="email">
                      <span>Nombre:</span> {item?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span> {item?.email}
                    </p>
                    <p className="date">
                      <span>Fecha Creación:</span> {formatDate(item?.createdAt)}
                    </p>

                    <p className="dates">
                      <span>Datos Ejecutivo:</span>
                    </p>
                    <p className="email">
                      <span>Nombre:</span> {item?.ejecutive?.fullname}
                    </p>
                    <p className="email">
                      <span>Correo:</span> {item?.ejecutive?.email}
                    </p>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </>
      </div>
    </>
  );
}
