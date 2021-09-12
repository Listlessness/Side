export type {
    TMDB_TV_External_Ids_Request,
    TMDB_TV_External_Ids_Response
}

interface TMDB_TV_External_Ids_Request {
    tv_id: number,
    language?: string,
}

interface TMDB_TV_External_Ids_Response {
    imdb_id?: string | null,
    freebase_mid?: string | null,
    freebase_id?: string | null,
    tvdb_id?: string | null,
    tvrage_id?: string | null,
    facebook_id?: string | null,
    instagram_id?: string | null,
    twitter_id?: string | null,
    id: number
} 