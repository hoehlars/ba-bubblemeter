import cors from 'cors';
import Express from 'express';
import HTTP from 'http';
import mongoose from 'mongoose';

import { logger } from './logger';
import { registerRoutes } from './routes';

const dburi: string = process.env.MONGODB_URI!;

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
    logger.error('Failed to setup connection with DB');
});

db.once('open', () => {
    logger.info('Connected successfully to DB!');
});

const port = process.env.PORT || 5000;

const express = Express();
const server = new HTTP.Server(express);

express.use(
    Express.urlencoded({
        extended: true,
    }),
);

express.use(Express.json());

express.use(cors());

registerRoutes(express);

server.listen(port, () => {
    logger.info(`Listening on ${port}`);
});
