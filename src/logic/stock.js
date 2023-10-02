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
        if (this.trade_action === "Buy") {
            return truncate((newPrice - this.purchase_price)/this.purchase_price * 100)
        }
        else {
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
        this.portfolio = portfolio;
    }

    getPortfolio() { return truncate(this.portfolio)}
    setPortfolio(val){return this.portfolio = truncate(val)}

    getTrades() { return this.trades; }
    setTrades(trade) { this.trades = trade; }
    addTrades(trade) { this.trades.push(trade); }

    combine() {
        // let combined = {};

        // this.trades.forEach((trade) => {
        //     let key = trade.symbol + '-' + trade.trade_action;
        //     if (combined[key]) {
        //         combined[key].quantity = (parseInt(combined[key].quantity, 10) + parseInt(trade.quantity, 10)).toString();
        //     } else {
        //         combined[key] = new TradeObject(trade.symbol, 100, trade.purchase_price, trade.quantity, trade.trade_action);
        //     }
        // });

        // this.trades = Object.values(combined).filter(trade => trade.quantity !== 0);
    }

    getBuy() {
        return this.trades.filter(trade => trade.trade_action === 'buy');
    }

    getSell() {
        return this.trades.filter(trade => trade.trade_action === 'sell');
    }

    calculatePortfolio(globalCache, currentDate){
        let res = this.portfolio
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