import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import Heading from "./components/Heading" 
import StockContext from "./context/StockContext"
import ThemeContext from "./context/ThemeContext"
import SimulationContext from "./context/SimulationContext"
import PageContext from "./context/PageContext" 

import {TradeObject, StocksObject} from "./logic/stock" 

import { currentDay } from "./helpers/date-helper"

function App() {

  //Page Context
  //0 is leaderboard 1 is main
  const [page, setPage] = useState(1) 

  //Stock Context
  const [stockSymbol, setStockSymbol] = useState("AAPL") //current symbol searched 
  const [currentPrice, setCurrentPrice] = useState(""); //Current price of the stock
  const [localCache, setLocalCache] = useState([]) //Cache the current stock's data in the format of [{value:xxx, date:xxx},...]
  const [globalCache, setGlobalCache] = useState([]) //All Data retrieved from API. In the format: [{stock: 'AAPL', data: [{value: xxx, date: xxx},...]},...]

  //Theme Context
  const [darkMode, setDarkMode] = useState(false); 
  
  //Simulation Context
  const [portfolio, setPortfolio] = useState(100000); 
  const [startDate, setStartDate] = useState("2022-01-01"); 
  const [endDate, setEndDate] = useState(currentDay())
  const [currentDate, setCurrentDate] = useState("2022-01-01"); 
  const [stockList, setStockList] = useState(new StocksObject(portfolio)); 

  return (
    <PageContext.Provider value={{page, setPage}}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Heading />
        <SimulationContext.Provider value={{ portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList }}>
          <StockContext.Provider value={{ stockSymbol, setStockSymbol, currentPrice, setCurrentPrice, localCache, setLocalCache, globalCache, setGlobalCache }}>
            <Dashboard />
          </StockContext.Provider>
        </SimulationContext.Provider>
      </ThemeContext.Provider>
    </PageContext.Provider>
  );
}

export default App
