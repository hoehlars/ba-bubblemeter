import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import SearchResult from '../models/SearchResult';

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

        if (!req.body.searchTerm) {
            next(new Error('Missing Search term!'));
        }

        if (!req.body.user) {
            next(new Error('Missing user!'));
        }

        const { tweetID, fullText, twittererID, searchTerm, user } = req.body;

        const newSearchResult = new SearchResult({
            tweetID: tweetID,
            fullText: fullText,
            twittererID: twittererID,
            searchTerm: searchTerm,
            user: user
        });

        const searchResult = await newSearchResult.save();

    

        res.json(searchResult);
    }

    public static async getAllSearchResults(req: Request, res: Response): Promise<void> {
        logger.info('GET Request on /api/searchResults');
        res.json(await SearchResult.find({}))
        ;
    }

    public static async getAllSearchResultsByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info('GET Request on /api/searchResults/:user');

        if (!req.params.user) {
            res.status(400);
            next(new Error('User missing!'));
        }
        res.json(await SearchResult.find({ user: req.params.user }).exec());
    }

    public static async getAllSearchResultsBySearchterm(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info('GET Request on /api/searchResults/:searchTerm');

        if (!req.params.searchTerm) {
            res.status(400);
            next(new Error('Search term missing!'));
        }

        res.json(await SearchResult.find({ searchTerm: req.params.searchTerm }).exec());
    }
}
