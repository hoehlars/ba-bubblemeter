import likeTweetFromOtherUser from './helpers/scraping/likeTweetsFromOtherUser'
import followAccFromOtherUser from './helpers/scraping/followAccsFromOtherUser'
import twitterAPIService from './helpers/twitter_api/twitterAPIService'
import delay from './helpers/other/delay'

export function copyAccount(clone, passwordOfClone, accountToCopy, page) {

    //get userId of username
    const accountToCopyId = await twitterAPIService.getUserId(accountToCopy);
    
    //get list of follower usernames
    const followers = await twitterAPIService.getFollowersUsername(accountToCopyId)

    //get list of liked tweets with username and postId
    const likedTweets = await twitterAPIService.getLikesIdWithName(accountToCopyId)

    for(const follower of followers) {
        await followAccFromOtherUser(follower, page)
        await delay(15000)
    }

    for(const [twitterer, tweetID] of Object.entries(likedTweets)) {
        await likeTweetFromOtherUser(twitterer, tweetID, page)
        await delay(10000)
    }  
}