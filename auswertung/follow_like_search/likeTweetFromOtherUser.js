

export default async function likeTweetFromOtherUser(twitterer, tweetID, page) {
  await page.goto(`https://twitter.com/${twitterer}/status/${tweetID}`)
  await page.waitForSelector('div[data-testid="like"]')
  await page.click('div[data-testid="like"]')
  console.log(`Liked ${tweetID}!`)
}


