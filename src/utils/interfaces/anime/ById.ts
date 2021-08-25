export interface AnimeById {
     aired: Aired;
     airing: boolean;
     background: string;
     broadcast: string;
     duration: string;
     ending_themes: string[];
     episodes: number;
     favorites: number;
     genres: Genre[];
     image_url: string;
     licensors: Genre[];
     mal_id: number;
     members: number;
     opening_themes: string[];
     popularity: number;
     premiered: string;
     producers: Genre[];
     rank: number;
     rating: string;
     related: Related;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     score: number;
     scored_by: number;
     source: string;
     status: string;
     studios: Genre[];
     synopsis: string;
     title_english: string;
     title_japanese: string;
     title_synonyms: any[];
     title: string;
     trailer_url: string;
     type: string;
     url: string;
}
interface Aired {
     from: Date;
     prop: Prop;
     string: string;
     to: Date;
}
interface Prop {
     from: From;
     to: From;
}
interface From {
     day: number;
     month: number;
     year: number;
}
interface Genre {
     mal_id: number;
     name: string;
     type: Type;
     url: string;
}
enum Type {
    Anime = "anime",
    Manga = "manga"
}
interface Related {
     Adaptation: Genre[];
     'Side story': Genre[];
     Summary: Genre[];
}
export {};
