export type {
    TMDB_Movie_Recommendations_Response
}

interface TMDB_Movie_Recommendations_Response {
    page?: number,
    results?: TMDB_Movie_Recommendation_Item,
    total_pages?: number,
    total_results?: number
}

interface TMDB_Movie_Recommendation_Item {
    poster_path?: string | null,
    adult?: boolean,
    overview?: string,
    release_date?: string,
    genre_ids?: number[],
    id?: number,
    original_title?: string,
    original_language?: string,
    title?: string,
    backdrop_path?: string | null,
    popularity?: number,
    vote_count?: number
    video?: boolean
    vote_average?: number
}