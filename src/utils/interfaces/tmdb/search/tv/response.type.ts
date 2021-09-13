export type {
    TMDB_Search_TV_Response
}

interface TMDB_Search_TV_Response {
    page?: number,
    results?: TMDB_Search_TV_Item[],
    total_results?: number,
    total_pages?: number
}

interface TMDB_Search_TV_Item {
    poster_path?: string | null,
    popularity?: number,
    id?: number,
    backdrop_path?: string | null,
    vote_average?: number,
    overview?: string,
    first_air_date?: string,
    origin_country?: string[],
    genre_ids?: number[],
    original_language?: string,
    vote_count?: number,
    name?: string,
    original_name?: string,
}