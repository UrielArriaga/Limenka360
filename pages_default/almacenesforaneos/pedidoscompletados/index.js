import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import MasterAlmacenPedidosComplete from '../../../features/MasterAlmacenPedidosCompletos';

function PedidosCompletos() {
  return (
   <CommonLogLayout role={"master_almacen"}>
    <MasterAlmacenPedidosComplete/>
   </CommonLogLayout>
  )
}

export default PedidosCompletos;
