import BodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import HTTP from 'http';

import { logger } from './logger';
import { registerRoutes } from './routes';

const port = process.env.PORT || 5000;

const express = Express();
const server = new HTTP.Server(express);

express.use(BodyParser.json());
express.use(BodyParser.urlencoded({ extended: true }));
express.use(cors());

registerRoutes(express);

server.listen(port, () => {
    logger.info(`Listening on ${port}`);
});
