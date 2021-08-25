export interface History {
     history: HistoryElement[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
export type Types = 'anime' | 'both' | 'manga';
interface HistoryElement {
     date: Date;
     increment: number;
     meta: Meta;
}
interface Meta {
     mal_id: number;
     name: string;
     type: string;
     url: string;
}
export {};
