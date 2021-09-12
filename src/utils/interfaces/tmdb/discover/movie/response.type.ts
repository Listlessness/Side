export type {
    TMDB_Movie_Discover_Response,
    TMDB_Movie_Discover_Results
}

interface TMDB_Movie_Discover_Response {
    page?: number,
    results?: TMDB_Movie_Discover_Results[],
    total_results?: number,
    total_pages?: number
}

interface TMDB_Movie_Discover_Results {
    poster_path?: string | null,
    adult?: boolean,
    overview?: string,
    release_date?: string,
    genre_ids?: number[],
    id?: number,
    original_title?: string
    original_language?: string,
    title?: string,
    backdrop_path?: string | null,
    vote_average?: number,
    popularity?: number,
    video?: string[],
    vote_count?: number,
}