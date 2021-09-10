export interface GenreAnime {
     anime: GenreAnimeItem[];
     item_count: number;
     mal_url: MalURL;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
export interface GenreManga {
     item_count: number;
     mal_url: MalURL;
     manga: MangaElement[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
export interface GenreAnimeItem {
     airing_start: Date | null;
     episodes: number | null;
     genres: MalURL[];
     image_url: string;
     kids: boolean;
     licensors: string[];
     mal_id: number;
     members: number;
     producers: MalURL[];
     r18: boolean;
     score: number | null;
     source: Source;
     synopsis: string;
     title: string;
     type: AnimeType;
     url: string;
}
interface MangaElement {
     authors: MalURL[];
     genres: MalURL[];
     image_url: string;
     mal_id: number;
     members: number;
     publishing_start: Date | null;
     score: number;
     serialization: string[];
     synopsis: string;
     title: string;
     type: MangaType;
     url: string;
     volumes: number | null;
}
enum MangaType {
    Doujinshi = "Doujinshi",
    Manga = "Manga",
    Manhwa = "Manhwa",
    Novel = "Novel"
}
interface MalURL {
     mal_id: number;
     name: string;
     type: MalURLType;
     url: string;
}
enum MalURLType {
    Anime = "anime"
}
enum Source {
    Empty = "-",
    Manga = "Manga",
    Novel = "Novel",
    The4KomaManga = "4-koma manga",
    VisualNovel = "Visual novel",
    WebManga = "Web manga"
}
enum AnimeType {
    Movie = "Movie",
    Ona = "ONA",
    Ova = "OVA",
    Special = "Special",
    Tv = "TV"
}
export {};
