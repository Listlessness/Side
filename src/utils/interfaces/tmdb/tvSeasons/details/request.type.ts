export type {
    TMDB_TV_Seasons_Details_Request
}

interface TMDB_TV_Seasons_Details_Request {
    tv_id: number,
    season_number: number,
    language?: string,
    append_to_response?: TMDB_TV_Seasons_Details_Sub_Request[]
} 

type TMDB_TV_Seasons_Details_Sub_Request = 'videos' | 'images' | 'external_ids';