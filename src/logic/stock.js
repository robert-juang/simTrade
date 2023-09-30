class TradeObject {
    constructor(symbol, current_price, purchase_price, quantity, trade_action) {
        this.symbol = symbol;
        this.current_price = current_price;
        this.purchase_price = purchase_price;
        this.quantity = quantity;
        this.trade_action = trade_action;
        this.PnL = quantity * (current_price - purchase_price);
        this.totalCost = purchase_price * quantity;
    }

    getSymbol() { return this.symbol; }
    setSymbol(symbol) { this.symbol = symbol; }

    getCurrentPrice() { return this.current_price; }
    setCurrentPrice(current_price) { this.current_price = current_price; }

    getPurchasePrice() { return this.purchase_price; }
    setPurchasePrice(purchase_price) { this.purchase_price = purchase_price; }

    getQuantity() { return this.quantity; }
    setQuantity(quantity) { this.quantity = quantity; }

    getTradeAction() { return this.trade_action; }
    setTradeAction(trade_action) { this.trade_action = trade_action; }

    getPnL() { return this.PnL; }
    setPnL(pnl) { this.PnL = pnl; }

    findPnLPercent() {
        return (((this.current_price - this.purchase_price) / this.purchase_price) * 100.0);
    }

    findCurrentValue() {
        return this.quantity * this.current_price;
    }
}

class StocksObject {
    constructor(portfolio) {
        this.trades = [];
        this.portfolio = portfolio;
    }

    getTrades() { return this.trades; }
    setTrades(trade) { this.trades = trade; }
    addTrades(trade) { this.trades.push(trade); }

    combine() {
        let combined = {};

        this.trades.forEach((trade) => {
            let key = trade.symbol + '-' + trade.trade_action;
            if (combined[key]) {
                combined[key].quantity = (parseInt(combined[key].quantity, 10) + parseInt(trade.quantity, 10)).toString();
            } else {
                combined[key] = new TradeObject(trade.symbol, 100, trade.purchase_price, trade.quantity, trade.trade_action);
            }
        });

        this.trades = Object.values(combined).filter(trade => trade.quantity !== 0);
    }

    getBuy() {
        return this.trades.filter(trade => trade.trade_action === 'buy');
    }

    getSell() {
        return this.trades.filter(trade => trade.trade_action === 'sell');
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

    get portfolioValue() { return this._portfolioValue; }
    set portfolioValue(value) { this._portfolioValue = value; }

    get numberOfTrades() { return this._numberOfTrades; }
    set numberOfTrades(value) { this._numberOfTrades = value; }

    get totalGain() { return this._totalGain; }
    set totalGain(value) { this._totalGain = value; }
}

export {
    TradeObject,
    StocksObject,
    SimulationObject
};