import React from 'react'
import NavBarDashboard from '../../components/NavBarDashboard'
import SideBar from '../../components/SideBar'
import { LayoutInteligencia } from '../../styles/InteligenciaComercial/dashboard.styled'

export default function InteligenciaComercial() {
    return (
        <LayoutInteligencia>
            <SideBar />
            <NavBarDashboard sideBar={true} />
        </LayoutInteligencia>
    )
}
