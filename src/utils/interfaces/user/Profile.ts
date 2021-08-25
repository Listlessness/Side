export interface Profile {
     about: string;
     anime_stats: AnimeStats;
     birthday: Date;
     favorites: Favorites;
     gender: string;
     image_url: string;
     joined: Date;
     last_online: Date;
     location: null;
     manga_stats: MangaStats;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     url: string;
     username: string;
}
interface AnimeStats {
     completed: number;
     days_watched: number;
     dropped: number;
     episodes_watched: number;
     mean_score: number;
     on_hold: number;
     plan_to_watch: number;
     rewatched: number;
     total_entries: number;
     watching: number;
}
interface Favorites {
     anime: Anime[];
     characters: Anime[];
     manga: any[];
     people: Anime[];
}
interface Anime {
     image_url: string;
     mal_id: number;
     name: string;
     url: string;
}
interface MangaStats {
     chapters_read: number;
     completed: number;
     days_read: number;
     dropped: number;
     mean_score: number;
     on_hold: number;
     plan_to_read: number;
     reading: number;
     reread: number;
     total_entries: number;
     volumes_read: number;
}
export {};
