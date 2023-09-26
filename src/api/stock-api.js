const basePath = "https://finnhub.io/api/v1"; 

//call the stock api from the backend 

export const searchSymbols = async (query) => {
    const response = await fetch(`http://localhost:8080/symbol/${query}`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`; 
        throw new Error(message); 
    }
    console.log(response.json)
    return await response.json() 
};

export const fetchStockDetails = async (stockSymbol) => {
    const response = await fetch(`http://localhost:8080/stock/${stockSymbol}`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`; 
        throw new Error(message); 
    }

    return await response.json() 
}

export const fetchQuote = async (quote) => {
    const response = await fetch(`http://localhost:8080/quote/${quote}`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json()
}

export const fetchHistoricalData = async(query, resolution, from, to) => {
    const response = await fetch(`http://localhost:8080/stock/${query}/resolution/${resolution}/startTime/${from}/endTime/${to}`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json()
}