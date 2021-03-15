

export default async function followAccsFromOtherUser(username, password, accountNameToFollow, page) {
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

  console.log(`Opening twitter page ${accountNameToFollow}`)
  await page.goto(`https://twitter.com/${accountNameToFollow}`)
  await page.waitForSelector('div[data-testid*="follow"]')
  await page.click('div[data-testid*="follow"]')
  console.log(`Followed ${accountNameToFollow}!`)
}