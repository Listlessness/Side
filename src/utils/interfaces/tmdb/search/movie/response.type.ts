export type {
    TMDB_Search_Movie_Response
}

interface TMDB_Search_Movie_Response {
    page?: number,
    results?: TMDB_Search_Movie_Item[],
    total_results?: number,
    total_pages?: number
}

interface TMDB_Search_Movie_Item {
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
    vote_count?: number,
    video?: boolean,
    vote_average?: number
}