export type {
    TMDB_Genres_Request,
    TMDB_Genres_Response,
    TMDB_Genres
}

interface TMDB_Genres_Request {
    language?: string,
}

interface TMDB_Genres_Response {
    genres: TMDB_Genres[],
}

interface TMDB_Genres {
    id?: number,
    name?: string
}