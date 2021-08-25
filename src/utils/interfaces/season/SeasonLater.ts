export interface SeasonLater {
     anime: Anime[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     season_name: string;
     season_year: null;
}
interface Anime {
     airing_start: null;
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
     score: null;
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
    Empty = "-",
    Game = "Game",
    LightNovel = "Light novel",
    Manga = "Manga",
    Music = "Music",
    Novel = "Novel",
    Original = "Original",
    Other = "Other",
    PictureBook = "Picture book",
    The4KomaManga = "4-koma manga",
    VisualNovel = "Visual novel",
    WebManga = "Web manga"
}
enum AnimeType {
    Empty = "-",
    Movie = "Movie",
    Ona = "ONA",
    Ova = "OVA",
    Special = "Special",
    Tv = "TV"
}
export {};
