import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

export default function ProductTable({dataProductsDemo}) {
  const [loader] = useState(false);
  return (
    <TableContainer component={Paper} fullWidth style={{  margin: 'auto', marginTop: '20px' }}>
      <Table>
        <TableHead style={{background: '#405189' }}>
          <TableRow  >
            <TableCell style={{ fontWeight: 'bold', color:'#fff' }}>Modelo</TableCell>
            <TableCell style={{ fontWeight: 'bold', color:'#fff' }}>Nro de Serie</TableCell>
            <TableCell style={{ fontWeight: 'bold', color:'#fff'}}>Descripción</TableCell>
            <TableCell style={{ fontWeight: 'bold', color:'#fff' }} align="center" >Nro de piezas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loader? (
            dataProductsDemo.map((product, index) => (
              <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
              </TableRow>
            )) )
          :
          (  <p> No hay productos seleccionados para mostrar en la demo </p> )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};