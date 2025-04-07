import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import AdminBiomedicalTraining from '../../../features/AdminBiomedicalTraining'

function Capacitaciones() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
        <AdminBiomedicalTraining/>
    </CommonLogLayout>
  )
}

export default Capacitaciones
