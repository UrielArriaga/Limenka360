import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import CompletedPurchaseOrderTray from '../../../features/CompletedPurchaseOrderTray'

function Ordenes() {
  return (
    <CommoShoppingLayout role='director_compras'>
      <CompletedPurchaseOrderTray/>
    </CommoShoppingLayout>
  )
}

export default Ordenes
