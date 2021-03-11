import { Express } from 'express';
import { HomeController } from './controllers/HomeController';

/**
 * Register all routes
 */
export const registerRoutes = (api: Express): void => {
    // api routes
    api.get('/', HomeController.index);
};
