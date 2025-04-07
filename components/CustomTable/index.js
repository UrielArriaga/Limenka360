import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { MoreVert, Delete } from "@material-ui/icons"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const rows = [
  {id: "12345", name: "CVJOBS", auditoria: "SI"},
  {id: "6789", name: "MEDICALBUY", auditoria: "NO"},
];

export default function DenseTable() {
  const classes = useStyles();
  const [isActive, setIsActive] = useState([]);
  const [selected, setSelected] = useState("");
  const [hiddenOptionsItem, setHiddenOptionsItem] = useState([]);
  const [hiddenOptionsBoolean, setHiddenOptionsBoolean] = useState(false);
    
  useEffect(() => {
    console.log(selected)
  }, [selected])
  
  const handleOptions = (index, id) =>{
    if(isActive.indexOf(id) == -1){
      setIsActive([id])
    }
    else{
      setIsActive([])
    }
  }
  

  return (
    <DenseTableStyled>
    <div className="tableGroups">
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className="tableHead">
          <TableRow className="rowHead">
            <TableCell className="cellHead">GRUPO</TableCell>
            <TableCell className="cellHead" align="right">AUDITORIA</TableCell>
            <TableCell className="cellHead" align="right">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow id={index} key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.auditoria}</TableCell>
              <TableCell align="right">
                <div className="dropdown">
                  <div ><MoreVert className="dropdown-btn" onClick={(e)=>{handleOptions(index, row.id)}}/></div>
                  {isActive.indexOf(row.id)!==-1?(
                  <div className="dropdown-content">
                    <div id={index} className="dropdown-item" onClick={(e)=>{setSelected(e.target.id)}}>
                       <Delete/> Eliminar
                    </div>
                  </div>
                  ):null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </DenseTableStyled>
  );
}

const DenseTableStyled = styled.div`
  .tableGroups{
    .tableHead {
      .rowHead {
        .cellHead {
          background-color: #695bd1;
          color: white;
          font-weight: bold;
          padding-top: 20px;
          padding-block-end: 20px;
          font-size: 16px;
          border: none;
        }
      }
    }
    .dropdown{
      position: relative;
      user-select: none;
      .dropdown-btn{
        box-shadow: 1px 1px 1px 2px ;
        border-radius: 2px;
        background-color: rgba(25, 118, 210,.8);
        color: white;
        cursor: pointer;
      }
      .dropdown-content{
        position: absolute;
        bottom: 20%;
        left: 60%;
        .dropdown-item{
          transition: all 0.2s;
          cursor: pointer;
          &:hover{
            background: #f4f4f4;
          }
        }
      }
    }
  }
`;