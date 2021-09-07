export interface Recommendations {
     recommendations: Recommendation[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
export interface Recommendation {
     image_url: string;
     mal_id: number;
     recommendation_count: number;
     recommendation_url: string;
     title: string;
     url: string;
}
export {};
