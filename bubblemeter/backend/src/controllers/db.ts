import { MongoMemoryServer } from 'mongodb-memory-server';
import Mongoose from 'mongoose';
import { logger } from '../logger';

class MongoMemoryDatabaseProvider {
    private mongoMemoryServer: MongoMemoryServer | undefined;

    /**
     * Connects to a in-memory mongo database
     *
     * @returns {Promise<string>} Resolves with the db URI once successfully connected
     */
    public async connect(): Promise<string> {
        this.mongoMemoryServer = new MongoMemoryServer();

        const connectionString = await this.mongoMemoryServer.getUri();

        try {
            await Mongoose.connect(connectionString, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (err) {
            logger.error(`Mongoose connection error: ${err}`);
            throw new Error("Couldn't connect to MongoDB");
        }

        return connectionString;
    }

    /**
     * Disconnects from the database
     *
     * @returns {Promise<void>} Resolves once successfully disconnected
     */
    public async disconnect(): Promise<void> {
        await Mongoose.disconnect();
        await this.mongoMemoryServer!.stop();
    }
}

export default MongoMemoryDatabaseProvider;
