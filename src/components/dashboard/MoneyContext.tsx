import { createContext, createMemo, createSignal, useContext, type ParentComponent } from "solid-js";

type Money = {
    id: string,
    name: string,
    value: number,
    account: string
}

type MoneyContextType = {
    revenue: () => Money[]
    debts: () => Money[]
    setDebts: (value: Money[] | ((prev: Money[]) => Money[])) => void
    setRevenue: (value: Money[] | ((prev: Money[]) => Money[])) => void
    totalRevenue: () => number
    totalDebts: () => number
}

const MoneyContext = createContext<MoneyContextType>()

export const MoneyProvider: ParentComponent = (props) => {
    const [debts, setDebts] = createSignal<Money[]>([])
    const [revenue, setRevenue] = createSignal<Money[]>([])

    const totalDebts = createMemo(() => 
        debts().reduce((accumulator, currentValue) => accumulator + Number(currentValue.value), 0)
    )

    const totalRevenue = createMemo(() => 
        revenue().reduce((accumulator, currentValue) => accumulator + Number(currentValue.value), 0)
    )

     return (
        <MoneyContext.Provider value={{revenue, debts, setRevenue, setDebts, totalRevenue, totalDebts }}>
            {props.children}
        </MoneyContext.Provider>
    )
}

export const useMoney = () => {
    const context = useContext(MoneyContext)
    
    if (!context) {
        throw new Error("useMoney precisa estar dentro do MoneyProvider")
    }

    return context
}