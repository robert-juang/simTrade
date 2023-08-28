import React, {useState} from 'react'
import {mockHistoricalData } from "../constants/mock"; 
import { convertUnixTimestampToDate } from '../helpers/date-helper';
import {
    Area,
    AreaChart,
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis,
} from "recharts";

import Card from "./Card"

function Chart() {
    const [data, setData] = useState(mockHistoricalData); 
    const [filter, setFilter] = useState("1W"); 

    const formatDate = () => {
        return data.c.map((item, index) => {
            return {
                value: item.toFixed(2), 
                date: convertUnixTimestampToDate(data.t[index]),
            }; 
        })
    }

    return (
        <Card>
            <ResponsiveContainer>
                <AreaChart data={formatDate(data)}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgb(199 210 254)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#312e81" fillOpacity={1} strokeWidth={0.5} fill="url(#chartColor)"/>
                    <Tooltip/>
                    <XAxis dateKey={"date"}/>
                    <YAxis domain={["dataMin", "dataMax"]}/>
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart