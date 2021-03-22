const fs = require('fs')

export default async function getSearchResults(query, userName, page) {
  // enter search query
  const searchField = 'input[data-testid*="SearchBox_Search_Input"]'
  await page.waitForSelector(searchField)
  await page.focus(searchField)
  await page.keyboard.type(query, { delay: 5 })
  await page.keyboard.press('Enter')

  // intercept json response
  await page.on('response', async (response) => {
    const request = response.request()
    if (
      request.url().includes('https://twitter.com/i/api/2/search/adaptive.json')
    ) {
      const text = await response.json()
      fs.writeFile(
        `./results/${query.replace(/\s/g, '-')}${userName}.json`,
        JSON.stringify(text),
        (err) => {
          if (err) throw err
          console.log(`got searchresults for "${query}"`)
        }
      )
    }
  })
}
