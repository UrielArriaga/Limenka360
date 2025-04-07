import React from "react";
import { DirLogDashboardStyled } from "./styles";
import DatePicker from "../../components/DatePicker";
import { Grid } from "@material-ui/core";
import Graph from "./components/Graph";
import TableOrder from "./components/TableOrder";
import useInventoryEntries from "./hooks/useInventoryEntries";
import useInventoryExit from "./hooks/useInventoryExit";
import useWhereHouseProducts from "./hooks/useWhereHouseProducts";

export default function DirLogDashboard() {
  const { allEntries } = useInventoryEntries();
  const { allExit  } = useInventoryExit();
  const { allProducts } = useWhereHouseProducts();
  return (
    <DirLogDashboardStyled>
      <div className="header">
        <h3>Vista General</h3>
        <div className="header__actions">
          {/* <DatePicker color="#034D6F" /> */}
        </div>
      </div>

      <div className="main">
        <Grid container spacing={2}>
          <Grid item md={6}>
            <div className="resume">
              <div className="resume__header">Activdad de Movimientos</div>
              <div className="resume__content">
                <div className="resume__content--item">
                  <p className="count blue">{allEntries?.count}</p>
                  <p className="label">Entradas</p>
                </div>

                <div className="resume__content--item">
                  <p className="count red ">{allExit?.count}</p>
                  <p className="label">Salidas</p>
                </div>

                <div className="resume__content--item">
                  <p className="count green">{allProducts?.count}</p>
                  <p className="label">Inventario</p>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item md={4}>
            <div className="resumeinventory">
              <div className="resumeinventory__header">Resumen de Inventario</div>

              <div className="resumeinventory__content">
                <div className="resumeinventory__content--item">
                  <p className="label">Cantidad Disponible</p>
                  <p className="count blue">30</p>
                </div>

                <div className="resumeinventory__content--item">
                  <p className="label">Salidas</p>
                  <p className="count red">30</p>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item md={5}>
            <div className="resumeproducts">
              <div className="resumeproducts__header">Detalles de producto</div>
              <div className="resumeproducts__content">
                <div className="resumeproducts__content__col">
                  <div className="row">
                    <p>Articulos con poca existencia</p> <span>0</span>
                  </div>

                  <div className="row">
                    <p>Articulos con poca existencia</p> <span>0</span>
                  </div>
                  <div className="row">
                    <p>Todos los Productos</p> <span>0</span>
                  </div>
                </div>

                <div className="resumeproducts__content__col"></div>
              </div>
            </div>
          </Grid>

          <Grid item md={5}>
            <div className="moreoutputs">
              <div className="moreoutputs__header">Producto con mas salidas</div>

              <div className="moreoutputs__content">
                <p>Productos sin salidas</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className="moreoutputs">
              <div className="moreoutputs__header">Salidas</div>
              <div className="moreoutputs__gra">
                <Graph />
              </div>
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className="moreoutputs">
              <div className="moreoutputs__header">Ordenes de compra</div>
              <div className="moreoutputs__gra">
                <TableOrder/>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </DirLogDashboardStyled>
  );
}
