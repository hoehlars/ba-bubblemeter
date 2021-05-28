const FETCH_OPTIONS = {
  method: 'GET',
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const fetchUserAnalysis = async (twitterId) => {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}get_analysis/${twitterId}`,
    FETCH_OPTIONS
  )
  const resJson = await res.json()
  return resJson.body
}

export const requestAnalysis = async (handleOrId, email) => {
  const analysis = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}request_analysis/${handleOrId}/${email}`,
    FETCH_OPTIONS
  )
  const analysisJson = await analysis.json()
  return analysisJson.body.msg
}

export const fetchAnalizedUsers = async () => {
  const analyzedUsers = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}request_analyzed_users`,
    FETCH_OPTIONS
  )
  const analyzedUsersJson = await analyzedUsers.json()
  return analyzedUsersJson.body
}

export const fetchRequestQueueLength = async () => {
  const queueLength = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}request_queue_length`,
    FETCH_OPTIONS
  )
  const queueLengthJson = await queueLength.json()
  return queueLengthJson.body
}

// export const fetchAnalysisData = async (twitterId) => {
//   const res = await fetch(
//     `${process.env.REACT_APP_BACKEND_URL}make_analysis/${twitterId}`,
//     FETCH_OPTIONS
//   )
//   const resJson = await res.json()
//   return resJson.body
// }

// export const fetchInnerOuterCircleData = async (twitterId) => {
//   const innerOuterCircleRes = await fetch(
//     `${process.env.REACT_APP_BACKEND_URL}inner_outer_circle/${twitterId}`,
//     FETCH_OPTIONS
//   )
//   const innerOuterCircleJson = await innerOuterCircleRes.json()
//   return innerOuterCircleJson.body
// }

// export const fetchCentroidData = async (twitterId) => {
//   const centroidRes = await fetch(
//     `${process.env.REACT_APP_BACKEND_URL}centroid/${twitterId}`,
//     FETCH_OPTIONS
//   )
//   const centroidJson = await centroidRes.json()
//   return centroidJson.body
// }

// export const fetchScore = async (twitterId) => {
//   const score = await fetch(
//     `${process.env.REACT_APP_BACKEND_URL}polit_score/${twitterId}`,
//     FETCH_OPTIONS
//   )
//   const scoreJson = await score.json()
//   return scoreJson.body
// }

// export const fetchSortedPartyList = async (twitterId) => {
//   const partyList = await fetch(
//     `${process.env.REACT_APP_BACKEND_URL}most_influential_party/${twitterId}`,
//     FETCH_OPTIONS
//   )
//   const partyListJson = await partyList.json()
//   const partyArray = Object.entries(partyListJson.body.parties)
//   const sortedPartyArray = partyArray.sort((a, b) => b[1] - a[1])
//   return sortedPartyArray
// }
