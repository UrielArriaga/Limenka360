import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout';
import DepAttendantInventario from '../../../features/DepAttendantInventario';

function Inventario() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
        <DepAttendantInventario/>
    </CommonLogLayout>
  )
}

export default Inventario;
