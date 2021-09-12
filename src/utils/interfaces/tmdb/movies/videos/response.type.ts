export type {
    TMDB_Movie_Videos_Response
}

interface TMDB_Movie_Videos_Response {
    id?: number,
    results: TMDB_Movie_Video_Item[]
}

interface TMDB_Movie_Video_Item {
    iso_639_1?: string,
    iso_3166_1?: string,
    name?: string,
    key?: string,
    site?: string,
    size?: number,
    type?: string,
    official?: boolean,
    published_at?: string,
    id?: string,
}