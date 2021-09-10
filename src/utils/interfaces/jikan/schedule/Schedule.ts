export type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | 'other' | 'unknown';
export interface ScheduleResult {
     request_hash: string;
     request_cached: boolean;
     request_cache_expiry: number;
     monday: Day[];
}
interface Day {
     airing_start: Date;
     episodes: number | null;
     genres: Genre[];
     image_url: string;
     kids: boolean;
     licensors: any[];
     mal_id: number;
     members: number;
     producers: Genre[];
     r18: boolean;
     score: number | null;
     source: string;
     synopsis: string;
     title: string;
     type: MondayType;
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
 enum MondayType {
    Tv = "TV"
}
export {};
