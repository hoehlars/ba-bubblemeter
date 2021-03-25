import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import SearchResult, { ISearchResult } from '../models/SearchResult';

export class SearchResultController {
    public static async saveSearchResultToDB(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info('POST Request on /api/searchResults');

        if (!req.body.tweetID) {
            next(new Error('Missing tweetID!'));
        }

        if (!req.body.fullText) {
            next(new Error('Missing full text!'));
        }

        if (!req.body.twittererID) {
            next(new Error('Missing twittererID!'));
        }

        if (!req.body.retweetCount) {
            next(new Error('Missing retweet count!'));
        }

        if (!req.body.favoriteCount) {
            next(new Error('Missing favorite count!'));
        }

        if (!req.body.replyCount) {
            next(new Error('Missing reply count!'));
        }

        const { tweetID, fullText, twittererID, retweetCount, favoriteCount, replyCount } = req.body;

        const newSearchResult: ISearchResult = new SearchResult({
            tweetID,
            fullText,
            twittererID,
            retweetCount,
            favoriteCount,
            replyCount,
        });

        newSearchResult.save((err) => {
            if(err) {
                next(new Error('Error while inserting into DB!'))
            }
            logger.info('Inserted new search result successfully!');
        })

        res.json(newSearchResult);
    }

    public static async getAllSearchResults(req: Request, res: Response): Promise<void> {
        logger.info('GET Request on /api/searchResults');
        res.json(await SearchResult.find({}));
    }

    public static async getAllSearchResultsByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info('GET Request on /api/searchResults/:twitterer');

        if (!req.params.twittererID) {
            res.status(400);
            next(new Error('TwittererID missing!'));
        }
        res.json(await SearchResult.find({ twittererID: req.params.twittererID }));
    }
}
