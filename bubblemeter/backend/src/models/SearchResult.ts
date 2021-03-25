import mongoose from 'mongoose';

export interface ISearchResult extends mongoose.Document {
    tweetID: string;
    fullText: string;
    twittererID: string;
    retweetCount: number;
    favoriteCount: number;
    replyCount: number;
}

export const SearchResultSchema = new mongoose.Schema({
    tweetID: { type: String, required: true },
    fullText: { type: String, required: true },
    twitterer: { type: String, required: true },
    retweetCount: { type: Number, required: true },
    favoriteCount: { type: Number, required: true },
    replyCount: { type: Number, required: true },
});

const SearchResult = mongoose.model<ISearchResult>('SearchResult', SearchResultSchema, 'SearchResultCollection');
export default SearchResult;
