export type {
    TMDB_TV_Seasons_Details_Request
}

interface TMDB_TV_Seasons_Details_Request {
    path: {
        tv_id: number,
        season_number: number,
    }
    params: {
        language?: string,
        append_to_response?: TMDB_TV_Seasons_Details_Sub_Request[]
    }
} 

type TMDB_TV_Seasons_Details_Sub_Request = 'videos' | 'images' | 'external_ids';