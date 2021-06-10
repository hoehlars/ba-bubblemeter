export async function getPage(browser) {
    const page = await browser.newPage();

    await page.setViewport({
        width: 1280,
        height: 980,
        deviceScaleFactor: 1,
    })
    
    // set user agent
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
    )
    return page;
}