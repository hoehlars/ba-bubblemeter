import { delay } from "../other/delay"


export default async function likeTweetFromOtherUser(twitterer, tweetID, page) {
  await page.goto(`https://twitter.com/${twitterer}/status/${tweetID}`)
  try {
    await page.waitForSelector('div[data-testid="like"]')
    await page.click('div[data-testid="like"]')
  }
  catch(err) {
    console.log("There was an error!")
  }
  await delay(2000)
  console.log(`Liked ${tweetID}!`)
}


