import React from 'react'
import CommoShoppingLayout from '../../../../layouts/CommoShoppingLayout'
import ShoppingNacionalEditPurchaseOrder from '../../../../features/ShoppingNacionalEditPurchaseOrder'

function EditOrder() {
  return (
    <CommoShoppingLayout role='compras'>
        <ShoppingNacionalEditPurchaseOrder/>
    </CommoShoppingLayout>
  )
}

export default EditOrder
