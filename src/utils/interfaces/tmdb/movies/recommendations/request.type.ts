export type {
    TMDB_Movie_Recommendations_Request
}

interface TMDB_Movie_Recommendations_Request {
    movie_id: number,
    language?: string,
    page?: number
} 