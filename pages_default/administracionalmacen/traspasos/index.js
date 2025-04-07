import React from 'react'
import CommonLogLayout, { rolesCommonLaoyut } from '../../../layouts/CommonLogLayout';
import AdminAlmacenTraspasos from '../../../features/AdminAlmacenTraspasos';

function Traspasos() {
  return (
    <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>
        <AdminAlmacenTraspasos/>
    </CommonLogLayout>
  )
}

export default Traspasos;