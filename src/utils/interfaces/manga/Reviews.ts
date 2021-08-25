export interface Reviews {
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     reviews: Review[];
}
interface Review {
     content: string;
     date: Date;
     helpful_count: number;
     mal_id: number;
     reviewer: Reviewer;
     url: string;
}
interface Reviewer {
     chapters_read: number;
     image_url: string;
     scores: Scores;
     url: string;
     username: string;
}
interface Scores {
     art: number;
     character: number;
     enjoyment: number;
     overall: number;
     story: number;
}
export {};
