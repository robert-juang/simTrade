const basePath = import.meta.env.VITE_API_STOCK_BASE_PATH

//call the stock api from the backend 

export const searchSymbols = async (query) => {
    const response = await fetch(`${basePath}/symbol/${query}`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`; 
        throw new Error(message); 
    }
    console.log(response.json)
    return await response.json() 
};

export const fetchStockDetails = async (stockSymbol) => {
    const response = await fetch(`${basePath}/stock/${stockSymbol}`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`; 
        throw new Error(message); 
    }

    return await response.json() 
}

export const fetchQuote = async (quote) => {
    const response = await fetch(`${basePath}/quote/${quote}`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json()
}

export const fetchHistoricalData = async(query, resolution, from, to) => {
    
    const response = await fetch(`${basePath}/stock/${query}/resolution/${resolution}/startTime/${from}/endTime/${to}`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json()
}