import { TMDB_TV_Seasons_Videos_Response } from "../videos";

export type {
    TMDB_TV_Seasons_Details_Response
}

interface TMDB_TV_Seasons_Details_Response {
    _id?: string,
    air_date?: string,
    episodes?: TMDB_TV_Seasons_Details_Episode[],
    name?: string,
    overview?: string,
    id?: number,
    poster_path?: string | null,
    season_number?: number,
    
    videos?: TMDB_TV_Seasons_Videos_Response
}


interface TMDB_TV_Seasons_Details_Episode {
    air_date?: string,
    episode_number?: number,
    crew?: TMDB_TV_Seasons_Details_Episode_Crew[],
    guest_stars?: TMDB_TV_Seasons_Details_Episode_Guest_Star[],
    id?: number,
    name?: string,
    overview?: string,
    production_code?: string,
    season_number?: number,
    still_path?: string,
    vote_average?: number,
    vote_count?: number
}

interface TMDB_TV_Seasons_Details_Episode_Crew {
    department?: string,
    job?: string,
    credit_id?: string,
    adult?: boolean | null,
    gender?: number,
    id?: number,
    known_for_department?: string,
    name?: string,
    original_name?: string,
    popularity?: number,
    profile_path?: string | null
}

interface TMDB_TV_Seasons_Details_Episode_Guest_Star {
    credit_id?: string,
    order?: number,
    character?: string,
    adult?: boolean,
    gender?: number | null,
    known_for_department?: string,
    name?: string,
    original_name?: string,
    popularity?: number,
    profile_path?: string | null
}