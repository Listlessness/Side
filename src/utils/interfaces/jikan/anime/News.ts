export interface News {
     articles: Article[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Article {
     author_name: string;
     author_url: string;
     comments: number;
     date: Date;
     forum_url: string;
     image_url: string;
     intro: string;
     title: string;
     url: string;
}
export {};
