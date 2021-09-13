import { TMDB_Date } from "../../utils";
import { TMDB_Movie_External_Ids_Response } from "../external_ids";
import { TMDB_Movie_Recommendations_Response } from "../recommendations";
import { TMDB_Movie_Similar_Response } from "../similarMovies";
import { TMDB_Movie_Videos_Response } from "../videos";

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

    videos?: TMDB_Movie_Videos_Response,
    similar?: TMDB_Movie_Similar_Response,
    recommendations?: TMDB_Movie_Recommendations_Response,
    external_ids?: TMDB_Movie_External_Ids_Response,
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