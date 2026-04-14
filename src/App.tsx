import { MoneyProvider } from "./components/MoneyContext"
import { DashBoard } from "./pages/dashboard"

function App() {
  return (
    <MoneyProvider>
      <DashBoard />
    </MoneyProvider>
  )
}

export default App
