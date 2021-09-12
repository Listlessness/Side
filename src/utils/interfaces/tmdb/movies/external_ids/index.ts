export type {
    TMDB_Movie_External_Ids_Request,
    TMDB_Movie_External_Ids_Response
}

interface TMDB_Movie_External_Ids_Request {
    movie_id: number
}

interface TMDB_Movie_External_Ids_Response {
    imdb_id?: string | null,
    facebook_id?: string | null,
    instagram_id?: string | null,
    twitter_id?: string | null,
    id: number
} 