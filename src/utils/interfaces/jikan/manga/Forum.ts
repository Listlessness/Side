export interface Forum {
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     topics: Topic[];
}
interface Topic {
     author_name: string;
     author_url: string;
     date_posted: Date;
     last_post: LastPost;
     replies: number;
     title: string;
     topic_id: number;
     url: string;
}
interface LastPost {
     author_name: string;
     author_url: string;
     date_posted: Date;
     url: string;
}
export {};
