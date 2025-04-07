import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import DirPurchasingPayments from '../../../features/DirPurchasingPayments'

function index() {
  return (
   <CommoShoppingLayout role='director_compras'>
        <DirPurchasingPayments/>
   </CommoShoppingLayout>
  )
}

export default index
