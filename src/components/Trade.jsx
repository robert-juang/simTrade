import React, {useState, useEffect, useContext} from 'react'
import Select from 'react-select'
import { TradeObject, StocksObject } from "../logic/stock.ts"

import { ThemeContext } from '@emotion/react';
import SimulationContext from '../context/SimulationContext';
import StockContext from "../context/StockContext"; 

function Trade({stockBought, setStockBought, stockDetail, price}) {

  const options = [
    { value: true, label: 'Buy' },
    { value: false, label: 'Sell' },
  ]

  const { stockSymbol } = useContext(StockContext)
  const {darkMode} = useContext(ThemeContext); 
  const { portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList } = useContext(SimulationContext);

  const [amount, setAmount] = useState(0);
  const [action, setAction] = useState("Buy") 

  const [totalCost, setTotalCost] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    //TODO fill in information when submitted 

    console.log(amount, action, startDate, currentDate) 

    const newObj = new TradeObject(stockSymbol, 100, price, amount, action ? "Buy" : "Sell");

    //adjust portfolio 
    if (action) {
      setPortfolio(portfolio - newObj.totalCost)
    }
    else {
      setPortfolio(portfolio + newObj.totalCost)
    }

    stockList.addTrades(newObj);
    stockList.combine();
  }

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleAction = (e) => {
    setAction(e.value) 
  }

  useEffect(() => {
    console.log(stockDetail)
    console.log(price) 
  }, [])

  useEffect(() => {
    parseFloat("10.547892").toFixed(2)
    setTotalCost(parseFloat(`${amount * price}`).toFixed(2))
  },[amount])

  return (
    <>
      <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Trading Menu</h5>
        </div>
        <div class="flow-root">
          <form onsubmit={() => handleSubmit()}>
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Stock Ticker: 
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {stockSymbol}
                  </div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Buy/Sell: 
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                    <Select
                      defaultValue={true}
                      onChange={handleAction}
                      options={options}/>
                  </div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Amount (Shares)
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <input className="border-5 bg-gray-50 text-black p-1" type="number" min="0" placeholder={amount} onChange={(e) => setAmount(e.target.value)}></input>
                  </div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Date
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {currentDate}
                  </div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Current Price
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {price}
                  </div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Total Cost
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {totalCost}
                  </div>
                </div>
              </li>
              <li class="pt-3 pb-0 sm:pt-4">
                <div class="flex items-center flex-row-reverse space-x-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleSubmit}>
                    Submit Trade
                  </button>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>

    </>

  )
}

export default Trade