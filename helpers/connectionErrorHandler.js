const errorDetailsHandler = (error) => {
    // returned if the server file for the specified server name has not been found
    // recommended to check the server name or create the account using a provisioning profile
    if(error.details === 'E_SRV_NOT_FOUND') {
        console.error(error);
        // returned if the server has failed to connect to the broker using your credentials
        // recommended to check your login and password
    } else if (error.details === 'E_AUTH') {
        console.log(error);
        // returned if the server has failed to detect the broker settings
        // recommended to try again later or create the account using a provisioning profile
    } else if (error.details === 'E_SERVER_TIMEZONE') {
        console.log(error);
    }
}

module.exports = { errorDetailsHandler };
