import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import DirComprasProducts from '../../../features/DirComprasProducts'

function Productos() {
  return (
    <CommoShoppingLayout role='director_compras'>
      <DirComprasProducts/>
    </CommoShoppingLayout>
  )
}

export default Productos
