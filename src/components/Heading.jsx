import React, {useContext} from 'react'

import PageContext from '../context/PageContext'

function Heading() {

  const {page, setPage} = useContext(PageContext) 

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="#" class="flex items-center">
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SimTrade</span>
              </a>
              <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                  <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                      <li>
                        <a href="#home" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page" onClick={() => setPage(1)}>Home</a>
                      </li>
                      <li>
                        <a href="#leaderboard" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={() => setPage(0)}>LeaderBoard</a>
                      </li>
                      <li>
                          <a href="#profile" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={() => setPage(2)}>Profile</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    </>

  )
}

export default Heading