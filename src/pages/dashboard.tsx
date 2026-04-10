
import { styled } from "solid-styled-components"
import { NavBar } from "../components/navBar"
import { ContainerInput } from "../components/containerInput"

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
            <ContainerInput/>
        </ContainerMaster>

    )
} 