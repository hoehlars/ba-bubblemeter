

readXlsxFile('User.xlsx').then((rows) => {
    const username = rows[0]
    const password = rows[1]

    //***********************************************/
    // Save search results from username            */
    //***********************************************/
    const browser = await getBrowser();
    const page = await getPage(browser);
    await loginToTwitter(username, password, page)

    for (const query of queries) {
        // get search results
        await getSearchResults(query, clone, page).then(() => {
            console.log(`Saved results of query ${query} for user ${clone}`)
        })
        await randomDelay()
        // go back home
        await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2' })
    }
    await browser.close();
})
    