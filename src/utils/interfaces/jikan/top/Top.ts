
export interface TopResult {
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     top: TopItem[];
}
export interface TopItem {
     end_date: null | string;
     image_url: string;
     mal_id: number;
     members: number;
     rank: number;
     score: number;
     start_date: null | string;
     title: string;
     type: Type;
     url: string;
     volumes: number | null;
}
enum Type {
    Doujinshi = "Doujinshi",
    Manga = "Manga",
    Novel = "Novel"
}
export type SubTypes = 'airing' | 'bypopularity' | 'doujin' | 'favorite' | 'manga' | 'manhua' | 'manhwa' | 'movie' | 'novels' | 'oneshots' | 'ova' | 'special' | 'tv' | 'upcoming';
export type Types = 'anime' | 'manga' | 'people' | 'characters';
