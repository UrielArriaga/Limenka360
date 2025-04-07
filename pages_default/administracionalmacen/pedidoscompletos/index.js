import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import AdminAlmacenPedidosCompletos from '../../../features/AdminAlmacenPedidosCompletos'

function PedidosCompletados() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
        <AdminAlmacenPedidosCompletos/>
    </CommonLogLayout>
  )
}

export default PedidosCompletados
