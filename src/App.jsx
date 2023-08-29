import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import Heading from "./components/Heading" 
import StockContext from "./context/StockContext"

function App() {
  
  const [stockSymbol, setStockSymbol] = useState("AAPL"); 

  return (
    <> 
      <Heading/>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
        <Dashboard/>
      </StockContext.Provider>
    </>
  )
}

export default App
