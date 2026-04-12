
import axios from "axios"
import { createSignal, For, onMount, Show } from "solid-js"
import { styled } from "solid-styled-components"
import { Modal } from "../utils/modal"

const ContainerMaster = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 600px;
    gap: 50px;
`
const Box = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    background-color: white;
`
const HeadBox = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) ;
`
const Title = styled('h1')`
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #0f4284;
`

const InfoBox = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const MinimalContainerBox = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    gap: 2px;
    color: #5a5a5a;
`

const TitleMoney = styled('h1')`
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
`

const ValueMoney = styled('h1')`
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
`

const ExtraStyle = styled('span')`
    font-weight: 500;
`

const ExtraStyleRevenue = styled('span')`
    font-weight: 500;
    color: green;
`

const ExtraStyleDebt = styled('span')`
    font-weight: 500;
    color: red;
`

const SendMoneyButton = styled('button')`
    width: 50%;
    height: 50px;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: 350;
    cursor: pointer;
`

const InputName = styled('input')`
    width: 90%;
    height: 50px;
    padding: 10px;
    border-radius: 10px;
`
const InputValue = styled('input')`
    width: 90%;
    height: 50px;
    padding: 10px;
    border-radius: 10px;
`
const Form = styled('form')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
`

type Money = {
    id: string,
    name: string,
    value: number,
    account: string
}

export const ContainerInput = () => {
    const [money, setMoney] = createSignal<Money[]>([])
    const [debts, setDebts] = createSignal<Money[]>([])
    const [revenue, setRevenue] = createSignal<Money[]>([])

    const [openModal, setOpenModal] = createSignal(false)
    const [isInput, setIsInput] = createSignal(false)

    const [name, setName] = createSignal<string>('')
    const [value, setValue] = createSignal<number | null>(null)
    const [account, setAccount] = createSignal<string>('')

    const openRevenue = () => {
        setOpenModal(true)
        setIsInput(true)
    }

    const closeModal = () => {
        setOpenModal(false)
        setIsInput(false)
    }

    const handleSubmit = async () => {
        isInput() ? setAccount('input') : setAccount('output')
        try {
            const response = await axios.post('http://localhost:3333/money/create',{
                name: name(),
                value: value(),
                account: account()
            })
            console.log(response)
        }
        catch(err){
            console.log(err)
        }

    }
 
    const getMoney = async () => {
        try {
            const response = await axios.get('http://localhost:3333/money/getall')
            setMoney(response.data.response)
            // console.log(response.data.response)
            // console.log(money())
            money().forEach((money: Money) => {
                if (money.account == 'input') {
                    //spread operator 
                    setRevenue((prev) => [...prev, money])
                }
                else {
                    setDebts((prev) => [...prev, money])
                }
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    onMount(() => {
        getMoney()
    })

    return (
        <>
            <ContainerMaster>
                <Box>
                    <HeadBox>
                        <Title>Minhas receitas</Title>
                    </HeadBox>
                    <InfoBox>
                        <For each={revenue()}>
                            {(revenue) => (
                                <MinimalContainerBox>
                                    <TitleMoney>Nome: <ExtraStyle>{revenue.name}</ExtraStyle> </TitleMoney>
                                    <ValueMoney>Valor: <ExtraStyleRevenue>R$ {revenue.value}</ExtraStyleRevenue> </ValueMoney>
                                </MinimalContainerBox>
                            )}
                        </For>
                    </InfoBox>
                    <SendMoneyButton onClick={openRevenue}>Cadastrar nova receita</SendMoneyButton>
                </Box>
                <Box>
                    <HeadBox>
                        <Title>Minhas dividas</Title>
                    </HeadBox>
                    <InfoBox>
                        <For each={debts()}>
                            {(debts) => (
                                <MinimalContainerBox>
                                    <TitleMoney>Nome: <ExtraStyle>{debts.name}</ExtraStyle></TitleMoney>
                                    <ValueMoney>Valor: <ExtraStyleDebt>R$ {debts.value}</ExtraStyleDebt></ValueMoney>
                                </MinimalContainerBox>
                            )}
                        </For>
                    </InfoBox>
                    <SendMoneyButton onClick={() => setOpenModal(true)}>Cadastrar nova divida</SendMoneyButton>
                </Box>
            </ContainerMaster>
            <Show when={openModal()}>
                <Modal onClose={closeModal}>
                    <Form  onSubmit={handleSubmit}>
                        <InputName placeholder="Nome:" onInput={(e) => setName(e.currentTarget.value)} />
                        <InputValue placeholder="Valor:" onInput={(e) => setValue(Number(e.currentTarget.value))} />
                        <SendMoneyButton type="submit">Registrar</SendMoneyButton>
                    </Form>
                </Modal>
            </Show>

        </>

    )
}