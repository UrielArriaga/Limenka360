import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import AdminBiomedicalFacilities from '../../../features/AdminBiomedicalFacilities'

function Instalaciones() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
        <AdminBiomedicalFacilities/>
    </CommonLogLayout>
  )
}

export default Instalaciones
