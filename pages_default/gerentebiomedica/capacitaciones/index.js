import React from 'react'
import CommonLogLayout from '../../../layouts/CommonLogLayout'
import BiomedicalManagerTraining from '../../../features/BiomedicalManagerTraining'

function Capacitaciones() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
        <BiomedicalManagerTraining/>
    </CommonLogLayout>
  )
}

export default Capacitaciones
