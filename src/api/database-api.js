const basePath = "https://localhost:8080";

//call the stock api from the backend 

export const getEntries = async () => {
    //TODO
    const response = await fetch(`${basePath}/simulation`)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    console.log(response.json)
    return await response.json()
};

export const addEntry = async (Simulation) => {
    // Simulation consists
    // private String userID; 
    // private Long portfolioValue; 
    // private Integer numberOfTrades; 
    // private Long totalGain; 

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userID": Simulation.userID, "portfolioValue": Simulation.portfolioValue, "numberOfTrades": Simulation.numberOfTrades, "totalGain": Simulation.totalGain })
    };

    //TODO 
    const response = await fetch(`${basePath}/sim/${Simulation}`, requestOptions)

    if (!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    
}
