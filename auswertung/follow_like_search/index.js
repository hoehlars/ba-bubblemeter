import likeTweetFromOtherUser from './helpers/scraping/likeTweetsFromOtherUser'
import followAccFromOtherUser from './helpers/scraping/followAccsFromOtherUser'
import twitterAPIService from './helpers/twitter_api/twitterAPIService'
import delay from './helpers/other/delay'
import { getBrowserPage } from './helpers/scraping/getBrowserPage';

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
    
    const page = await getBrowserPage();

    //get userId of username
    const accountToCopyId = await twitterAPIService.getUserId(accountToCopy);
    
    //get list of follower usernames
    const followers = await twitterAPIService.getFollowersUsername(accountToCopyId)

    //get list of liked tweets with username and postId
    const likedTweets = await twitterAPIService.getLikesIdWithName(accountToCopyId)
    
    await loginToTwitter(clone, passwordOfClone, page);
                
    // wait till page load
    await page.waitForNavigation()

    for(const follower of followers) {
        await followAccFromOtherUser(follower, page)
        await delay(15000)
    }

    for(const [twitterer, tweetID] of Object.entries(likedTweets)) {
        await likeTweetFromOtherUser(twitterer, tweetID, page)
        await delay(10000)
    }
    await browser.close();    
}









