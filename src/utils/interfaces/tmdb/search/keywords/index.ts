export type {
    TMDB_Search_Keywords_Request,
    TMDB_Search_Keywords_Response
}

interface TMDB_Search_Keywords_Request {
    params: {
        query: string,
        page?: number
    }
}

interface TMDB_Search_Keywords_Response {
    page?: number,
    results?: TMDB_Search_Keyword[],
    total_pages?: number,
    total_results?: number,
}

interface TMDB_Search_Keyword {
    id?: number,
    name?: string
}