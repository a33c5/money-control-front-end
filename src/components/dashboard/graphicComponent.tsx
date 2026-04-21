import { styled } from 'solid-styled-components'
import { useMoney } from './moneyContext'
import { For } from 'solid-js'
import { colors } from '../../utils/colors'


const ContainerMaster = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
`

const ContainerGraphic = styled('div')`
    display: flex;
    align-items: end;
    justify-content: center;
    width: 800px;
    height: 100%;
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
    /* border-left: 2px solid rgba(0, 0, 0, 0.1); */
    overflow: hidden;
    gap: 20px;
`
const MinimalContainerGrapphic = styled('div')`
     display: flex;
     justify-content: end;
     align-items: center;
     height: 100%;
     width: 50px;
     flex-direction: column;
     font-size: 10px;
`

const Colum = styled('div') <{ size: number, bg: string }>`
    width: 50px;
    height: ${(props) => props.size}px;
    background-color: ${(props) => props.bg};
    position: relative;
    cursor: pointer;
    `
const MinimalContainerInfo = styled('div')`
         display: flex;
         justify-content: center;
         align-items: center;
         flex-direction: column;
         height: 25px;
         width: 100px;
         h1 {
            font-size: 10px;
             font-weight: 350;
         }
    `

export const GraphicComponent = () => {

    const { debts } = useMoney()

    const rebalance = (size: number) => {
        return size * 0.2
    }

    const randomColor = () => {
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    return (
        <ContainerMaster>
            <ContainerGraphic>
                <For each={debts()}>
                    {(item) => (
                        <MinimalContainerGrapphic>
                            <Colum size={rebalance(Number(item.value))} bg={randomColor()} />
                            <MinimalContainerInfo>
                                <h1>{item.name}</h1>
                                <h1>{Number(item.value).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}</h1>
                            </MinimalContainerInfo>

                        </MinimalContainerGrapphic>
                    )}
                </For>
            </ContainerGraphic>
        </ContainerMaster>
    )
}