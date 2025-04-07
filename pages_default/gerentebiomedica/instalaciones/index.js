import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import BiomedicalFacilitiesManager from '../../../features/BiomedicalFacilitiesManager'

function Instalaciones() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
        <BiomedicalFacilitiesManager/>
    </CommonLogLayout>
  )
}

export default Instalaciones
