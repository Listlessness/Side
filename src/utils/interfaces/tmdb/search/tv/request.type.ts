export type {
    TMDB_Search_TV_Request
}

interface TMDB_Search_TV_Request {
    params: {
        language?: string,
        query: string,
        page?: number,
        include_adult?: boolean,
        first_air_date_year?: number
    }
} 