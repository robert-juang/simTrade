import React, {useEffect, useContext} from 'react'

import ThemeContext from '../context/ThemeContext'
import SimulationContext from '../context/SimulationContext'
import StockContext from '../context/StockContext'

function Portfolio() {

  const {darkMode} = useContext(ThemeContext)
  const { portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList } = useContext(SimulationContext);
  const { stockSymbol, setStockSymbol, currentPrice, setCurrentPrice, localCache, setLocalCache, globalCache, setGlobalCache } = useContext(StockContext); 

  return (
    // <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200" id="portfolio">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class={`w-full text-sm text-left ${darkMode ? "bg-gray-700 border-gray-700 text-white" : "bg-white text-gray-900"}`}>
        <thead class={`text-xs text-gray-700 uppercase bg-gray-50 ${darkMode ? "bg-gray-700 border-gray-700 text-white" : "bg-white text-gray-900"}`}>
            <tr>
              <th scope="col" class="px-6 py-3">
                Symbol
              </th>
              <th scope="col" class="px-6 py-3">
                Current Price
              </th>
              <th scope="col" class="px-6 py-3">
                Purchase Price
              </th>
              <th scope="col" class="px-6 py-3">
                Date Bought
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Gain/Loss
              </th>
              <th scope="col" class="px-6 py-3">
                Trade Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
            
              stockList.getTrades().map((tradeObject, index) => {
                return (
                  <tr class={`border-b ${darkMode ? "bg-gray-900 border-gray-700 text-gray-400" : "bg-white text-gray-900"}`} id={index}>
                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                      {tradeObject.symbol}
                    </th>
                    <td class="px-6 py-4">
                      {tradeObject.getCurrentPrice(globalCache, currentDate)}
                    </td>
                    <td class="px-6 py-4">
                      {tradeObject.getPurchasePrice()}
                    </td>
                    <td class="px-6 py-4">
                      {tradeObject.getDateBought()}
                    </td>
                    <td class="px-6 py-4">
                      {tradeObject.trade_action === "Buy" ? tradeObject.quantity : -1 * tradeObject.quantity}
                    </td>
                    <td class="px-6 py-4">
                      {tradeObject.findPnL(tradeObject.getCurrentPrice(globalCache, currentDate)).toLocaleString()} <span class={`${tradeObject.findPnLPercent(tradeObject.getCurrentPrice(globalCache, currentDate)) >= 0 ? "text-green-400" : "text-red-400"}`}> ({tradeObject.findPnLPercent(tradeObject.getCurrentPrice(globalCache, currentDate))}%)</span>
                    </td>
                    <td class="px-6 py-4">
                      {tradeObject.trade_action}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
  )
}

export default Portfolio


