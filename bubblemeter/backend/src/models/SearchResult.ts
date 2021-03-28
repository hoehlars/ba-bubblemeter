import mongoose from 'mongoose';

export interface ISearchResult extends mongoose.Document {
    tweetID: string;
    fullText: string;
    twittererID: string;
    searchTerm: string;
    user: string;
}

export const SearchResultSchema = new mongoose.Schema({
    tweetID: { type: String, required: true },
    fullText: { type: String, required: true },
    twittererID: { type: String, required: true },
    searchTerm: { type: String, required: true },
    user: { type: String, required: true },
});

const SearchResult = mongoose.model<ISearchResult>('SearchResult', SearchResultSchema, 'SearchResultCollection');
export default SearchResult;
