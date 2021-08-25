export interface CharactersStaff {
     characters: Character[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     staff: Staff[];
}
interface Character {
     image_url: string;
     mal_id: number;
     name: string;
     role: Role;
     url: string;
     voice_actors: Staff[];
}
enum Role {
    Main = "Main",
    Supporting = "Supporting"
}
interface Staff {
     image_url: string;
     language?: Language;
     mal_id: number;
     name: string;
     url: string;
     positions?: string[];
}
enum Language {
    English = "English",
    French = "French",
    German = "German",
    Hungarian = "Hungarian",
    Italian = "Italian",
    Japanese = "Japanese",
    Korean = "Korean",
    Spanish = "Spanish"
}
export {};
