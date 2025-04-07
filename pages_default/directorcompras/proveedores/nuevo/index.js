import React from 'react'
import DirComprasNewProvider from '../../../../features/DirComprasNewProvider'
import CommoShoppingLayout from '../../../../layouts/CommoShoppingLayout'

function NewProvider() {
  return (
    <CommoShoppingLayout role='director_compras'>
        <DirComprasNewProvider/>
    </CommoShoppingLayout>
  )
}

export default NewProvider
