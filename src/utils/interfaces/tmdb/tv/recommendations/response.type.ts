export type {
    TMDB_TV_Recommendations_Response
}

interface TMDB_TV_Recommendations_Response {
    page?: number,
    results?: TMDB_TV_Recommendation_Item,
    total_pages?: number,
    total_results?: number
}

interface TMDB_TV_Recommendation_Item {
    poster_path?: string | null,
    popularity?: number,
    id?: number,
    backdrop_path?: string | null,
    vote_average?: number
    overview?: string,
    first_air_date?: string,
    origin_country?: string[],
    genre_ids?: number[],
    original_name?: string,
    original_language?: string,
    name?: string,
    vote_count?: number
}