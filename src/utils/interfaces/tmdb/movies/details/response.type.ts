import { TMDB_Date } from "../..";

export type {
    TMDB_Movie_Details_Response
}

interface TMDB_Movie_Details_Response {
    adult?: boolean,
    backdrop_path?: string | null,
    belongs_to_collection?: null | Object,
    budget?: number
    genres?: TMDB_Movie_Details_Genre[],
    homepage?: string | null,
    id?: number,
    imdb_id?: string | null,
    original_language?: string,
    original_title?: string,
    overview?: string | null,
    popularity?: number,
    poster_path?: string | null,
    production_countries?: TMDB_Movie_Details_Production_Company[],
    release_date?: TMDB_Date,
    revenue?: number,
    runtime?: number | null,
    spoken_languages?: TMDB_Movie_Spoken_Languages[],
    status?: string | 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled',
    tagline?: string | null,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number
}

interface TMDB_Movie_Details_Genre {
    id?: number,
    name?: string
}

interface TMDB_Movie_Details_Production_Company {
    name?: string,
    id?: number,
    logo_path?: string | null,
    origin_country?: string
}

interface TMDB_Movie_Spoken_Languages {
    iso_639_1?: string,
    name?: string
}