export type {
    TMDB_Collection_Images_Request,
    TMDB_Collection_Images_Response,
    TMDB_Collection_Images_Response_Part
}

interface TMDB_Collection_Images_Request {
    collection_id: number,
    language?: string
}

interface TMDB_Collection_Images_Response {
    id?: number,
    backdrops?: TMDB_Collection_Images_Response_Part[],
    posters?: TMDB_Collection_Images_Response_Part[],
}

interface TMDB_Collection_Images_Response_Part {
    aspect_ratio?: number,
    file_path?: number,
    height?: number,
    iso_639_1?: string,
    vote_average?: number
    vote_count?: number
    width?: number
}