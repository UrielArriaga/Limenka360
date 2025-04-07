import React from 'react'
import CommoShoppingLayout from '../../../../layouts/CommoShoppingLayout'
import ShoppingNacionalNewOrder from '../../../../features/ShoppingNacionalNewOrder'

function NewOrder() {
  return (
    <CommoShoppingLayout role='compras'>
        <ShoppingNacionalNewOrder/>
    </CommoShoppingLayout>
  )
}

export default NewOrder
