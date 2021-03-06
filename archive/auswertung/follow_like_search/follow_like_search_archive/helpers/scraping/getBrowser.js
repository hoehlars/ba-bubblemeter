const puppeteer = require('puppeteer');

export async function getBrowser() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            'no-sandbox',
        ]
    });
    return browser;
}
