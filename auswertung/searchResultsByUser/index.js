const puppeteer = require('puppeteer')
const fs = require('fs')
const { default: getSearchResults } = require('./getSearchResults')
import randomDelay from './helpers/randomDelay'

const userName = '@RealSchmid'
const password = '6EStjCdBnMkxaLw'
const data = fs.readFileSync('./suchbegriffe.json')
const { queries } = JSON.parse(data)

;(async function scrape() {
  // TODO: Extract Puppeteer Setup and Twitter Login to separate, shared Functions

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1280,
    height: 980,
    deviceScaleFactor: 1,
  })

  // might be helpful for not getting tossed out that quickly...
  page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
  )

  //***********************************************/
  // LOGIN                                        */
  //***********************************************/

  // open twitter
  await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2' })

  // assure fields are loaded
  await page.waitForSelector('input[name="session[password]"]')
  await page.waitForSelector('input[name="session[username_or_email]"]')
  await page.waitForSelector('div[data-testid="LoginForm_Login_Button"]')

  // Login
  await page.type('input[type="text"]', userName, { delay: 5 })
  await page.type('input[type="password"]', password, { delay: 4 })
  await page.click('div[role="button"]')
  console.log(`Logged in as ${userName}!`)

  // wait till page load
  await page.waitForNavigation()

  //***********************************************/
  // Search tweets                                */
  //***********************************************/

  // single query for dev purposes:
  // await getSearchResults(queries[0], userName, page)

  for (const query of queries) {
    // get Search results
    await getSearchResults(query, userName, page)
    await randomDelay()
    // go back home
    await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2' })
  }

  //***********************************************/
  // goodbye                                      */
  //***********************************************/

  await browser.close()
})()
