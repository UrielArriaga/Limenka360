import React, {useState} from "react";
import { Grid } from "@material-ui/core";
import { BiomedicaManagerStyle } from "./styles";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { PeopleAlt} from "@material-ui/icons";
import DashboardCalendarBio from "./components/DashboardCalendarBio";
//import TableProducts from "./components/TableProducts";
import useGetProducts from "./hooks/useGetProducts";
import Select from "react-select";
import LateralCards from "./components/LateralCards";

function BiomedicaManager({ type }) {
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
          <h2 className="title_header">
            <span>Hoy, {dayjs(new Date()).format("DD MMMM YYYY")} </span>
            <div>
            <h3>Buen día , {`${name} ${lastname}`}</h3>
            </div>
          </h2>
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
          <div className="content_biome__table">
            <div className="entryicon">
              <h3>Pendientes por realizar</h3>
            <PeopleAlt />
            </div>
            <Grid item md={4}>
           
          </Grid>
          </div>
        </div>
      </div>
    </BiomedicaManagerStyle>
  );
}

export default BiomedicaManager;
