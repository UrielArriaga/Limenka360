import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import DirComprasPedidos from '../../../features/DirComprasPedidos'

function Pedidos() {
  return (
    <CommoShoppingLayout role='director_compras'>
      <DirComprasPedidos/>
    </CommoShoppingLayout>
  )
}

export default Pedidos
