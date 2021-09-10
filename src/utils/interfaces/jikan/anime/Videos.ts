export interface Videos {
     episodes: Episode[];
     promo: Promo[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Episode {
     episode: string;
     image_url: string;
     title: string;
     url: string;
}
interface Promo {
     image_url: string;
     title: string;
     video_url: string;
}
export {};
