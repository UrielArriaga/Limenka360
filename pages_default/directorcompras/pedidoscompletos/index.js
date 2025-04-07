import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import DirComprasPedidosComplete from '../../../features/DirComprasPedidosComplete'

function PedidosCompletos() {
  return (
    <CommoShoppingLayout role='director_compras'>
      <DirComprasPedidosComplete/>
    </CommoShoppingLayout>
  )
}

export default PedidosCompletos
