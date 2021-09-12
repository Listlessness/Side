export type {
    TMDB_TV_Content_Ratings_Request,
    TMDB_TV_Content_Ratings_Response
}

interface TMDB_TV_Content_Ratings_Request {
    tv_id: number,
    language?: string,
}



interface TMDB_TV_Content_Ratings_Response {
    results?: TMDB_TV_Content_Ratings_Item[],
    id: number
}

interface TMDB_TV_Content_Ratings_Item {
    iso_3166_1?: string,
    rating?: string
}