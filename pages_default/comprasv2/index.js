import React from 'react'
import CommoShoppingLayout from '../../layouts/CommoShoppingLayout';
import ShoppingNacionalOrders from '../../features/ShoppingNacionalOrders';

function Pedidos() {
  return (
    <CommoShoppingLayout role='compras'>
      <ShoppingNacionalOrders/>
    </CommoShoppingLayout>
  )
}

export default Pedidos;
