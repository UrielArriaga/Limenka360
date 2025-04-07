import React from 'react'
import DepAttendantPedidosCompletados from '../../../features/DepAttendantPedidosCompletados'
import CommonLogLayout from '../../../layouts/CommonLogLayout';

function PedidosCompletados() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
        <DepAttendantPedidosCompletados/>
    </CommonLogLayout>
  )
}

export default PedidosCompletados;
