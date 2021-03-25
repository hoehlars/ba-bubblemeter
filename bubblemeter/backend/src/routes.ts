import { Express } from 'express';
import { HomeController } from './controllers/HomeController';
import { SearchResultController } from './controllers/SearchResultController';

/**
 * Register all routes
 */
export const registerRoutes = (api: Express): void => {
    // api routes
    api.get('/', HomeController.index);

    // search results
    api.get('/api/searchResults', SearchResultController.getAllSearchResults);
    api.post('api/searchResult', SearchResultController.saveSearchResultToDB);

    // additional functions
    api.get('/api/searchResults/:twitterer', SearchResultController.getAllSearchResultsByUser);

};
