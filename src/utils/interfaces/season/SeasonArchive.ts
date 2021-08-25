export interface SeasonArchive {
     archive: Archive[];
     request_cache_expiry: number;
     request_cached: boolean;
     request_hash: string;
}
interface Archive {
     year: number;
     seasons: Season[];
}
enum Season {
    Fall = "Fall",
    Spring = "Spring",
    Summer = "Summer",
    Winter = "Winter"
}
export {};
