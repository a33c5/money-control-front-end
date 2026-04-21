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
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    gap: 10px;
`
const Colum = styled('div') <{ size: number, bg: string }>`
    width: 50px;
    height: ${(props) => props.size}px;
    background-color: ${(props) => props.bg};
`

export const GraphicComponent = () => {

    const { debts } = useMoney()

    const rebalance = (size: number) => {
        return size * 0.08
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
                        <Colum size={rebalance(Number(item.value))} bg={randomColor()} />
                    )}
                </For>
            </ContainerGraphic>
        </ContainerMaster>
    )
}