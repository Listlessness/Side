export interface Characters {
     characters: Character[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Character {
     image_url: string;
     mal_id: number;
     name: string;
     role: Role;
     url: string;
}
export enum Role {
    Main = "Main",
    Supporting = "Supporting"
}
export {};
