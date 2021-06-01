

export default async function followAccsFromOtherUser(accountNameToFollow, page) {
  await page.goto('https://twitter.com/home')
  await page.goto(`https://twitter.com/${accountNameToFollow}`)
  await page.waitForSelector('div[data-testid*="follow"]')
  await page.click('div[data-testid*="follow"]')
  console.log(`Followed ${accountNameToFollow}!`)
}