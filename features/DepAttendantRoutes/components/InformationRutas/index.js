import React from "react";
import { InformationRouteStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import dayjs from "dayjs";
import useShowOrders from "../../hooks/useShowOrders";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function InformationRutas({ routeSelected }) {
  const { data } = routeSelected;
  const { inventoryexits, isLoading } = useShowOrders(data?.id);

  const thereIsDatas = data => (data ? <p className="description">{data}</p> : <p className="na">N/A</p>);

  const style = {
    tableRow: { backgroundColor: "#405189" },
    tableCell: {
      color: "#fff",
      fontWeight: "bold",
    },
  };

  return (
    <InformationRouteStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información del Chofer</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Nombre:</p>
            <p>{thereIsDatas(data?.driver?.name)}</p>
          </div>
          <div className="label">
            <p className="name">Licencia:</p>
            {thereIsDatas(data?.driver?.license)}
          </div>
          <div className="label">
            <p className="name">RFC:</p>
            {thereIsDatas(data?.driver?.RFC)}
          </div>
          <div className="label">
            <p className="name">Fecha de expiracion:</p>
            {thereIsDatas(dayjs(data?.driver?.expiration_date).format("YYYY/MM/DD"))}
          </div>
        </div>
      </div>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información de la Unidad</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Marca:</p>
            <p>{thereIsDatas(data?.transportunit?.brand)}</p>
          </div>
          <div className="label">
            <p className="name">Modelo:</p>
            {thereIsDatas(data?.transportunit?.model)}
          </div>
          <div className="label">
            <p className="name">Tarjeta de circulacion:</p>
            {thereIsDatas(data?.transportunit?.circulation_card)}
          </div>
          <div className="label">
            <p className="name">Número de motor:</p>
            {thereIsDatas(data?.transportunit?.engine_number)}
          </div>
          <div className="label">
            <p className="name">Póliza:</p>
            {thereIsDatas(data?.transportunit?.insurance_policy)}
          </div>
          <div className="label">
            <p className="name">Serie de vehículo:</p>
            {thereIsDatas(data?.transportunit?.vehicle_series)}
          </div>
          <div className="label">
            <p className="name">kilometraje:</p>
            {thereIsDatas(data?.transportunit?.mileage)}
          </div>
          <div className="label">
            <p className="name">Matricula:</p>
            {thereIsDatas(data?.transportunit?.tuition)}
          </div>
        </div>
      </div>

      <div className="order">
        <div className="order__title">
          <Assignment className="icon" />
          <h4>Ordenes</h4>
        </div>

        {isLoading ? (
          <p>Cargando...</p>
        ) : inventoryexits.length <= 0 ? (
          <p>No hay ordenes</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={style.tableRow}>
                <TableCell style={style.tableCell}>Folio Salida</TableCell>
                  <TableCell style={style.tableCell}>Folio</TableCell>
                  <TableCell style={style.tableCell}>Recibe </TableCell>
                  <TableCell style={style.tableCell}>Teléfono </TableCell>
                  <TableCell style={style.tableCell}>Total </TableCell>
                  <TableCell style={style.tableCell}>Estado de salida </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryexits?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row?.folio}</TableCell>
                    <TableCell>{row?.order?.folio}</TableCell>
                    <TableCell>{row?.order?.receive}</TableCell>
                    <TableCell>{row?.order?.phone}</TableCell>
                    <TableCell>${row?.order?.total}</TableCell>
                    <TableCell>{row?.order?.exitstatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </InformationRouteStyled>
  );
}
