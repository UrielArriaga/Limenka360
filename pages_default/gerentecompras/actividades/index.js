import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import ActivitiesCompras from '../../../features/ActivitiesCompras'

function Actividades() {
  return (
    <CommoShoppingLayout role='gerente_compras'>
   <ActivitiesCompras role='gerente_compras'/>
    </CommoShoppingLayout>
  )
}

export default Actividades
