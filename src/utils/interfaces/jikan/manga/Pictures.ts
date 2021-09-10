export interface Pictures {
     pictures: Picture[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Picture {
     large: string;
     small: string;
}
export {};
