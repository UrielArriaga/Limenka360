import React from "react";
import { DashStyled } from "./style";
import StatsCards from "./components/StatsCards";
import DataChart from "./components/DataChart";
import { useAdminManagerDash } from "./hooks/useAdminManagerDash";
import { KeyboardDatePicker } from "@material-ui/pickers";
import "moment/locale/es";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
export function AdminManagerDash() {
  const {
    startDate,
    endDate,
    data,
    counters,
    isFechingCounter,
    handleDateChange,
    tableData,
    paginationData,
    totalOrders,
  } = useAdminManagerDash();

  return (
    <DashStyled>
      <div className="header">
        <div>
          <h3>Hola</h3>
          <p>Bienvenido a Limenka 360</p>
        </div>
        <div className="dates">
          <KeyboardDatePicker
            disableToolbar
            format="DD-MM-YYYY"
            views={["year", "month", "date"]}
            margin="normal"
            id="date-picker-inline"
            className="inputdate inputdate_lte"
            value={startDate}
            InputProps={{ disableUnderline: true, readOnly: true }}
            onChange={date => handleDateChange(date, "start")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            format="DD-MM-YYYY"
            views={["year", "month", "date"]}
            margin="normal"
            id="date-picker-inline"
            className="inputdate inputdate_lte"
            value={endDate}
            InputProps={{ disableUnderline: true, readOnly: true }}
            onChange={date => handleDateChange(date, "finish")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </div>
      </div>
      <StatsCards counters={counters} isFechingCounter={isFechingCounter} />
      <div className="table">
        <h3>Pedidos por administrador</h3>
        <DataChart results={data} />
      </div>

      <div className="tableDataGeneral">
        <h3 className="title">Total de pedidos por administrador</h3>
        <div className="container">
          <TableLimenkaGeneral
            mainColumn={"Grupo"}
            heads={tableData.heads}
            isLoading={isFechingCounter}
            data={tableData.data}
            customColumns={tableData.customColumns}
            typeTable="border"
            typeActions="icon"
            rowsLoader={300}
          />
        </div>
      </div>
    </DashStyled>
  );
}
