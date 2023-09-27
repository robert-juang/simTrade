import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import Heading from "./components/Heading" 
import StockContext from "./context/StockContext"
import ThemeContext from "./context/ThemeContext"
import SimulationContext from "./context/SimulationContext"
import PageContext from "./context/PageContext" 

import {TradeObject, StocksObject} from "./logic/stock.ts" 

function App() {
  
  const [stockSymbol, setStockSymbol] = useState("AAPL"); 

  const [darkMode, setDarkMode] = useState(false); 
  
  const [portfolio, setPortfolio] = useState(100000); 
  const [startDate, setStartDate] = useState("2022-01-01"); 
  const [currentDate, setCurrentDate] = useState("2022-01-01"); 

  const [stockList, setStockList] = useState(new StocksObject()); 

  const [page, setPage] = useState(0) //0 is main 1 is leaderboard

  return (
    <PageContext.Provider value={{page, setPage}}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Heading />
        <SimulationContext.Provider value={{ portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, stockList, setStockList }}>
          <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
            <Dashboard />
          </StockContext.Provider>
        </SimulationContext.Provider>
      </ThemeContext.Provider>
    </PageContext.Provider>
  );
}

export default App
