import React, {useState} from 'react'

{/* <Card>
  <div className="w-100 p-5 flex flex-col my-4 " id="trade">
    <span>StockName: apple and shit </span>
    <span>Buy/Sell: Buy </span>
    <span>Amount: </span> <input className="border-5"></input>
    <span>Date: 12/21/2022</span>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Trade
    </button>
  </div>
</Card> */}

function Trade({stockBought, setStockBought}) {
  const [amount, setAmount] = useState(0); 
  const [action, setAction] = useState("Buy") 
  const [date, setDate] = useState("12/21/2022") 
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    //TODO fill in information when submitted 
    console.log(amount, action, date,submitted) 
    setSubmitted(true) 
  }

  return (
    <>
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Trading Menu</h5>
        </div>
        <div class="flow-root">
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
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  Buy
                </div>
              </div>
            </li>
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Amount
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <input className="border-5 bg-gray-50 text-black p-1" placeholder={amount}></input>
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
                  12/21/2022
                </div>
              </div>
            </li>
            <li class="pt-3 pb-0 sm:pt-4">
              <div class="flex items-center space-x-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => handleSubmit()}>
                  Submit Trade
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