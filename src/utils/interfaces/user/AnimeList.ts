
export type AnimeListTypes = 'all' | 'completed' | 'dropped' | 'onhold' | 'plantowatch' | 'ptw' | 'watching';
export interface AnimeList {
     anime: Anime[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
export interface Anime {
     added_to_list: boolean;
     airing_status: number;
     days: number | null;
     end_date: Date | null;
     has_episode_video: boolean;
     has_promo_video: boolean;
     has_video: boolean;
     image_url: string;
     is_rewatching: boolean;
     licensors: Licensor[];
     mal_id: number;
     priority: Priority;
     rating: Rating;
     score: number;
     season_name: SeasonName;
     season_year: number;
     start_date: Date;
     storage: null;
     studios: Licensor[];
     tags: any | null;
     title: string;
     total_episodes: number;
     type: Type;
     url: string;
     video_url: string;
     watch_end_date: Date | null;
     watch_start_date: Date | null;
     watched_episodes: number;
     watching_status: number;
}
export interface Licensor {
     mal_id: number;
     name: string;
}
enum Priority {
    High = "High",
    Low = "Low",
    Medium = "Medium"
}
enum Rating {
    G = "G",
    PG13 = "PG-13",
    R = "R",
    RatingR = "R+"
}
enum SeasonName {
    Fall = "Fall",
    Spring = "Spring",
    Summer = "Summer",
    Winter = "Winter"
}
enum Type {
    Movie = "Movie",
    Ona = "ONA",
    Ova = "OVA",
    Special = "Special",
    Tv = "TV"
}
