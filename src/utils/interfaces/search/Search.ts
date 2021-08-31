export interface Filters {
    end_date?: string;
    genre_exclude?: 0 | 1;
    genre?: number;
    limit?: number;
    rated?: Rated;
    score?: number;
    start_date?: string;
    status?: Status;
}
type Rated = 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';

export interface SearchResult {
     request_hash: string;
     request_cached: boolean;
     request_cache_expiry: number;
     results: SearchResultItem[];
     last_page: number;
}
export type SearchTypes = 'anime' | 'character' | 'doujin' | 'manga' | 'manhua' | 'manhwa' | 'movie' | 'music' | 'novel' | 'ona' | 'oneshot' | 'ova' | 'person' | 'special' | 'tv';
type Status = 'airing' | 'completed' | 'complete' | 'tba' | 'upcoming';
export interface SearchResultItem {
     airing: boolean;
     end_date: Date | null;
     episodes: number;
     image_url: string;
     mal_id: number;
     members: number;
     rated: Rated;
     score: number;
     start_date: Date;
     synopsis: string;
     title: string;
     type: Type;
     url: string;
}
enum Type {
    Movie = "Movie",
    Ona = "ONA",
    Ova = "OVA",
    Special = "Special",
    Tv = "TV"
}
export {};
