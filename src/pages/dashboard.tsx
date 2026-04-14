
import { styled } from "solid-styled-components"
import { NavBar } from "../components/dashboard/navBar"
import { ContainerInput } from "../components/dashboard/containerInput"
import { TotalCards } from "../components/dashboard/totalCards"

const ContainerMaster = styled('div')`
    display: flex;
    width: 100vw;
    height: 100vh;
    gap: 20px;
    flex-direction: column;
`

export const DashBoard  = () => {
    return(
        <ContainerMaster>
            <NavBar/>
            <TotalCards/>
            <ContainerInput/>
        </ContainerMaster>

    )
} 