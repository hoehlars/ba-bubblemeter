import { Request, Response } from 'express';
import { logger } from '../logger';

export class HomeController {
    public static index(req: Request, res: Response): void {
        res.json({ message: 'Backend of Bubblemeter is ready for action!' });
        logger.info('GET Request on /');
    }
}
