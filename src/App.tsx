import { MoneyProvider } from "./components/dashboard/moneyContext"
import { DashBoard } from "./pages/dashboard"

function App() {
  return (
    <MoneyProvider>
      <DashBoard />
    </MoneyProvider>
  )
}

export default App
