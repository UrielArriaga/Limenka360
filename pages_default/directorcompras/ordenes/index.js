import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import DirComprasOrders from '../../../features/DirComprasOrders'

function Ordenes() {
  return (
    <CommoShoppingLayout role='director_compras'>
      <DirComprasOrders/>
    </CommoShoppingLayout>
  )
}

export default Ordenes
