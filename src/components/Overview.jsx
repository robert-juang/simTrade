import React, {useContext} from 'react'
import Card from "./Card"; 

import StockContext from '../context/StockContext';

function Overview({symbol, price, change, changePercent, currency}) {

  const { stockSymbol, setStockSymbol, cacheData, setCacheData, currentPrice, setCurrentPrice } = useContext(StockContext); 

  return (
    <Card>
        <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
            {symbol}
        </span>
        <div className="w-full h-full flex items-center justify-around">
            <span className="teext-2xl xl:text-4xl 2xl:text-5xl flex items-center">
                ${currentPrice} 
                <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
                    {currency}
                </span>
            </span>
        </div>
    </Card>
  )
}

export default Overview