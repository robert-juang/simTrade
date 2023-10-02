import React, { useContext, useEffect, useState } from 'react'
import Header from "./Header"
import Details from "./Details"
import Overview from "./Overview"
import Chart from "./Chart"
import Trade from "./Trade"
import Portfolio from "./Portfolio"
import Action from "./Action" 
import Leaderboard from './Leaderboard'

import StockContext from '../context/StockContext'
import ThemeContext from "../context/ThemeContext"
import SimulationContext from "../context/SimulationContext"
import PageContext from "../context/PageContext"
import { fetchStockDetails, fetchQuote } from "../api/stock-api"

function Dashboard() {

    const {darkMode} = useContext(ThemeContext) 
    const {page, setPage} = useContext(PageContext); 
    const { stockSymbol, setStockSymbol, currentPrice, setCurrentPrice, localCache, setLocalCache, globalCache, setGlobalCache } = useContext(StockContext); 
    const { portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList } = useContext(SimulationContext);

    const [stockDetails, setStockDetails] = useState({})
    const [quote, setQuote] = useState({}) 
    const [stockBought, setStockBought] = useState("")

    useEffect(() => {
        const updateStockDetails = async () => {
            try{
                const result = await fetchStockDetails(stockSymbol);
                setStockDetails(result); 
            }
            catch(error){
                setStockDetails({})
                console.log(error) 
            }
        }; 
        const updateStockOverview = async () => {
            try {
                const result = await fetchQuote(stockSymbol);
                setQuote(result);
            }
            catch (error) {
                setStockDetails({})
                console.log(error)
            }
        }; 

       updateStockDetails();
       updateStockOverview(); 

    }, [stockSymbol])

    useEffect(() => {
        setPortfolio(stockList.calculatePortfolio(globalCache, currentDate))
    }, [currentDate])

    return (
        (page ?
        <div className="">
            <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl: grid-cols-3 grid-rows-8 md: grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand
                ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}>
                <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start item-center">
                    <Header name={stockDetails.name}/>
                </div>
                <div className="md:col-span-2 row-span-4">
                    <Chart />
                </div>
                <div>
                    <Overview symbol={stockSymbol} price={quote.pc} change={quote.d} changePercent={quote.dp} currency={stockDetails.currency}/>
                </div>
                <div className="row-span-2 xl:row-span-3">
                    <Details details={stockDetails} />
                </div>
            </div>

            <div className={`h-2/6 p-10 font-quicksand ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`} id="action">
                <div className={`w-full font-serif font-extrabold text-2xl ${darkMode ? "text-gray-300" : null}`}>
                    Action
                </div>
                <div className="w-full">
                    <Action stockBought={stockBought} setStockBought={setStockBought} />
                </div>

            </div>
            
            <div className={`h-3/6 p-10 font-quicksand ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`} id="trade">
                <div className="w-full font-serif font-extrabold text-2xl">
                    Trade
                </div>
                <div className={`w-full`}>
                    <Trade stockBought={stockBought} setStockBought={setStockBought} stockDetail={stockDetails} price={quote.pc}/>
                </div>
            </div>

            <div className={`h-3/6 p-10 font-quicksand ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`} id="portfolio">
                <div className="w-full font-serif font-extrabold text-2xl">
                    Portfolio: ${portfolio} 
                </div>
                <Portfolio />
            </div>
        </div>
        : 
        <div className={`h-screen p-10 font-quicksand ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`} id="trade">
                <div className="w-full font-serif font-extrabold text-2xl">
                    LeaderBoard
                </div>
                <div className="w-full">
                    <Leaderboard />
                </div>
            </div>
        )

  )
}

export default Dashboard