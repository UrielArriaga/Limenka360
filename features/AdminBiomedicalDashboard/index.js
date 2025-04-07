import React, {useState} from "react";
import { BiomedicaManagerStyle } from "./styles";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { Dashboard } from "@material-ui/icons";
import DashboardCalendarBio from "./components/DashboardCalendarBio";
import GraphProducts from "./components/GraphProducts";
import useGetProducts from "./hooks/useGetProducts";
import Select from "react-select";
import LateralCards from "./components/LateralCards";


function AdminBiomedicalDashboard({ type }) {
  const {
    userData: { name, lastname },
  } = useSelector(userSelector);
  const { dataProducts } = useGetProducts();
  console.log(dataProducts, " dataproducts");

    const getDates = [
      { id: 1, label: "Día", value: "day" },
      { id: 2, label: "Semana", value: "week" },
      { id: 3, label: "Mes", value: "month" },
    ];
    const [selectRange, setSelectRange] = useState(getDates[1]);


  return (
    <BiomedicaManagerStyle>
      <div className="content_biome">
        <div className="content_biome__header">
          <h4 className="title_header">
            <span>Hoy, {dayjs(new Date()).format("DD MMMM YYYY")} </span>
            <span>Buen día , {`${name} ${lastname}`}</span>
          </h4>
        </div>
       
        <div className="content_filters">                            
          <p className="title_filter">Filtrar por : </p>
          <Select
            className="select-options"
            placeholder="selecciona aun rango de fechas"
            options={getDates}
            // isClearable={true}
            onChange={e => setSelectRange(e)}
            value={selectRange}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.label}
          />
        </div>
   
        <LateralCards />

        <div className="contentDataGeneral">
          <div className="content_biome__calendar">
            <DashboardCalendarBio />
          </div>

          <div className="content_biome__graph">
            <h3>Tabla de Pendientes Biomedica</h3>
            <GraphProducts />
          
          </div>
        </div>
      </div>
    </BiomedicaManagerStyle>
  );
}

export default AdminBiomedicalDashboard;
