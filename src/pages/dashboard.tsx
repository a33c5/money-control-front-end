
import { styled } from "solid-styled-components"
import { NavBar } from "../components/dashboard/navBar"
import { ContainerInput } from "../components/dashboard/containerInput"
import { TotalCards } from "../components/dashboard/totalCards"
import { GraphicComponent } from "../components/dashboard/graphicComponent"

const ContainerMaster = styled('div')`
    display: flex;
    width: 100vw;
    gap: 20px;
    flex-direction: column;
`

export const DashBoard  = () => {
    return(
        <ContainerMaster>
            <NavBar/>
            <GraphicComponent/>
            <TotalCards/>
            <ContainerInput/>
        </ContainerMaster>

    )
} 