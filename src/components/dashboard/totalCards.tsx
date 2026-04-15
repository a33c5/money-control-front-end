import { styled } from "solid-styled-components"
import { useMoney } from "./MoneyContext"

const ContainerMaster = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`
const ContainerCard = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
`
const Card = styled('div')<{bg: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 250px;
    height: 150px;
    border-radius: 15px;
    background-color: white;
    font-size: 30px;
    font-family: "Roboto", sans-serif;
    font-weight: 350;
    color: ${(props) => props.bg};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
`

const TitleCard = styled('div')`
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    color: black;
`

export const TotalCards = () => {

    const { totalRevenue, totalDebts } = useMoney()

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

    const balance = () => totalRevenue() - totalDebts()

    return (
        <ContainerMaster>
            <ContainerCard>
                <Card bg='#008000'>
                    <TitleCard>Receita</TitleCard>
                    {conversion(totalRevenue())}
                </Card>
                <Card bg="#f50000">
                    <TitleCard>Saida</TitleCard>
                    {conversion(totalDebts())}
                </Card>
                <Card bg="#0f4284">
                    <TitleCard>Saldo</TitleCard>
                    {conversion(balance())}
                </Card>
            </ContainerCard>
        </ContainerMaster>
    )
}