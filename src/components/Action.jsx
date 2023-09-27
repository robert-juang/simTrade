import React, { useState, useEffect, useContext } from 'react'

import { StocksObject, SimulationObject } from '../logic/stock';

import ThemeContext from '../context/ThemeContext'
import SimulationContext from "../context/SimulationContext"
import StockContext from '../context/StockContext';

import {addEntry} from "../api/database-api"

import { makeid } from '../helpers/date-helper';

function Trade({ stockBought, setStockBought }) {
    
    const [showModal, setShowModal] = useState(false);
    
    const [amount, setAmount] = useState(0);
    const [action, setAction] = useState("Buy")
    const [submitted, setSubmitted] = useState(false)
    
    const [Today, setToday] = useState("12/21/2022")
    
    const {stockSymbol} = useContext(StockContext)
    const { darkMode } = useContext(ThemeContext);
    const { portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList } = useContext(SimulationContext);


    const handleStartDate = () => {
        setShowModal(false)
        setCurrentDate(startDate) 
    }

    function forwardSimDay() {
        function incrementDate(dateString) {
            // Parse the date string into a date object
            const date = new Date(dateString);

            // Increment the date by one day
            date.setDate(date.getDate() + 1);

            // Concatenate the components into a yyyy-mm-dd string
            return date.toISOString().split('T')[0];
        }
        if (incrementDate(currentDate) <= Today) {
            setCurrentDate(incrementDate(currentDate))
        }
        console.log(currentDate)
    }

    function forwardSimMonth() {
        function incrementMonth(dateString) {
            // Parse the date string into a date object
            const date = new Date(dateString);

            // Increment the month by one
            date.setMonth(date.getMonth() + 1);

            // Concatenate the components into a yyyy-mm-dd string
            return date.toISOString().split('T')[0];
        }
        if (incrementMonth(currentDate) <= Today) {
            setCurrentDate(incrementMonth(currentDate))
        }
        console.log(currentDate)
    }

    function resetSim() {
        setCurrentDate(startDate)
        setPortfolio(100000)
        setStockList(new StocksObject(100000));
    }

    function saveSim(){
        const USERID = makeid(64)
        addEntry(new SimulationObject(USERID, portfolio, stockList.trades.length, stockList.portfolio - portfolio))
    }

    useEffect(() => {
        const date = new Date();
        const day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        //calculate correct month to string append
        if (!(Math.floor(month / 10))) {
            month = "0" + month;
        }
        // This arrangement can be altered based on how we want the date's format to appear.
        const currentDate = `${year}-${month}-${day}`;
        setToday(currentDate)
    }, [])

    return (
        <>
            <div class={`w-full p-4 border border-gray-200 rounded-lg shadow sm:p-8 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white text-gray-900"}`}>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center justify-between space-x-4">
                                <button
                                    className="bg-pink-500 text-white hover:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                > Start Sim
                                </button>
                                {showModal ? (
                                    <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                        >
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                        <h3 className="text-3xl text-black font-semibold">
                                                            Settings
                                                        </h3>
                                                        <button
                                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 flex-auto">
                                                        <p>Start Date: {startDate}</p>
                                                        <input
                                                            type="date"
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="relative p-6 flex-auto">
                                                        <p>Portfolio Value: {portfolio}</p>
                                                        <input className="border-5 bg-gray-50 text-black p-1" type="number" min="0" placeholder={amount} onChange={(e) => setPortfolio(e.target.value)}></input>
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => handleStartDate()}
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" onClick={forwardSimDay}>
                                   +1 Day
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded" onClick={forwardSimMonth}>
                                    +1 Month
                                </button>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={resetSim}>
                                    Reset
                                </button>
                                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" onClick={saveSim}>
                                    Save Result
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                                    Generate Chart
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>

    )
}

export default Trade


