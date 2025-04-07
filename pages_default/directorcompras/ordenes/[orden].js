import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import Order from "../../../features/DirComprasOrders/order"

function PurchaseOrder() {
  return (
    <CommoShoppingLayout role='director_compras'>
        <Order/>
    </CommoShoppingLayout>
  )
}

export default PurchaseOrder;
