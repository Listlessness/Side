export interface Stats {
     completed: number;
     dropped: number;
     on_hold: number;
     plan_to_read: number;
     reading: number;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     scores: {
        [key: string]: Score;
    };
     total: number;
}
interface Score {
     percentage: number;
     votes: number;
}
export {};
