import SearchResult from '../models/searchResult';

export class SearchResultService {
    static async saveSearchResult(
        tweetID: string,
        fullText: string,
        twittererID: string,
        retweetCount: number,
        favoriteCount: number,
        replyCount: number,
    ): Promise<Response> {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/searchResult`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tweetID,
                fullText,
                twittererID,
                retweetCount,
                favoriteCount,
                replyCount,
            }),
        });
        return res;
    }

    static async getAllSearchResults(): Promise<SearchResult[]> {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/searchResult`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    }

    static async getAllSearchResultsByUser(twittererID: string): Promise<SearchResult[]> {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/searchResults/${twittererID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    }
}
