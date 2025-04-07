import React from 'react'
import AdminAlmacenRoutes from '../../../features/AdminAlmacenRoutes'
import CommonLogLayout from '../../../layouts/CommonLogLayout'

function AdminAlmacenRutas() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
        <AdminAlmacenRoutes/>
    </CommonLogLayout>
  )
}

export default AdminAlmacenRutas;
