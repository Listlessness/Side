export type {
    TMDB_Keyword_Details_Request,
    TMDB_Keyword_Details_Response
}

interface TMDB_Keyword_Details_Request {
    path: {
        keyword_id: number,
    }   
}

interface TMDB_Keyword_Details_Response {
    id?: number,
    name?: string
}