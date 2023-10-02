import { areDatesEqual } from "../helpers/date-helper";
import {truncate} from "../helpers/helper-function" 

class TradeObject {

    constructor(symbol, purchase_price, quantity, dateBought, trade_action) {
        this.symbol = symbol;
        this.purchase_price = purchase_price;
        this.quantity = quantity;
        this.trade_action = trade_action;
        this.totalCost = purchase_price * quantity;
        this.dateBought = dateBought
    }

    getSymbol() { return this.symbol; }
    setSymbol(symbol) { this.symbol = symbol; }

    getPurchasePrice() { return truncate(this.purchase_price); }
    setPurchasePrice(purchase_price) { this.purchase_price = purchase_price; }

    getQuantity() { return this.quantity; }
    setQuantity(quantity) { this.quantity = quantity; }

    getTradeAction() { return this.trade_action; }
    setTradeAction(trade_action) { this.trade_action = trade_action; }

    getDateBought(){return this.dateBought} 
    setDateBought(date){return this.dateBought = date} 

    findPnL(newPrice) {
        if (!isNaN(newPrice)){
            if (this.trade_action === "Buy"){
                return truncate((newPrice - this.purchase_price) * this.quantity)
            }
            else{ 
                return truncate((this.purchase_price - newPrice) * this.quantity)
            }
        }
        //TODO 
        return 0
    }

    findPnLPercent(newPrice){
        if (newPrice === "Not Valid Trading Day") {
            return 0
        }

        if (this.trade_action === "Buy") {
            return truncate((newPrice - this.purchase_price)/this.purchase_price * 100)
        }
        else if (this.trade_action === "Sell"){
            return truncate((this.purchase_price - newPrice)/newPrice * 100)
        }

    }

    getCurrentPrice(globalCache, curDate){
        function findStockPosition(stockSymbol) {
            for (let i = 0; i < globalCache.length; i++) {
                if (globalCache[i].stock === stockSymbol) {
                    return i;
                }
            }
            return -1;
        }

        function getValue(pos){
            let res = "Not Valid Trading Day"
            globalCache[pos]["data"].forEach((ele) => {
                if (areDatesEqual(ele.date, curDate)) {
                    res = ele.value
                }
            })
            return res; 
        }

        const pos = findStockPosition(this.symbol) 
        console.assert(pos !== -1, "Error: Symbol not found in Cache") //Error if -1
        return getValue(pos); 
        
    }
}

class StocksObject {
    constructor(portfolio) {
        this.trades = [];
        this.numTrades = 0; 
        this.portfolio = portfolio;
    }

    getPortfolio() { return truncate(this.portfolio)}
    setPortfolio(val){return this.portfolio = truncate(val)}

    getTrades() { return this.trades; }
    setTrades(trade) { this.trades = trade; }
    addTrades(trade) { this.trades.push(trade); }

    getNumTrades() { return this.numTrades} 
    addNumTrade() {this.numTrades += 1}

    //automatically merge any entries like repeated buys or buys and sells on the same stock (Credit to GPT)
    combine() {
            // Using a map to store indices of symbols in the trades array
            let symbolIndices = {};

            // Iterate over trades
            for (let i = 0; i < this.trades.length; i++) {
                let trade = this.trades[i];
                if (symbolIndices[trade.symbol] !== undefined) {
                    // Found a duplicate
                    let duplicateIndex = symbolIndices[trade.symbol];
                    let duplicateTrade = this.trades[duplicateIndex];

                    if (trade.trade_action === duplicateTrade.trade_action) {
                        if (trade.trade_action === 'Buy') {
                            // Handle Buy-Buy case
                            let totalQuantity = parseFloat(trade.quantity) + parseFloat(duplicateTrade.quantity);
                            trade.purchase_price = (parseFloat(trade.purchase_price) * parseFloat(trade.quantity) + parseFloat(duplicateTrade.purchase_price) * parseFloat(duplicateTrade.quantity)) / totalQuantity;
                            trade.quantity = totalQuantity.toString();
                            trade.totalCost = trade.purchase_price * trade.quantity;
                        }
                        // Handle Sell-Sell case, if needed, similar to Buy-Buy

                        // Removing the duplicate entry
                        this.trades.splice(duplicateIndex, 1);
                        i--; // Adjusting the loop counter after splicing
                    } else {
                        // Handle Buy-Sell or Sell-Buy case
                        let buyTrade = trade.trade_action === 'Buy' ? trade : duplicateTrade;
                        let sellTrade = trade.trade_action === 'Sell' ? trade : duplicateTrade;

                        let netQuantity = parseFloat(buyTrade.quantity) - parseFloat(sellTrade.quantity);

                        if (netQuantity > 0) {
                            buyTrade.quantity = netQuantity.toString();
                            this.trades.splice(this.trades.indexOf(sellTrade), 1);
                            i--;
                        } else if (netQuantity < 0) {
                            sellTrade.quantity = (-netQuantity).toString();
                            this.trades.splice(this.trades.indexOf(buyTrade), 1);
                            i--;
                        } else {
                            // Quantity is equal, remove both
                            this.trades.splice(this.trades.indexOf(buyTrade), 1);
                            this.trades.splice(this.trades.indexOf(sellTrade), 1);
                            i -= 2; // Adjusting the loop counter after double splicing
                        }
                    }
                } else {
                    symbolIndices[trade.symbol] = i;
                }
            }
    }

    getBuy() {
        return this.trades.filter(trade => trade.trade_action === 'buy');
    }

    getSell() {
        return this.trades.filter(trade => trade.trade_action === 'sell');
    }

    calculatePortfolio(globalCache, currentDate, portfolio){
        let res = portfolio
        this.trades.forEach(ele => {
            const change = parseFloat(ele.findPnL(ele.getCurrentPrice(globalCache, currentDate)))
            res += change
        })
        return res
    }
}

class SimulationObject {
    constructor(userID, portfolioValue, numberOfTrades, totalGain) {
        this._userID = userID;
        this._portfolioValue = portfolioValue;
        this._numberOfTrades = numberOfTrades;
        this._totalGain = totalGain;
    }

    get userID() { return this._userID; }
    set userID(value) { this._userID = value; }

    get portfolioValue() { return truncate(this._portfolioValue); }
    set portfolioValue(value) { this._portfolioValue = value; }

    get numberOfTrades() { return this._numberOfTrades; }
    set numberOfTrades(value) { this._numberOfTrades = value; }

    get totalGain() { return truncate(this._totalGain); }
    set totalGain(value) { this._totalGain = value; }
}

export {
    TradeObject,
    StocksObject,
    SimulationObject
};