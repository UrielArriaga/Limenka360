
 import { api } from "../../services/api";
 import {useEffect, useState} from "react";
 import styled from "styled-components";
 import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import dayjs from "dayjs";
import { months } from "../../BD/databd";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Grid
    } from "@material-ui/core";

import {
    Email,
    Phone

} from "@material-ui/icons";
   

const ProspectsEjecutive = () => {

const [dataprospect, Setdataprospect] = useState([]);
const [loader, setLoader] = useState(false);
const { id_user } = useSelector(userSelector);
const [order, setOrder] = useState({ value: "-createdAt", label: "Fecha de Creación" });
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(7);


useEffect(() => {
    getProspect();
  }, []);


const getProspect = async () => {
    try {
        let query = {};
        query.ejecutiveId = id_user;
        query.isclient= false;
        query.isoportunity = false;
        let include = "city,entity,phase,ejecutive,clientcompany";
        let prospect = await api.get(
            `prospects?where=${JSON.stringify(query)}&include=${include}&order=${order.value}&skip=${page}&count=1&limit=${limit}`
          );
          Setdataprospect(prospect.data.results);
} catch (error) {
    console.log(error);
  }
}

function formatDate(str) {
    let dates = dayjs(str);
    let month = months.filter((i, ix) => ix == dates.month());
    let day = dates.format("D");
    let year = dates.year();
    return `${month[0]} ${day}, ${year}`;
  }

    // * mayuscula
    function formatUpperCase(str) {
      return str[0].toUpperCase() + str.slice(1);
    }

  return (

    
    <TableProspects>
    <TableContainer>
    <Table className="table">
      <TableHead className="tablehead">
      <TableRow className="row">
      <TableCell className="cellhead">Nombre</TableCell>
      <TableCell className="cellhead">Correo</TableCell>
      <TableCell className="cellhead">Movil</TableCell>
      <TableCell className="cellhead">Comentarios</TableCell>
      <TableCell className="cellhead">Fase</TableCell>
      <TableCell className="cellhead">Fecha Creación</TableCell>
      </TableRow>
      </TableHead>

        <TableBody>
        {dataprospect?.map((prospect, id) => (
        <TableRow key={id} className="rowBody">
        <TableCell className="cell">
          <div className="name">{formatUpperCase(prospect.name)} {formatUpperCase(prospect.lastname)}</div>
        </TableCell>
        <TableCell className="cell">
            <Email className="icon_mail" />{prospect.email}
        </TableCell>
        <TableCell className="cell">
           <Phone className="icon_telefono" /> {prospect.phone}
        </TableCell>
          <TableCell className="cell">
          {formatUpperCase(prospect.observations)}   
        </TableCell>
            <TableCell className="cell">
        <div style={{ color: (prospect.phase.color), fontWeight:700}}>{formatUpperCase(prospect.phase.name)} </div>  
        </TableCell>
        <TableCell className="cell">
        <div className="date">{formatDate(prospect.createdAt)}  </div>
        </TableCell>
        </TableRow>  
        ))}  
        </TableBody>

      </Table>
      
      {dataprospect.length == 0 && (
                    <div className="emptyData">
                    <img src="/empty_table.svg" />
                    </div>
                  )}
      </TableContainer>

    </TableProspects>
      
  )
}

export default ProspectsEjecutive

export const TableProspects = styled.div`
margin-top:40px;

.table{
    border: 1px solid #e8e8f7!important;
}

.cellhead{
    font-weight:700;
}

.icon_mail {
    color: green;
    width: 20px;
    height: 15px;
}
.icon_telefono {
    color: #1deafe;
    width: 20px;
    height: 15px;
}
.name {
    font-weight:700;
}
.date {
    color: #6259ca;
    font-weight: 700;
}
.emptyData {
    display: flex;
    justify-content: center;
    padding: 12px;

    img{
      width: 32%;
    }
}

`;