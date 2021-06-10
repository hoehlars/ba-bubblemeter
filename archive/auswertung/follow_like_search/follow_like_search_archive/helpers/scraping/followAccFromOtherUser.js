import { delay } from "../other/delay"


export default async function followAccFromOtherUser(accountNameToFollow, page) {
  await page.goto('https://twitter.com/home', {waitUntil: 'networkidle2'})
  var randomValue = Math.floor(Math.random() * 5000)+2000
  await delay(randomValue)
  await page.goto(`https://twitter.com/${accountNameToFollow}`, {waitUntil: 'networkidle2'})
  await page.waitForSelector('div[data-testid*="follow"]')
  await page.click('div[data-testid*="follow"]')
  console.log(`Followed ${accountNameToFollow}!`)
  await randomAction(page)
}

async function randomAction(page) {
  var choice = Math.floor(Math.random() * 5) + 1
  
  switch(choice) {
    case 1:
      console.log("caret")
      await page.waitForSelector('div[data-testid*="caret"]')
      await page.click('div[data-testid*="caret"]')
      await delay(2000)
      await page.waitForSelector('div[data-testid*="titleContainer"]')
      await page.click('div[data-testid*="titleContainer"]')
      await delay(4000)
      break
    case 2:
      console.log("title")
      await page.waitForSelector('div[data-testid*="titleContainer"]')
      await page.click('div[data-testid*="titleContainer"]')
      await delay(3000)
      break
    case 3:
      console.log("settings")
      await page.waitForSelector('a[href*="/settings/trends"]')
      await page.click('a[href*="/settings/trends"]')
      await delay(2000)
      await page.waitForSelector('div[aria-label*="Close"]')
      await page.click('div[aria-label*="Close"]')
      await delay(3000)
      break
    case 4:
      console.log("header")
      await page.waitForSelector('header')
      await page.click('header')
      await page.click('header')
      await page.click('header')
      await delay(5000)
      break
    case 5:
      console.log("userCell")
      await page.waitForSelector('div[data-testid*="UserCell"]')
      await page.click('div[data-testid*="UserCell"]')
      await delay(6000)
      break
  }

  
}