import { styled } from "solid-styled-components"

const ContainerMaster = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100px;
    background-color: #ffffff;
    box-shadow: 0 10px 25px rgba(26, 10, 255, 0.08);
`
const Logo = styled('img')`
    width: 250px;
    height: auto;
`

export const NavBar  = () => {
    return(
        <ContainerMaster>
            <Logo src="/assets/logo.png"/>
        </ContainerMaster>
    )
}