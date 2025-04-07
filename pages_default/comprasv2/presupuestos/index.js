import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout';
import ShoppingNacionalPresupuestos from '../../../features/ShoppingNacionalPresupuestos';

function Presupuestos() {
  return (
    <CommoShoppingLayout role='compras'>
        <ShoppingNacionalPresupuestos/>
    </CommoShoppingLayout>
  )
}

export default Presupuestos;
