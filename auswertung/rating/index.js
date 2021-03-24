// DummyData
import { globalObjects as originalDataset } from './testData/Burkaverbot@DanielLerch7.json'
import { globalObjects as cloneDataset } from './testData/Burkaverbot@RealSchmid.json'
const tweetDepth = 15 // number of tweets to rate, TODO: (min = 10, throw error, if not enough data)

//***********************************************/
// Prepare Data                                 */
//***********************************************/

function prepareData(resultsToPrepare, tweetDepth) {
  const arrayOfTweets = Object.keys(resultsToPrepare.tweets)
  const preparedData = arrayOfTweets.slice(0, tweetDepth)
  return preparedData
}

const originalSearchResults = prepareData(originalDataset, tweetDepth)
const cloneSearchResults = prepareData(cloneDataset, tweetDepth)

//***********************************************/
// Compare Results                              */
//***********************************************/

function compareResults(originalSearchResults, cloneSearchResults) {
  // hits are tweets found in each dataset
  let hits = []
  // matches are hits located on the same position in both datasets.
  let matches = []

  cloneSearchResults.map((tweet, i) => {
    const comparedTweet = originalSearchResults.indexOf(tweet)
    if (comparedTweet >= 0) {
      //   console.log('got a hit!')
      hits.push(comparedTweet)
      if (comparedTweet == i) {
        // console.log('got a match!')
        matches.push(comparedTweet)
      }
    }
  })
  const comparison = { hits, matches }
  return comparison
}

const comparison = compareResults(originalSearchResults, cloneSearchResults)
// console.log(comparison)

//***********************************************/
// Rate Results                              */
//***********************************************/

// rating system variables
const base = 2 // base multiplikator, increase value to stretch out results
const topRank = 3 // tweets from 0 to 3 count as TopRank
const topBonus = 3 // bonus multiplikator for top-ranked hits and matches
const mediumRank = 8 // tweets from 4 to 8 count as MediumRank
const mediumBonus = 2 // bonus multiplikator for medium-ranked hits and matches

const maxPossibleScore =
  2 *
  (topBonus * base * (topRank + 1) +
    topBonus * base * (mediumRank - topRank) +
    base * (tweetDepth - 8))

function getRankBonus(result) {
  // set a bonus factor for Matches and Hits in the upper rankings (of Original Dataset)
  let bonus
  if (result <= topRank) {
    bonus = topBonus
  } else if (result <= mediumRank) {
    bonus = mediumBonus
  } else {
    bonus = 1
  }
  return bonus
}

function rateResults(results) {
  let hitScore = 0
  let matchScore = 0
  // calculate hit score
  results.hits.forEach((result) => {
    hitScore += base * getRankBonus(result)
  })
  // calculate match score
  results.matches.forEach((result) => {
    matchScore += base * getRankBonus(result)
  })
  const score = {
    score: hitScore + matchScore,
    nrOfHits: results.hits.length,
    nrOfMatches: results.matches.length,
    maxPossibleScore: maxPossibleScore,
    comparison,
  }
  return score
}

const score = rateResults(comparison)
console.log(score)
