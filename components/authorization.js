/**
 * Authorization Methods to authorize Apps with Servant
 */

// Dependencies
var request = require('request');


/**
 *  Exchange AuthorizationCode for AccessToken
 */
module.exports.exchangeAuthCode = function(ServantDefaults, authorization_code, callback) {
    // Check if User is authorized or not by which params have been received
    if (authorization_code) {

        // Set Headers
        var headers = {
            'Connection': 'Keep-Alive',
            'Host': 'api0.servant.co',
            'Content-Type': 'application/json',
            'User-Agent': 'Servant Node SDK ' + ServantDefaults._sdk_version
        };

        // Set Data
        var data = JSON.stringify({
            grant_type: 'authorization_code',
            authorization_code: authorization_code,
            client_id: ServantDefaults._client_id,
            client_secret: ServantDefaults._client_secret
        });


        // Make Request to exchange AuthCode for AccessToken & Refresh Token
        request({
            headers: headers,
            method: 'POST',
            uri: ServantDefaults._protocol + '://api0.servant.co/connect/oauth2/exchange_auth_code',
            body: data,
            json: true,
            timeout: 4000
        }, function(error, response, body) {
            if (error) return callback(error, null);
            if (response.statusCode !== 200) return callback(body, null);
            if (response.statusCode == 200) return callback(null, body);
        });
    } else {
        throw new Error('Something has gone wrong with the authorization process.  Make sure the Connect URL is correct and it contains a response_type=code parameter.');
    } // if req.query.code == Check type of response
}; // exchangeAuthCode



/**
 *  Refresh AccessToken via RefreshToken
 */
module.exports.refreshAccessToken = function(ServantDefaults, refresh_token, callback) {

    // Set Headers
    var headers = {
        'Connection': 'Keep-Alive',
        'Host': 'api0.servant.co',
        'Content-Type': 'application/json',
        'User-Agent': 'Servant Node SDK ' + ServantDefaults._sdk_version
    };

    // Set Data
    var data = JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: ServantDefaults._client_id,
        client_secret: ServantDefaults._client_secret
    });

    // Make Request to Refresh Access Token
    request({
        headers: headers,
        method: 'POST',
        uri: ServantDefaults._protocol + '://api0.servant.co/connect/oauth2/refresh_access_token',
        body: data,
        json: true,
        timeout: 4000
    }, function(error, response, body) {
        if (error) return callback(error, null);
        if (response.statusCode !== 200) return callback(body, null);
        if (response.statusCode == 200) return callback(null, body);
    });

}; // refreshAccessToken 


// End