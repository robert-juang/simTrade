import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import Heading from "./components/Heading" 
import StockContext from "./context/StockContext"
import ThemeContext from "./context/ThemeContext"

function App() {
  
  const [stockSymbol, setStockSymbol] = useState("AAPL"); 
  const [darkMode, setDarkMode] = useState(false); 

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Heading />
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App
