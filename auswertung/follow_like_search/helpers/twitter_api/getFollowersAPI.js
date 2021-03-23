const fetch = require("node-fetch")
require('dotenv').config()
var bearerToken = process.env.bearerToken

export default async function getFollowers(userId) {

    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer " + bearerToken);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var fetchUrl = "https://api.twitter.com/2/users/" + userId.toString() +"/following"
    var result = (await fetch(fetchUrl, requestOptions)).json()
    return result
}