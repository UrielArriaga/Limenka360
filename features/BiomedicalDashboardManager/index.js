import React from "react";
import { BiomedicaManagerStyle } from "./styles";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { Dashboard } from "@material-ui/icons";
import DashboardCalendarBio from "./components/DashboardCalendarBio";
import GraphProducts from "./components/GraphProducts";
import useGetProducts from "./hooks/useGetProducts";

function BiomedicalDashboardManager({ type }) {
  const {
    userData: { name, lastname },
  } = useSelector(userSelector);
  const { dataProducts } = useGetProducts();
  console.log(dataProducts, " dataproducts");

  return (
    <BiomedicaManagerStyle>
      <div className="content_biome">
        <div className="content_biome__header">
          <h4 className="title_header">
            <span>Hoy, {dayjs(new Date()).format("DD MMMM YYYY")} </span>
            <span>Buen día , {`${name} ${lastname}`}</span>
          </h4>
        </div>
        <div className="content_biome__countersCard">
          <div className="cardCounter entries">
            <div className="icon">
              <Dashboard className="entry" />
            </div>
            <div className="infoEntry">
              <p className="quantity">50</p>
              <p className="text">Total de Entradas</p>
            </div>
          </div>
          <div className="cardCounter entriesrevised">
            <div className="icon">
              <Dashboard className="entry" />
            </div>
            <div className="infoEntry">
              <p className="quantity">120</p>
              <p className="text">Entradas Revisadas</p>
            </div>
          </div>
          <div className="cardCounter productsFails">
            <div className="icon">
              <Dashboard className="entry" />
            </div>
            <div className="infoEntry">
              <p className="quantity">200</p>
              <p className="text">Productos Dañados</p>
            </div>
          </div>
        </div>

        <div className="contentDataGeneral">
          <div className="content_biome__calendar">
            <DashboardCalendarBio />
          </div>

          <div className="content_biome__graph">
            <h3>Grafica de Productos por Numero de Serie</h3>
            <GraphProducts />
            <p>Articulos con estatus <span>Revisado</span></p>
          </div>
        </div>
      </div>
    </BiomedicaManagerStyle>
  );
}

export default BiomedicalDashboardManager;
