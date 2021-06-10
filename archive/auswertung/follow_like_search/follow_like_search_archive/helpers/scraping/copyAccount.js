import likeTweetFromOtherUser from './likeTweetFromOtherUser'
import followAccFromOtherUser from './followAccFromOtherUser'
import twitterAPIService from '../twitter_api/twitterAPIService'
import {delay} from '../other/delay'

export async function copyAccount(accountToCopy, page) {

    //get userId of username
    const accountToCopyId = await twitterAPIService.getUserId(accountToCopy);
    
    //get list of follower usernames
    const followers = await twitterAPIService.getFollowedUsernames(accountToCopyId)

    //get list of liked tweets with username and postId
    var likedTweets = await twitterAPIService.getLikesIdWithName(accountToCopyId)

    var i = 0;
    for(const follower of followers) {
        await followAccFromOtherUser(follower, page)
        i++
        console.log(i + "/" + followers.length)
        var randomValue = Math.floor(Math.random() * 10000)+2000
        await delay(randomValue)
    }

    var j = 0
    for(j = 0; j < likedTweets.length; j++){
        console.log(likedTweets[j].username +" "+likedTweets[j].postId)
        await likeTweetFromOtherUser(likedTweets[j].username.toString(), likedTweets[j].postId.toString(), page)
        j++
        console.log(j + "/" + likedTweets.length)
    }
    
}