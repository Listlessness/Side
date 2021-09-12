export type {
    TMDB_Movie_Similar_Request
}

interface TMDB_Movie_Similar_Request {
    movie_id: number,
    language?: string,
    page?: number
} 