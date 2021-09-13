export type {
    TMDB_Search_Movie_Request
}

interface TMDB_Search_Movie_Request {
    params: {
        language?: string,
        query: string,
        page?: number,
        include_adult?: boolean,
        region?: string,
        year?: number,
        primary_release_year?: number
    }
} 