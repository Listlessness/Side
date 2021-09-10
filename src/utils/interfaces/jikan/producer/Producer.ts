export interface Producer {
     anime: Anime[];
     meta: Meta;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Anime {
     airing_start: Date | null;
     episodes: number | null;
     genres: Meta[];
     image_url: string;
     kids: boolean;
     licensors: string[];
     mal_id: number;
     members: number;
     producers: Meta[];
     r18: boolean;
     score: number | null;
     source: Source;
     synopsis: string;
     title: string;
     type: AnimeType;
     url: string;
}
interface Meta {
     mal_id: number;
     name: string;
     type: MetaType;
     url: string;
}
enum MetaType {
    Anime = "anime"
}
enum Source {
    Empty = "-",
    Game = "Game",
    LightNovel = "Light novel",
    Manga = "Manga",
    Novel = "Novel",
    Original = "Original",
    The4KomaManga = "4-koma manga",
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
