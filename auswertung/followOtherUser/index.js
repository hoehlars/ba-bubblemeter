
import likeTweetFromOtherUser from './likeTweetsFromOtherUser'
import followAccsFromOtherUser from './followAccsFromOtherUser'

const { Cluster } = require('puppeteer-cluster');

const timeout= 15000

const accountNamesToFollow = ['GabiSchmid81', 'HohenerLars']

const tweetsToLike = {andreas_glarner: '1368613470078447628',
                      SVPch: '1368951935555014660'}

async function createClusterForClone(username, password) {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions: {
            args: ["--no-sandbox"]
        }
    });

    accountNamesToFollow.forEach(accountName => {
        cluster.queue(async ({ page }) => {
            await followAccsFromOtherUser(username, password, accountName, page)
            page.waitForTimeout(timeout)
        });
    })

    for(const [twitterer, tweetID] of Object.entries(tweetsToLike)) {
        cluster.queue(async ({ page }) => {
            await likeTweetFromOtherUser(username, password, twitterer, tweetID, page)
            page.waitForTimeout(timeout)
        });
    }
    
    await cluster.idle();
    await cluster.close();
}


const user = {GabiSchmid4: '7k0*A1xvK!af8JJh^&sW'}

for(const [username, password] of Object.entries(user)) {
    createClusterForClone(username, password).then(res => {
        console.log(`Liked and followed everyone for user ${username}`)
    })
}




