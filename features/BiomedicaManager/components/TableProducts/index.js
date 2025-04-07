import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import { PeopleAlt } from "@material-ui/icons";

function TableProducts() {
  const data = [
    {
      name: "Artículos",
      Completados: 4000,
      NoCompletados: 2400,
      Encontrados: 2900,
    },
  ];

  return (
    <div style={{ border: "5px solid #ccc", borderRadius: "8px", overflow: "hidden", width: "100%"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Completados</TableCell>
              <TableCell>No Completados</TableCell>
              <TableCell>Encontrados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.Completados}</TableCell>
                <TableCell>{row.NoCompletados}</TableCell>
                <TableCell>{row.Encontrados}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    
    </div>
  );
}

export default TableProducts;