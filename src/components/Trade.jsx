import React, {useState, useContext} from 'react'
import Select from 'react-select'

import { ThemeContext } from '@emotion/react';
import SimulationContext from '../context/SimulationContext';

function Trade({stockBought, setStockBought}) {

  const options = [
    { value: true, label: 'Buy' },
    { value: false, label: 'Sell' },
  ]

  const [amount, setAmount] = useState(0); 
  const [action, setAction] = useState("Buy") 

  const {darkMode} = useContext(ThemeContext); 
  const { portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList } = useContext(SimulationContext);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    //TODO fill in information when submitted 
    console.log(amount, action, startDate, currentDate) 
  }

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleAction = (e) => {
    setAction(e.value) 
  }

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
                      StockName: 
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {stockBought ? stockBought : "N/A"}
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