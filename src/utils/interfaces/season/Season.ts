export type Seasons = 'summer' | 'spring' | 'fall' | 'winter';
export interface SeasonResult {
     anime: SeasonAnime[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     season_name: string;
     season_year: number;
}
export interface SeasonAnime {
     airing_start: Date | null;
     continuing: boolean;
     episodes: number | null;
     genres: Genre[];
     image_url: string;
     kids: boolean;
     licensors: string[];
     mal_id: number;
     members: number;
     producers: Genre[];
     r18: boolean;
     score: number | null;
     source: Source;
     synopsis: string;
     title: string;
     type: AnimeType;
     url: string;
}
interface Genre {
     mal_id: number;
     name: string;
     type: GenreType;
     url: string;
}
enum GenreType {
    Anime = "anime"
}
enum Source {
    CardGame = "Card game",
    DigitalManga = "Digital manga",
    Empty = "-",
    Game = "Game",
    LightNovel = "Light novel",
    Manga = "Manga",
    Novel = "Novel",
    Original = "Original",
    Other = "Other",
    PictureBook = "Picture book",
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
