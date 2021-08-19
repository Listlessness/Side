export type {
    TopResult,
    SubTypes,
    Types,
    TopItem
};

interface TopResult {
    readonly request_cache_expiry: number;
    readonly request_cached: boolean;
    readonly request_hash: string;
    readonly top: TopItem[];
}
interface TopItem {
    readonly end_date: null | string;
    readonly image_url: string;
    readonly mal_id: number;
    readonly members: number;
    readonly rank: number;
    readonly score: number;
    readonly start_date: null | string;
    readonly title: string;
    readonly type: Type;
    readonly url: string;
    readonly volumes: number | null;
}
declare enum Type {
    Doujinshi = "Doujinshi",
    Manga = "Manga",
    Novel = "Novel"
}
declare type SubTypes = 'airing' | 'bypopularity' | 'doujin' | 'favorite' | 'manga' | 'manhua' | 'manhwa' | 'movie' | 'novels' | 'oneshots' | 'ova' | 'special' | 'tv' | 'upcoming';
declare type Types = 'anime' | 'manga' | 'people' | 'characters';
