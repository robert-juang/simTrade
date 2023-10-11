const basePath = import.meta.env.VITE_API_DB_BASE_PATH;

//call the stock api from the backend 
export const getEntries = async () => {
    const response = await fetch(`${basePath}/simData`, {
        referrerPolicy: "unsafe_url"
})

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const result = await response.json() 
    result.sort((a, b) => parseInt(b.portfolioValue, 10) - parseInt(a.portfolioValue, 10));
    return result
};

export const addEntry = async (Simulation) => {
    // Simulation consists
    // private String userID; 
    // private Long portfolioValue; 
    // private Integer numberOfTrades; 
    // private Long totalGain; 
    console.log(Simulation) 

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userID": Simulation._userID, "portfolioValue": Simulation._portfolioValue, "numberOfTrades": Simulation._numberOfTrades, "totalGain": Simulation._totalGain }),
        referrerPolicy: "unsafe_url"
    }; 
    const response = await fetch(`${basePath}/simData`, requestOptions)

    if (!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

}
