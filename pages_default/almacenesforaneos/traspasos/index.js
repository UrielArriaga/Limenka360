import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout';
import MasterAttendantTransfers from '../../../features/MasterAttendantTransfers';

function Traspasos() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterAttendantTransfers/>
    </CommonLogLayout>
  )
}

export default Traspasos;