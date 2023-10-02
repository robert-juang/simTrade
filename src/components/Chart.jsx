import React, {useState, useEffect, useContext} from 'react'
import { convertUnixTimestampToDate, 
            convertDateToUnixTimestamp, 
            createDate } from '../helpers/date-helper';
import {
    Area,
    AreaChart,
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis,
} from "recharts";
import Card from "./Card"
import { fetchHistoricalData } from "../api/stock-api";
import ThemeContext from '../context/ThemeContext';
import StockContext from "../context/StockContext"; 
import SimulationContext from '../context/SimulationContext';
import chartConfig from "../constants/config"

import testJSON from "../assets/test.json" 

import { areDatesEqual } from '../helpers/date-helper';

const formatData = (data) => {
    return data.c.map((item, index) => {
        return {
            value: item.toFixed(2),
            date: convertUnixTimestampToDate(data.t[index]),
        };
    })
}

function findStockPosition(stockSymbol) {
    for (let i = 0; i < globalCache.length; i++) {
        if (globalCache[i].stock === stockSymbol) {
            return i;
        }
    }
    return -1;
}

function Chart() {
    const [data, setData] = useState([]); 
    const [filter, setFilter] = useState("1D"); 

    const { darkMode } = useContext(ThemeContext); 
    const { stockSymbol, setStockSymbol, currentPrice, setCurrentPrice, localCache, setLocalCache, globalCache, setGlobalCache} = useContext(StockContext); 
    const { portfolio, setPortfolio, startDate, setStartDate, currentDate, setCurrentDate, endDate, setEndDate, stockList, setStockList } = useContext(SimulationContext);

    useEffect(() => {
        //This will run to fetch the data from api once when the component mounts. Do not fetch if the data is already in globalCache
    }, [])

    useEffect(() => {
        const getDateRange = () => {
            const {days, weeks, months, years} = chartConfig[filter];

            const endDateCur = new Date(); 
            const startDate2 = createDate(startDate, -days, -weeks, -months, -years); 
            
            console.log(startDate) 

            const startTimestampUnix = convertDateToUnixTimestamp(startDate2)
            const endTimestampUnix = convertDateToUnixTimestamp(endDateCur); 

            return {startTimestampUnix, endTimestampUnix}; 
        }
        const updateChartData = async  () => {
            try{
                const isInCache = globalCache.some(entry => entry.stock === stockSymbol);
                if (!isInCache){ //not in cache, call api and fetch
                    const { startTimestampUnix, endTimestampUnix } = getDateRange();
                    const resolution = "D";
    
                    const result = await fetchHistoricalData(
                        stockSymbol, resolution, startTimestampUnix, endTimestampUnix
                    ); 
                    console.log(result) 
                    const newData = formatData(result)
                    const updatedStocks = [...globalCache, { "stock": stockSymbol, "data": newData }]
                    setData(newData);
                    setLocalCache(newData)
                    setGlobalCache(updatedStocks)
                }
                else{ //already in cache 
                    const pos = findStockPosition(stockSymbol)
                    setData(globalCache[pos]["data"])
                    setLocalCache(globalCache[pos]["data"]) 
                }
            } catch (error){
                setData([]); 
                console.log(error) 
            }
        }
        updateChartData(); 


    }, [stockSymbol, filter]) 

    //recompute chart range when current date changes
    useEffect(() => {
        const beg = new Date(startDate).getTime(); 
        const end = new Date(currentDate).getTime(); 
        const newData = localCache.filter((value) => {
            const date1 = new Date(value.date).getTime();
            if (date1 > beg && date1 < end) {
                return true
            }
            return false; 
        })
        setData(newData) 

        //Change price of display
        localCache.forEach(element => {
            if (areDatesEqual(element.date ,currentDate)){
                setCurrentPrice(element.value)
            }
        });

    }, [currentDate])

    return (
        <Card>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#312e81" fillOpacity={1} strokeWidth={0.5} fill="url(#chartColor)"/>
                    <Tooltip 
                        contentStyle={darkMode ? {backgroundColor: "#111827"} : null}
                        itemStyle={darkMode? {color: "#818cf8"} : null} 
                    />
                    <XAxis dataKey="date" tickFormatter={(tickItem) => {
                        const date = new Date(tickItem);
                        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                    }} />
                    <YAxis domain={["dataMin", "dataMax"]}/>
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart