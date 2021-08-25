export interface UserUpdates {
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
     users: User[];
}
interface User {
     chapters_read: number | null;
     chapters_total: number | null;
     date: Date;
     image_url: string;
     score: number | null;
     status: Status;
     url: string;
     username: string;
     volumes_read: number | null;
     volumes_total: number | null;
}
enum Status {
    Completed = "Completed",
    OnHold = "On-Hold",
    PlanToRead = "Plan to Read",
    Reading = "Reading"
}
export {};
