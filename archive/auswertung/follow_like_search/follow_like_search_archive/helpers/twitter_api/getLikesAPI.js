//75 requests in 15 minutes
const fetch = require("node-fetch")
require('dotenv').config()
var bearerToken = process.env.bearerToken

export default async function getLikes(userId) {

    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer " + bearerToken);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var fetchUrl = "https://api.twitter.com/1.1/favorites/list.json?user_id=" + userId.toString() + "&count=200"
    var result = await (await fetch(fetchUrl, requestOptions)).json()

    var newOldest = 0
    var lastOldest = 1
    while(lastOldest !== newOldest){
        lastOldest = result[result.length - 1].id_str.toString()
        var newFetchUrl = "https://api.twitter.com/1.1/favorites/list.json?user_id=" + userId.toString() + "&count=200&max_id=" + result[result.length - 1].id_str.toString()
        var newResult = await (await fetch(newFetchUrl, requestOptions)).json()
        result = result.concat(newResult)
        newOldest = result[result.length - 1].id_str.toString()
    }

    return result
}