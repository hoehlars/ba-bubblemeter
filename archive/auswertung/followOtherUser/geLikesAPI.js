const fetch = require("node-fetch")
require('dotenv').config()
var bearerToken = process.env.bearerToken

export default async function getLikes(userId) {

    var myHeaders = new fetch.Headers();
    //myHeaders.append("Authorization", "OAuth oauth_consumer_key=\"" + consumerKey + "\",oauth_token=\"" + accessToken + "\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1616402118\",oauth_nonce=\"JQdeV3zuFWz\",oauth_version=\"1.0\",oauth_signature=\"U%2FCVL4Uaf6H6lNSBLnwo3yX8pgI%3D\"");
    myHeaders.append("Authorization", "Bearer " + bearerToken);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var fetchUrl = "https://api.twitter.com/1.1/favorites/list.json?user_id=" + userId.toString()
    var result = (await fetch(fetchUrl, requestOptions)).json()
    return result
}