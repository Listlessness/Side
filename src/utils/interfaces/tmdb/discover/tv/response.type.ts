export type {
    TMDB_TV_Discover_Response,
    TMDB_TV_Discover_Results
}

interface TMDB_TV_Discover_Response {
    page?: number,
    results?: TMDB_TV_Discover_Results[],
    total_results?: number,
    total_pages?: number
}

interface TMDB_TV_Discover_Results {
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
    original_name?: string
}