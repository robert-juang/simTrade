import { ThemeContext } from '@emotion/react'
import React, {useContext} from 'react'

function Portfolio() {

  const {darkMode} = useContext(ThemeContext)

  return (
    // <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200" id="portfolio">

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg" id="portfolio">
      <table class={`w-full text-sm text-left text-gray-500 ${darkMode ? "dark:text-gray-400" : ""}`}>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
            </tr>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">
                White
              </td>
              <td class="px-6 py-4">
                Laptop PC
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">
                Black
              </td>
              <td class="px-6 py-4">
                Accessories
              </td>
              <td class="px-6 py-4">
                $99
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
            </tr>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Google Pixel Phone
              </th>
              <td class="px-6 py-4">
                Gray
              </td>
              <td class="px-6 py-4">
                Phone
              </td>
              <td class="px-6 py-4">
                $799
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    // </div>
  )
}

export default Portfolio