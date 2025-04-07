import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import MasterAdminDevoluciones from '../../../features/MasterAdminDevoluciones';

function Devoluciones() {
  return (
    <CommonLogLayout role={"master_almacen"}>
        <MasterAdminDevoluciones/>
    </CommonLogLayout>
  )
}

export default Devoluciones;
