
export async function getBrowserPage() {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            'no-sandbox',
        ]
    });
    
    const page = await browser.newPage();
    
    // set user agent
    page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
    )
    return page;
}
