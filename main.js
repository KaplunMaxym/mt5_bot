const {connectionHandler} = require('./helpers/accountConnection');
const {errorDetailsHandler} = require('./helpers/connectionErrorHandler');

async function monitorEURUSDPrice() {
    try {
        const accountConnection = await connectionHandler();
        const connection = accountConnection.connection;
        const account = accountConnection.account;
        // Підписка на пару
        await connection.subscribeToMarketData('EURUSD');
        // Моніторинг ціни
        setTimeout(async () => {
            const terminalState = connection.terminalState;
            console.log('EURUSD price:', terminalState.price('EURUSD'));
        }, 10);
    } catch (err) {
        if(err.details) {
            errorDetailsHandler(err)
        }
        console.error(err);
    }
}

monitorEURUSDPrice();
