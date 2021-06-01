import likeTweetFromOtherUser from './likeTweetsFromOtherUser'
import followAccsFromOtherUser from './followAccsFromOtherUser'
import twitterAPIService from './twitterAPIService'
import getLikes from './geLikesAPI';

const puppeteer = require('puppeteer');
const readXlsxFile = require('read-excel-file/node');


// Read in excel
readXlsxFile('Klone.xlsx').then((rows) => {
    for(const row of rows) {
        const clone = row[0]
        const passwordOfClone = row[1]
        const accountToCopy = row[2]
        copyAccount(clone, passwordOfClone, accountToCopy).then(() => {
            console.log(`Liked and followed everyone of ${accountToCopy} for clone ${clone}`)
        })
    }
})

async function copyAccount(clone, passwordOfClone, accountToCopy) {
    
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            'no-sandbox',
        ]
    });
    const page = await browser.newPage();

    //get userId of username
    const accountToCopyId = await twitterAPIService.getUserId(accountToCopy);
    
    //get list of follower usernames
    const followers = await twitterAPIService.getFollowersUsername(accountToCopyId)

    //get list of liked tweets with username and postId
    const likedTweets = await twitterAPIService.getLikesIdWithName(accountToCopyId)
    
    // open twitter
    await page.goto('https://twitter.com/login')
                
    // Login
    await page.waitForSelector('input[type="text"]')
    await page.type('input[type="text"]', clone)
    await page.waitForSelector('input[type="password"]')
    await page.type('input[type="password"]', passwordOfClone)
    await page.click('div[role="button"]')
    console.log(`Logged in the clone ${clone}!`)
                
    // wait till page load
    await page.waitForNavigation()

    for(const follower of followers) {
        await followAccsFromOtherUser(follower, page)
        await delay(15000)
    }

    for(const [twitterer, tweetID] of Object.entries(likedTweets)) {
        await likeTweetFromOtherUser(twitterer, tweetID, page)
        await delay(10000)
    }
    await browser.close();    
}


function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}






