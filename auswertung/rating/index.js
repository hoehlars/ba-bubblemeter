// DummyData
import { globalObjects as originalDataset } from './testData/Burkaverbot@DanielLerch7.json'
import { globalObjects as cloneDataset } from './testData/Burkaverbot@RealSchmid.json'

const testOriginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const testPerfectClone = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const testGoodClone = [4, 3, 2, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const testMediocreClone = [5, 6, 4, 3, 2, 11, 17, 89, 8, 15, 10, 19, 19, 14, 9]
const testBadClone = [11, 22, 23, 24, 25, 16, 2, 18, 19, 55, 11, 52, 53, 54, 55]

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
  // closeOnes are hits 1 to 5 positions apart
  let closeOnes = []

  cloneSearchResults.map((tweet, i) => {
    const comparedTweet = originalSearchResults.indexOf(tweet)
    if (comparedTweet >= 0) {
      //   console.log('got a hit!')
      hits.push(comparedTweet)
      if (comparedTweet == i) {
        // console.log('got a match!')
        matches.push(comparedTweet)
      } else if (Math.abs(comparedTweet, i) <= 5) {
        // console.log('got a closeOne!')
        closeOnes.push(comparedTweet)
      }
    }
  })
  const comparison = { hits, matches, closeOnes }
  return comparison
}

const comparison = compareResults(originalSearchResults, cloneSearchResults)
// const comparison = compareResults(testOriginal, testPerfectClone)
// const comparison = compareResults(testOriginal, testGoodClone)
// const comparison = compareResults(testOriginal, testMediocreClone)
// const comparison = compareResults(testOriginal, testBadClone)

// console.log(comparison)

//***********************************************/
// Rate Results                                 */
//***********************************************/

// rating system variables
const base = 2 // base multiplikator, increase value to stretch out results
const topRank = 5 // tweets from 0 to 5 count as TopRank
const topBonus = 3 // bonus multiplikator for top-ranked hits and matches
const mediumRank = 10 // tweets from 5 to 10 count as MediumRank
const mediumBonus = 2 // bonus multiplikator for medium-ranked hits and matches
// const proximityBonus = 2 // bonus multiplikator for tweets that are up to 5 ranks apart
// const matchBonus = 3 // bonus multiplikator for tweets that match the rank

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
  let closeOnesScore = 0
  let matchScore = 0
  // calculate hit score
  results.hits.forEach((result) => {
    hitScore += base * getRankBonus(result)
  })
  // calculate closeOne Score
  results.closeOnes.forEach((result) => {
    closeOnesScore += base * getRankBonus(result)
  })
  // calculate match score
  results.matches.forEach((result) => {
    matchScore += base * getRankBonus(result)
  })
  const score = {
    score: hitScore + 2 * closeOnesScore + 3 * matchScore,
    nrOfHits: results.hits.length,
    nrOfCloseOnes: results.closeOnes.length,
    nrOfMatches: results.matches.length,
    comparison,
  }
  return score
}

const score = rateResults(comparison)
console.log(score)
