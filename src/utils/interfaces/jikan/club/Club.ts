export interface Info {
     anime_relations: Relation[];
     category: string;
     character_relations: Relation[];
     created: Date;
     image_url: string;
     mal_id: number;
     manga_relations: Relation[];
     members_count: number;
     pictures_count: number;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     staff: Relation[];
     title: string;
     type: string;
     url: string;
}
export interface Members {
     members: Member[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Member {
     image_url: string;
     url: string;
     username: string;
}
interface Relation {
     mal_id: number;
     name: string;
     type: Type;
     url: string;
}
enum Type {
    Anime = "anime",
    Character = "character",
    Manga = "manga",
    Profile = "profile"
}
export {};
