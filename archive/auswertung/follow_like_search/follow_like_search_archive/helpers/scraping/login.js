export async function loginToTwitter(username, password, page) {
    // open twitter
    await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2' })
                
    // assure fields are loaded
    await page.waitForSelector('input[type="text"]')
    await page.waitForSelector('input[type="password"]')
    await page.waitForSelector('div[role="button"]')

    // login
    await page.type('input[type="text"]', username, { delay: 5 })
    await page.type('input[type="password"]', password, { delay: 4 })
    await page.click('div[role="button"]')

    // wait till page load
    await page.waitForNavigation()

    console.log(`Logged in the user ${username}!`)
}