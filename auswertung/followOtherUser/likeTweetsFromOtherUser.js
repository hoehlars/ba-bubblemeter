

export default async function likeTweetFromOtherUser(username, password, twitterer, tweetID, page) {
  // open twitter
  console.log('opens twitter')
  await page.goto('https://twitter.com/login');
        
  // Login
  console.log('logging in the user')
  await page.waitForSelector('input[type="text"]')
  await page.type('input[type="text"]', username)
  await page.waitForSelector('input[type="password"]')
  await page.type('input[type="password"]', password)
  await page.click('div[role="button"]')
        
  // wait till page load
  await page.waitForNavigation()

  console.log(`opening tweet ${tweetID}`)
  await page.goto(`https://twitter.com/${twitterer}/status/${tweetID}`)
  await page.waitForSelector('div[data-testid="like"]')
  await page.click('div[data-testid="like"]')
  console.log(`liked ${tweetID}!`)
}


