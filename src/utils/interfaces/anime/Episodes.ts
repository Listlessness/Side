export interface Episodes {
     episodes: Episode[];
     episodes_last_page: number;
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Episode {
     aired: Date;
     episode_id: number;
     filler: boolean;
     forum_url: string;
     recap: boolean;
     title: string;
     title_japanese: string;
     title_romanji: string;
     video_url: string;
}
export {};
