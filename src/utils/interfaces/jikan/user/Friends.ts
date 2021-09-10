export interface Friends {
     request_hash: string;
     request_cached: boolean;
     request_cache_expiry: number;
     friends: Friend[];
}
interface Friend {
     friends_since: Date | null;
     image_url: string;
     last_online: Date;
     url: string;
     username: string;
}
export {};
