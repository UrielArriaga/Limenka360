import React from 'react'
import CommoShoppingLayout from '../../layouts/CommoShoppingLayout'
import DirPurchasingDashboard from '../../features/DirPurchasingDashboard'

function Dashborad() {
  return (
    <CommoShoppingLayout role='director_compras'>
      <DirPurchasingDashboard/>
    </CommoShoppingLayout>
  )
}

export default Dashborad
