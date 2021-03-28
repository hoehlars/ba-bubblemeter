import SearchResult from '../models/SearchResult';
import MongoMemoryDatabaseProvider from './db';
import { SearchResultController } from './SearchResultController';

let mockReq: any;
let mockRes: any;
let mockNext: any;

const db = new MongoMemoryDatabaseProvider();

jest.setTimeout(15000);

describe('search result controller', () => {
    beforeEach(async () => {
        await db.connect();

        // set up mock request & res
        mockReq = {
            body: {
                tweetID: '1234',
                twittererID: '12345',
                fullText: 'Im a Tweet',
                searchTerm: 'Burkaverbot',
                user: 'TestUser',
            },
            params: {
                user: 'TestUser2',
                searchTerm: 'Burkaverbot',
            },
        };
        mockRes = {
            json: jest.fn(),
            status: jest.fn(),
        };
        mockNext = jest.fn();
    });

    afterEach(async () => {
        await db.disconnect();
    });

    it('insert search result', async () => {
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        expect(mockRes.json.mock.calls.length).toBe(1);
        expect(mockRes.json.mock.calls[0][0]).toHaveProperty('_id');
        const searchResult = await SearchResult.findById({ _id: mockRes.json.mock.calls[0][0]._id }).exec();
        expect(searchResult).toBeTruthy();
    });

    it('should find all search results', async () => {
        // insert 2 search results
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        mockReq.body.tweetID = '12345';
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        await SearchResultController.getAllSearchResults(mockReq, mockRes);
        expect(mockRes.json.mock.calls[2][0].length).toBe(2);
    });

    it('should find search results by user', async () => {
        // insert 2 search results
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        mockReq.body.user = 'TestUser2';
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        await SearchResultController.getAllSearchResultsByUser(mockReq, mockRes, mockNext);
        expect(mockRes.json.mock.calls[2][0].length).toBe(1);
        expect(mockRes.json.mock.calls[2][0][0].user).toBe('TestUser2');
    });

    it('should find search results by searchTerm', async () => {
        // insert 2 search results
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        mockReq.body.searchTerm = 'Covid-19-Gesetz';
        await SearchResultController.saveSearchResultToDB(mockReq, mockRes, mockNext);
        await SearchResultController.getAllSearchResultsBySearchterm(mockReq, mockRes, mockNext);
        expect(mockRes.json.mock.calls[2][0].length).toBe(1);
        expect(mockRes.json.mock.calls[2][0][0].searchTerm).toBe('Burkaverbot');
    });
});
