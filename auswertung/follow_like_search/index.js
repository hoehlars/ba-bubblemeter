const readXlsxFile = require('read-excel-file/node');
import copyAccount from './helpers/scraping/copyAccount'
import getSearchResults from './helpers/scraping/getSearchResults'
import randomDelay from './helpers/other/randomDelay'
import { getBrowser } from './helpers/scraping/getBrowser';
import { getPage } from './helpers/scraping/getPage';
import { loginToTwitter } from './helpers/scraping/login';

// Read in accounts from excel and copy these accounts (follow and like everyone)
readXlsxFile('Klone.xlsx').then((rows) => {

    //***********************************************/
    // Copying account                              */
    //***********************************************/
    for(const row of rows) {
        const clone = row[0]
        const passwordOfClone = row[1]
        const accountToCopy = row[2]
        const passwordOfAccountToCopy = row[3]

        const browser = await getBrowser();
        const page = await getPage(browser);
        await loginToTwitter(clone, passwordOfClone, page);

        copyAccount(clone, passwordOfClone, accountToCopy, page).then(() => {
            console.log(`Liked and followed everyone of ${accountToCopy} for clone ${clone}`)
        })
        await browser.close();
    }

    //***********************************************/
    // Save search results from clone               */
    //***********************************************/
    const browser = await getBrowser();
    const page = await getPage(browser);
    await loginToTwitter(clone, passwordOfClone, page)

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


    //***********************************************/
    // Save search results of account to copy       */
    //***********************************************/
    const browser = await getBrowser();
    const page = await getPage(browser);
    await loginToTwitter(accountToCopy, passwordOfAccountToCopy, page)

    for (const query of queries) {
        // get search results
        await getSearchResults(query, accountToCopy, page).then(() => {
            console.log(`Saved results of query ${query} for user ${accountToCopy}`)
        })
        await randomDelay()
        // go back home
        await page.goto('https://twitter.com/home', { waitUntil: 'networkidle2' })
    }
    await browser.close()
})











