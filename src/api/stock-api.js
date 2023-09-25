const basePath = "https://finnhub.io/api/v1"; 

//call the stock api from the backend 

export const searchSymbols = async (query) => {
    // const url = `${basePath}/search?q=${query}&token=${import.meta.env.VITE_FINNHUB_API_KEY}}`; 
    // const response = await fetch(url); 

    const response = await fetch(`http://localhost:8080/symbol/${query}`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`; 
        throw new Error(message); 
    }
    console.log(response.json)
    return await response.json() 
};

export const fetchStockDetails = async (stockSymbol) => {
    // const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}}`
    // const response = await fetch(url); 

    const response = await fetch(`http://localhost:8080/stock/${stockSymbol}`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`; 
        throw new Error(message); 
    }

    return await response.json() 
}

export const fetchQuote = async (quote) => {
    // const url = `${basePath}/quote?symbol=${stockSymbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}}`
    // const response = await fetch(url);

    const response = await fetch(`http://localhost:8080/quote/${quote}`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json()
}

export const fetchHistoricalData = async(query, resolution, from, to) => {
    // const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${import.meta.env.VITE_FINNHUB_API_KEY}}`
    // const response = await fetch(url);

    const response = await fetch(`http://localhost:8080/stock/${query}/resolution/${resolution}/startTime/${from}/endTime/${to}`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json()
}