export type {
    TMDB_Movie_Details_Request
}

interface TMDB_Movie_Details_Request {
    path: {
        movie_id: number,
    }
    params: {
        language?: string,
        append_to_response?: TMDB_Movie_Details_Sub_Request[]
    }
} 

type TMDB_Movie_Details_Sub_Request = 'videos' | 'similar' | 'images' | 'recommendations' | 'external_ids';