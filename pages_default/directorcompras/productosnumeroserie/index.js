import React from 'react'
import CommoShoppingLayout from '../../../layouts/CommoShoppingLayout'
import ProductsNumberSerial from '../../../features/DirComprasProductsNumberSerial'

export default function ProductsBySerialNumber() {
  return (
     <CommoShoppingLayout role='director_compras'>
        <ProductsNumberSerial/>
        </CommoShoppingLayout>
  )
}
