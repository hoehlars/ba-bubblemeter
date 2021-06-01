import getUser from "./getUserAPI"
import getLikes from './geLikesAPI'
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
    var likesIdsWithNames = []

    for (var i = 0; i < likesRes.length; i++){
        var postId = likesRes[i].id.toString()
        var username = likesRes[i].user.screen_name
        var likeWithName = {}

        likeWithName[username] = postId
        likesIdsWithNames.push(likeWithName)
    }

    return likesIdsWithNames
}

//returns a list of followerIds which the user follows
async function getFollowersId(userId) {
    const followersRes = await getFollowers(userId)
    var followersIds = []

    followersRes.data.forEach(follower => {
        followersIds.push(follower.id)
    });

    return followersIds
}

//returns a list of usernames which the user follows
async function getFollowersUsername(userId) {
    const followersRes = await getFollowers(userId)
    var followersUsernames = []

    followersRes.data.forEach(follower => {
        followersUsernames.push(follower.username)
    });

    return followersUsernames
}

export default {getUserId, getLikesId, getLikesIdWithName, getFollowersId, getFollowersUsername}