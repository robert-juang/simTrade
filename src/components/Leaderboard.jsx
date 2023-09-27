import React, {useState, useEffect, useContext} from 'react'

import ThemeContext from "../context/ThemeContext"

import {getEntries} from "../api/database-api"

function Leaderboard() {
  const [scores, setScores] = useState([])
  const [newScores, setNewScores] = useState([])

  const {darkMode} = useContext(ThemeContext)

  useEffect(() => {
    getEntries()
    .then((list) => setScores(list))

    console.log(scores) 
  }, [])

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class={`flex items-center justify-between pb-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div>
          <div id="dropdownAction" class={`z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${darkMode ? "bg-gray-700 divide-gray-600" : "bg-white"}`}>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
            </div>
          </div>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class={`text-xs uppercase bg-gray-50 ${darkMode ? "bg-gray-700 text-gray-400" : ""}`}>
          <tr>
            <th scope="col" class="px-6 py-3">
              User ID
            </th>
            <th scope="col" class="px-6 py-3">
              Final Portfolio Value
            </th>
            <th scope="col" class="px-6 py-3">
              Trades Made
            </th>
            <th scope="col" class="px-6 py-3">
              Gain/Loss
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((sim) => (
            <tr class={`border-b ${darkMode ? "bg-gray-800 text-gray-900 border-gray-700 hover:bg-gray-600 text-white" : "border-gray-600 hover:bg-gray-300"}`}>
              <th scope="row" class="flex items-center px-6 py-4 whitespace-nowrap">
                <div class="pl-3">
                  <div class="text-base font-semibold">{sim.userID}</div>
                </div>
              </th>
              <td class="px-6 py-4">
                {sim.portfolioValue}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  {sim.numberOfTrades}
                </div>
              </td>
              <td class={`px-6 py-4 ${sim.totalGain > 0 ? "text-green-500" : "text-red-500"}`}>
                {sim.totalGain}
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard