
import axios from "axios"
import { createSignal, For, onMount, Show } from "solid-js"
import { styled } from "solid-styled-components"
import { Modal } from "../../utils/modal"
import { AiOutlineDelete } from 'solid-icons/ai'
import { AiFillEdit } from 'solid-icons/ai'
import { useMoney } from "./MoneyContext"

const ContainerMaster = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 450px;
    gap: 50px;
`
const Box = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 600px;
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
    padding: 10px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    gap: 7px;
    color: #5a5a5a;
`

const MinimalContainerinfo = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: auto;
    /* border: 1px solid red; */
`
const DeleteIcon = styled(AiOutlineDelete)`
    width: 20px;
    height: 20px;
    color: red;
    cursor:pointer;
`

const EditIcon = styled(AiFillEdit)`
    width: 20px;
    height: 20px;
    color: #0f4284;
    cursor:pointer;
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

const Input = styled('input')`
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
    const { debts, setDebts, revenue, setRevenue} = useMoney()

    const [openModalCreate, setOpenModalCreate] = createSignal(false)
    const [openModalEdit, setOpenModalEdit] = createSignal(false)
    const [isInput, setIsInput] = createSignal(false)

    const [name, setName] = createSignal<string>('')
    const [value, setValue] = createSignal<number>(0)
    const [account, setAccount] = createSignal<string>('')

    const [editId, setEditId] = createSignal<string>('')

    const openRevenue = () => {
        setOpenModalCreate(true)
        setIsInput(true)
    }

    const findValueMoney = (id: string) => {
       return (
        debts().find((item) => item.id == id) ||
        revenue().find((item) => item.id == id)
    )
    }

    const closeModal = () => {
        setOpenModalCreate(false)
        setOpenModalEdit(false)
        setIsInput(false)
    }

    const reset = () => {
        setName('')
        setValue(0)
        setAccount('')
        setMoney([])
        setDebts([])
        setRevenue([])
    }

    const conversion = (input: number | string): string => {
        let value: number;

        if (typeof input === "string") {
            value = Number(input);
        } else {
            value = input;
        }

        return value.toLocaleString('pt', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const handleCreate = async () => {
        isInput() ? setAccount('input') : setAccount('output')
        try {
            const response = await axios.post('http://localhost:3333/money/create', {
                name: name(),
                value: value(),
                account: account()
            })
            console.log(response)
            getMoney()
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async () => {
        const response = await axios.put('http://localhost:3333/money/update', {
            id: editId(),
            name: name(),
            value: value()
        })
        console.log(response)
        getMoney()
        setOpenModalEdit(false)
    }

    const makeEdit = (id: string) => {
        setEditId(id)
        setOpenModalEdit(true)
        console.log(openModalEdit)
    }

    const handleDelete = async (id: string) => {
        const response = await axios.delete('http://localhost:3333/money/delete', { data: { id } })
        console.log(response)

        setDebts(prev => prev.filter(item => item.id != id))
        setRevenue(prev => prev.filter(item => item.id != id))
    }

    const getMoney = async () => {
        try {
            reset()
            const response = await axios.get('http://localhost:3333/money/getall')
            setMoney(response.data.response)
            console.log(money())
            money().forEach((money: Money) => {
                if (money.account == 'input') {
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
                                    <MinimalContainerinfo>
                                        <TitleMoney>Nome: <ExtraStyle>{revenue.name}</ExtraStyle> </TitleMoney>
                                        <ValueMoney>Valor: <ExtraStyleRevenue>{conversion(revenue.value)} </ExtraStyleRevenue> </ValueMoney>
                                    </MinimalContainerinfo>
                                    <EditIcon onClick={() => makeEdit(revenue.id)} />
                                    <DeleteIcon onClick={() => handleDelete(revenue.id)} />
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
                                    <MinimalContainerinfo>
                                        <TitleMoney>Nome: <ExtraStyle>{debts.name}</ExtraStyle></TitleMoney>
                                        <ValueMoney>Valor: <ExtraStyleDebt>{conversion(debts.value)}</ExtraStyleDebt></ValueMoney>
                                    </MinimalContainerinfo>
                                    <EditIcon onClick={() => makeEdit(debts.id)} />
                                    <DeleteIcon onClick={() => handleDelete(debts.id)} />
                                </MinimalContainerBox>
                            )}
                        </For>
                    </InfoBox>
                    <SendMoneyButton onClick={() => setOpenModalCreate(true)}>Cadastrar nova divida</SendMoneyButton>
                </Box>
            </ContainerMaster>
            <Show when={openModalCreate()}>
                <Modal onClose={closeModal}>
                    <Form onSubmit={handleCreate}>
                        <TitleMoney>Novo registro</TitleMoney>
                        <Input placeholder="Nome:" onInput={(e) => setName(e.currentTarget.value)} />
                        <Input placeholder="Valor:" onInput={(e) => setValue(Number(e.currentTarget.value))} />
                        <SendMoneyButton type="submit">Registrar</SendMoneyButton>
                    </Form>
                </Modal>
            </Show>
            <Show when={(openModalEdit())}>
                <Modal onClose={closeModal}>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        handleEdit()
                    }}>
                        <TitleMoney>Editar registro</TitleMoney>
                        <Input placeholder="Nome:" onInput={(e) => setName(e.currentTarget.value)} value={findValueMoney(editId())?.name}/>
                        <Input placeholder="Valor:" onInput={(e) => setValue(Number(e.currentTarget.value))} value={findValueMoney(editId())?.value} />
                        <SendMoneyButton type="submit">Editar</SendMoneyButton>
                    </Form>
                </Modal>
            </Show>
        </>

    )
}