import Pino from 'pino';

export const logger = Pino({
    prettyPrint: {
        ignore: 'pid,hostname',
        translateTime: 'yyyy-mm-dd HH:MM:ss.l',
    },

    // hide log messages during tests
    level: process.env.JEST_WORKER_ID !== undefined ? 'silent' : 'info',
});
