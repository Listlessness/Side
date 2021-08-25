export interface Stats {
     completed: number;
     dropped: number;
     on_hold: number;
     plan_to_watch: number;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     scores: {
        [key: string]: Score;
    };
     total: number;
     watching: number;
}
interface Score {
     percentage: number;
     votes: number;
}
export {};
