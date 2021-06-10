const readXlsxFile = require('read-excel-file/node');
import { copyAccount } from './helpers/scraping/copyAccount'
import { getBrowser } from './helpers/scraping/getBrowser';
import { getPage } from './helpers/scraping/getPage';
import { loginToTwitter } from './helpers/scraping/login';

// Read in accounts from excel and copy these accounts (follow and like everyone)
readXlsxFile('Klone.xlsx').then(async (rows) => {

    //***********************************************/
    // Copying account                              */
    //***********************************************/
    for(const row of rows) {
        const clone = row[0]
        const passwordOfClone = row[1]
        const accountToCopy = row[2]

        const browser = await getBrowser();
        const page = await getPage(browser);
        await loginToTwitter(clone, passwordOfClone, page);

        copyAccount(accountToCopy, page).then(async () => {
            console.log(`Liked and followed everyone of ${accountToCopy} for clone ${clone}`)
            await browser.close();
        })
    }
})











