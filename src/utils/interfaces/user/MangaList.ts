export type MangaListTypes = 'all' | 'completed' | 'dropped' | 'onhold' | 'plantoread' | 'ptr' | 'reading';
export interface MangaList {
     manga: Manga[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Manga {
     added_to_list: boolean;
     days: number | null;
     end_date: Date | null;
     image_url: string;
     is_rereading: boolean;
     magazines: any[];
     mal_id: number;
     priority: Priority;
     publishing_status: number;
     read_chapters: number;
     read_end_date: Date | null;
     read_start_date: Date | null;
     read_volumes: number;
     reading_status: number;
     retail: null;
     score: number;
     start_date: Date | null;
     tags: null | any;
     title: string;
     total_chapters: number;
     total_volumes: number;
     type: Type;
     url: string;
}
enum Priority {
    High = "High",
    Low = "Low",
    Medium = "Medium"
}
enum Type {
    Doujinshi = "Doujinshi",
    Manga = "Manga",
    Manhua = "Manhua",
    Manhwa = "Manhwa",
    OneShot = "One-shot"
}
export {};
