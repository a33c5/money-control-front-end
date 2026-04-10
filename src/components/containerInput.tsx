
import axios from "axios"
import { createSignal, onMount } from "solid-js"
import { styled } from "solid-styled-components"

const ContainerMaster = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 600px;
    gap: 20px;
`
const Box = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
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
    font-weight: 300;
    color: #888888;
`

const InfoBox = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const TitleMoney = styled('h1')`
    font-size: 10px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
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

    const getMoney = async () => {
        try{    
            const response = await axios.get('http://localhost:3333/money/getall')
            setMoney(response.data)
            console.log(money())
            money().forEach((money:Money) => {
               if(money.account == 'input'){
                //spread operator 
                setRevenue((prev) => [...prev, money])
               }
               else{
                setDebts((prev) => [...prev, money] )
               }
            });
        }
        catch(err){
            console.log(err)
        }
    }
    onMount(()=> {
        getMoney()
    })
    return (
        <ContainerMaster>
            <Box>
                <HeadBox>
                    <Title>Minhas receitas</Title>
                </HeadBox>
                <InfoBox>
                    {revenue().map((item) => (
                        <TitleMoney>{item.name}</TitleMoney>
                    ))}
                </InfoBox>
            </Box>
            <Box>
                <HeadBox>
                    <Title>Minhas dividas</Title>
                </HeadBox>
                <InfoBox>
                    {debts().map((item) => (
                        <TitleMoney>{item.name}</TitleMoney>
                    ))}
                </InfoBox>
            </Box>
        </ContainerMaster>
    )
}