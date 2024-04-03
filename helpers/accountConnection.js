const MetaApi = require('metaapi.cloud-sdk').default;
require('dotenv').config();

// Note: for information on how to use this example code please read https://metaapi.cloud/docs/client/usingCodeExamples

const token = process.env.TOKEN || '<put in your token here>';
const login = process.env.LOGIN || '<put in your MT login here>';
const password = process.env.PASSWORD || '<put in your MT password here>';
const serverName = process.env.SERVER || '<put in your MT server name here>';
const api = new MetaApi(token);

const connectionHandler = async () => {
    const accounts = await api.metatraderAccountApi.getAccountsWithInfiniteScrollPagination();
    let account = accounts.find(a => a.login === login && a.type.startsWith('cloud'));
    if (!account) {
        console.log('Adding MT5 account to MetaApi');
        account = await api.metatraderAccountApi.createAccount({
            name: 'Test account',
            type: 'cloud',
            login: login,
            password: password,
            server: serverName,
            platform: 'mt5',
            magic: 1000
        });
    } else {
        console.log('MT5 account already added to MetaApi');
    }

    // wait until account is deployed and connected to broker
    console.log('Deploying account');
    await account.deploy();
    console.log('Waiting for API server to connect to broker (may take couple of minutes)');
    await account.waitConnected();

    // connect to MetaApi API
    const connection = account.getStreamingConnection();
    await connection.connect();

    // wait until terminal state synchronized to the local state
    console.log('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)');
    await connection.waitSynchronized();

    return {"connection": connection, "account": account};
};


module.exports = { connectionHandler };
