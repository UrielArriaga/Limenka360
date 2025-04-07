import React from "react";
import styled from "styled-components";
import { LinearProgress, Tooltip } from "@material-ui/core";
import dayjs from "dayjs";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { formatDate } from "../../../utils";
import router from "next/router";

export default function ReportingTable({ isLoaderTable, dataTable }) {
  const getDiferrenceDates = date => dayjs(date).fromNow();

  const checkThatItIsNotEmpty = value => {
    if (value != "" && value != null) {
      return value;
    } else {
      return "N/A";
    }
  };

  return (
    <TableComponentStyled>
      {isLoaderTable ? (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      ) : (
        <TableStyle>
          <TableHead>
            <tr>
              <th className="name">Nombre</th>
              <th>Correo</th>
              <th>Móvil</th>
              <th>Teléfono</th>
              <th>Categoria De Interés</th>
              <th>Código De Producto</th>
              <th>Género</th>
              <th>Puesto</th>
              <th>Empresa</th>
              <th>Comentarios</th>
              <th>Codigo Postal</th>
              <th>Estado</th>
              <th>Ciudad</th>
              <th>Colonia</th>
              <th>Calle</th>
              <th>Tipo De Cliente</th>
              <th>Fase</th>
              <th>Origen</th>
              <th>Etiquetas</th>
              <th>Título</th>
              <th>Especialidad</th>
              <th>Web</th>
              <th>Facebook</th>
              <th>Google Maps</th>
              <th>Fecha De Creación</th>
              <th>Ultima Actualización</th>
            </tr>
          </TableHead>

          <TableBody>
            {dataTable &&
              dataTable.map(item => (
                <tr key={item.id}>
                  <td className="name">
                    <div>
                      <div>{checkThatItIsNotEmpty(item.fullname)}</div>
                      <div className="created">
                        Ultimo seguimiento <span>{getDiferrenceDates(item.lastTracking.createdAt)} </span>
                      </div>
                      <div className="created">Creado el {dayjs(item.createdAt).format("DD/MM/YYYY")}</div>
                    </div>
                    <Tooltip
                      title="Abrir Prospecto"
                      onClick={() =>
                        router.push({ pathname: "../prospectos/[prospecto]", query: { prospecto: item.id } })
                      }
                    >
                      <OpenInNewIcon className="icon" />
                    </Tooltip>
                  </td>
                  <td>{checkThatItIsNotEmpty(item.email)}</td>
                  <td>{checkThatItIsNotEmpty(item.phone)}</td>
                  <td>{checkThatItIsNotEmpty(item.optionalphone)}</td>
                  <td>{checkThatItIsNotEmpty(item.category?.name)}</td>
                  <td>{checkThatItIsNotEmpty(item.product)}</td>
                  <td>{checkThatItIsNotEmpty(item.gender)}</td>
                  <td>{checkThatItIsNotEmpty(item.job)}</td>
                  <td>{checkThatItIsNotEmpty(item.clientcompany?.companyname)}</td>
                  <td>{checkThatItIsNotEmpty(item.observations)}</td>
                  <td>{checkThatItIsNotEmpty(item.postal?.postal_code)}</td>
                  <td>{checkThatItIsNotEmpty(item.entity.name)}</td>
                  <td>{checkThatItIsNotEmpty(item.city?.name)}</td>
                  <td>{checkThatItIsNotEmpty(item.postal?.settlement)}</td>
                  <td>{checkThatItIsNotEmpty(item.street)}</td>
                  <td>{checkThatItIsNotEmpty(item.clienttype?.name)}</td>
                  <td>
                    {item.phase?.name ? (
                      <div className="phase" style={{ background: item.phase?.color ? item.phase?.color : "blue" }}>
                        {item.phase.name}
                      </div>
                    ) : (
                      <div className="phase">N/A</div>
                    )}
                  </td>
                  <td>{checkThatItIsNotEmpty(item.origin?.name)}</td>
                  <td>{checkThatItIsNotEmpty(item.prospectslabels[0]?.label?.label)}</td>
                  <td>{checkThatItIsNotEmpty(item.title)}</td>
                  <td>{checkThatItIsNotEmpty(item.specialty?.name)}</td>
                  <td>{checkThatItIsNotEmpty(item.url)}</td>
                  <td>{checkThatItIsNotEmpty(item.facebook)}</td>
                  <td>{checkThatItIsNotEmpty(item.location)}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>{formatDate(item.updatedAt)}</td>
                </tr>
              ))}
          </TableBody>
        </TableStyle>
      )}
      {!isLoaderTable && dataTable.length <= 0 && (
        <TableEmptyFake>
          <div className="message_ctr">
            <img src="/empty_table.svg" />
            <p>Aun no hay datos</p>
          </div>
        </TableEmptyFake>
      )}
    </TableComponentStyled>
  );
}

const TableComponentStyled = styled.div`
  background-color: #fff;
  width: 100%;
  height: 65vh;
  //max-height: 70vh;
  overflow-x: auto;
  overflow-y: auto;
  transition: all 0.3s ease;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }

  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide_img {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;

const TableStyle = styled.table`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #dce1f6;

  th {
    padding: 10px;
  }

  .name {
    position: sticky;
    left: 0;
    padding-left: 10px;
    top: 0;
    background: #405189;
    color: #fff;
    min-width: 150px;
    text-transform: capitalize;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    text-align: left;
  }
`;

const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
  font-weight: bold;
  font-size: 14px;
  background-color: #e5efff;

  td {
    padding: 5px 10px;
    min-width: 230px;
    min-height: 63px;
    //z-index: -1;
    width: inherit;
    .phase {
      background-color: gray;
      text-transform: uppercase;
      border-radius: 4px;
      color: #fff;
      padding: 4px 4px;
      font-size: 12px;
      font-weight: normal;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }

  .name {
    display: grid;
    grid-template-columns: auto 30px;
    min-width: 230px;
    background-color: #e5efff;
    color: #0d47a1;
    font-weight: bold;
    font-size: 14px;
    text-transform: capitalize;
    position: sticky;
    left: 0;
    top: 0;
    .created {
      font-size: 11px;
      color: #616161;
      font-weight: 500;
    }
    .icon {
      color: #000;
      width: 15px;
      height: 15px;
    }
  }

  tr {
    :hover td {
      background-color: #d8dbe6;
    }
  }
`;

const TableEmptyFake = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 250px;
  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;
