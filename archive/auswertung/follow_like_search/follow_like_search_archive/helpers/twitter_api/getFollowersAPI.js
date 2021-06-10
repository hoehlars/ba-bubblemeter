import { delay } from "../other/delay";

//15 requests in 15 minutes
const fetch = require("node-fetch")
const fs = require("fs")
const requestCountJSON = require("../../followerRequestCount.json")
require('dotenv').config()
var bearerToken = process.env.bearerToken
const MAX_REQUESTS = 15 //The twitter API only allows 15 requests in 15 minutes
const FIFTEEN_MINUTES = 905000 //Fifteen minutes and 5 seconds in milliseconds

if(!requestCountJSON.lastRequestTime){
    var count = 0
} else if((Date.now() - requestCountJSON.lastRequestTime) >= FIFTEEN_MINUTES) {
    var count = 0
} else {
    var count = requestCountJSON.counter
}

export default async function getFollowers(userId) {

    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer " + bearerToken);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var fetchUrl = "https://api.twitter.com/2/users/" + userId.toString() +"/followers?max_results=1000"
    await checkRequestCount()
    var resultJSON = await (await fetch(fetchUrl, requestOptions)).json()
    var followers = []
    
    followers = addData(resultJSON.data, followers)

    while(resultJSON.meta.next_token) {
        var newFetchUrl = fetchUrl + "&pagination_token=" + resultJSON.meta.next_token.toString()
        await checkRequestCount()
        resultJSON = await (await fetch(newFetchUrl, requestOptions)).json()
        followers = addData(resultJSON.data, followers)
    }

    return followers
}

function addData(data, list) {
    data.forEach(dataSet => {
        var dataSetObject = {id: dataSet.id, name: dataSet.name, username: dataSet.username}
        list.push(dataSetObject)
    })
    return list
}

async function checkRequestCount() {
    count++ //one request was made

    await writeToJSON(count)

    if(count > MAX_REQUESTS) {
        console.log("Maximum number of FOLLOWER REQUESTS has been reached!")
        console.log("Please wait for 15 minutes...")
        await delay(FIFTEEN_MINUTES)
        count = 0
    }
}

async function writeToJSON(number) {
    var counted = {name: "followerRequests", counter: number, lastRequestTime: Date.now()}
    var data = JSON.stringify(counted)
    fs.writeFileSync('./followerRequestCount.json', data, err => {
        if(err){
            console.log(err)
        }
    })
}