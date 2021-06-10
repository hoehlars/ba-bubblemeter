//300 requests in 15 minutes
const fetch = require("node-fetch")
require('dotenv').config()
var bearerToken = process.env.bearerToken

export default async function getUser(username) {

    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer " + bearerToken);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    var fetchUrl = "https://api.twitter.com/2/users/by/username/" + username.toString()
    var result = await (await fetch(fetchUrl, requestOptions)).json()
    return result
}