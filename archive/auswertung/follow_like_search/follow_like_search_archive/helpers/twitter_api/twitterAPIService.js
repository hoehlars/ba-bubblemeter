import getUser from "./getUserAPI"
import getLikes from './getLikesAPI'
import getFollows from "./getFollowsAPI"
import getFollowers from "./getFollowersAPI"

//returns the userId of an accountname
async function getUserId(username) {
    const user = await getUser(username)
    const userId = user.data.id
    return userId
}

//returns a list of postIds which were liked by the user
async function getLikesId(userId) {
    const likesRes = await getLikes(userId)
    var likesIds = []

    for (var i = 0; i < likesRes.length; i++){
        likesIds.push(likesRes[i].id)
    }

    return likesIds
}

//returns a list of postIds with name of the poster which were liked by the user
async function getLikesIdWithName(userId) {
    const likesRes = await getLikes(userId)
    
    var likesAndNames = []

    for (var i = 0; i < likesRes.length; i++){
        var postId = likesRes[i].id_str.toString()
        var username = likesRes[i].user.screen_name.toString()
        var likeWithName = {username: username, postId: postId}
        likesAndNames.push(likeWithName)
    }

    return likesAndNames
}

//returns a list of followerIds which the user follows
async function getFollowedIds(userId) {
    const followedUsers = await getFollows(userId)
    var followedUserIds = []

    followedUsers.forEach(followedUser => {
        followedUserIds.push(followedUser.id)
    });

    return followedUserIds
}

//returns a list of usernames which the user follows
async function getFollowedUsernames(userId) {
    const followedUsers = await getFollows(userId)
    var followedUsernames = []

    followedUsers.forEach(followedUser => {
        followedUsernames.push(followedUser.username)
    });

    return followedUsernames
}

async function getFollowerIds(userId) {
    const followers = await getFollowers(userId)
    var followerIds = []

    followers.forEach(follower => {
        followerIds.push(follower.id)
    });

    return followerIds
}

async function getFollowerUsernames(userId) {
    const followers = await getFollowers(userId)
    var followerUsernames = []

    followers.forEach(follower => {
        followerUsernames.push(follower.username)
    })

    return followerUsernames
}

export default {getUserId, getLikesId, getLikesIdWithName, getFollowedIds, getFollowedUsernames, getFollowerIds, getFollowerUsernames}