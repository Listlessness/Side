export  type Periods = 'today' | 'weekly' | 'monthly';
export  type Types = 'anime' | 'character' | 'manga' | 'person' | 'season' | 'schedule' | 'search' | 'top';
export interface Status {
     cached_requests: number;
     connected_clients: string;
     requests_this_month: number;
     requests_this_week: number;
     requests_today: number;
     total_connections_received: string;
}
