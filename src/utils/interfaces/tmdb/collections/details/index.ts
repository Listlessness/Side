export type {
    TMDB_Collection_Details_Request,
    TMDB_Collection_Details_Response,
    TMDB_Collection_Details_Response_Part
}

interface TMDB_Collection_Details_Request {
    collection_id: number,
    language?: string
}

interface TMDB_Collection_Details_Response {
    id?: number,
    name?: string,
    overview?: string,
    poster_path?: string | null,
    backdrop_path?: string,
    parts?: TMDB_Collection_Details_Response_Part[]
}

interface TMDB_Collection_Details_Response_Part {
    adult?: boolean,
    backdrop_path?: string | null,
    genre_ids?: number[],
    id?: number,
    original_language?: string,
    original_title?: string,
    overview?: string,
    release_date?: string,
    poster_path?: string,
    popularity?: number,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number
}