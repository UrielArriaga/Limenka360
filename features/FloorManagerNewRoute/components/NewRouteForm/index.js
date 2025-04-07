import React from 'react';
import { Grid } from '@material-ui/core';
import SelectCRM from '../../../../components/SelectCRM/SelectCRM';
import TableProducts from '../TableProducts/TableProducts';
import InputCRM from '../../../../components/InputCRM/InputCRM';

const NewRouteForm = ({ order, drivers, preOptions, trasportunits, testProducts, handleOpenDrawer, readTemplate }) => {
  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <h3>Nueva Ruta</h3>
      </Grid>
      <Grid item xs={12}>
        <InputCRM text="Folio" value={order?.folio} disabled />
      </Grid>
      <Grid item xs={12}>
        <InputCRM text="Cantidad de productos" value={order?.oportunity.quantity} disabled />
      </Grid>
      <Grid item xs={6}>
        <SelectCRM text="Chofer" options={drivers || preOptions} />
      </Grid>
      <Grid item xs={6}>
        <SelectCRM text="Unidad" options={trasportunits || preOptions} />
      </Grid>
      <Grid item xs={12}>
        <InputCRM text="Observaciones" value={order?.observations} disabled />
      </Grid>
      <Grid item xs={12}>
        <p style={{ marginBottom: '15px', color: '#565656', fontWeight: 600, fontSize: '14px' }}>Productos</p>
        <TableProducts data={testProducts} handleOpenDrawer={handleOpenDrawer} readTemplate={readTemplate} />
      </Grid>
    </Grid>
  );
};

export default NewRouteForm;
