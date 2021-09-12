export type {
    TMDB_TV_Details_Request
}

interface TMDB_TV_Details_Request {
    tv_id: number,
    language?: string,
    append_to_response?: TMDB_TV_Details_Sub_Request[]
} 

type TMDB_TV_Details_Sub_Request = 'videos' | 'similar' | 'images' | 'recommendations' | 'external_ids';