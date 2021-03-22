export async function loginToTwitter(username, password, page) {
    // open twitter
    await page.goto('https://twitter.com/login')
                
    // Login
    await page.waitForSelector('input[type="text"]')
    await page.type('input[type="text"]', username)
    await page.waitForSelector('input[type="password"]')
    await page.type('input[type="password"]', password)
    await page.click('div[role="button"]')
    console.log(`Logged in the user ${clone}!`)
}