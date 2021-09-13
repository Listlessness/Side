import { TMDB_TV_Content_Ratings_Response } from "../contentRatings";
import { TMDB_TV_EpisodeGroups_Response } from "../episodeGroups";
import { TMDB_TV_External_Ids_Response } from "../external_ids";
import { TMDB_TV_Recommendations_Response } from "../recommendations";
import { TMDB_TV_Similar_Response } from "../similarTVShows";
import { TMDB_TV_Videos_Response } from "../videos";

export type {
    TMDB_TV_Details_Response
}

interface TMDB_TV_Details_Response {
    backdrop_path?: string | null,
    created_by: TMDB_TV_Details_Created_By[],
    episode_run_time?: number[],
    first_air_date?: string,
    genres?: TMDB_TV_Details_Genres[],
    homepage?: string,
    id?: number,
    in_production?: boolean,
    languages?: string[],
    last_air_date?: string,
    last_episode_to_air: TMDB_TV_Details_Last_Episode_To_Air,
    name?: string,
    next_episode_to_air?: string | null,
    networks?: TMDB_TV_Details_Network[],
    number_of_episodes?: number,
    number_of_seasons?: number,
    origin_country?: string[],
    original_language?: string,
    original_name?: string,
    overview?: string,
    popularity?: number,
    poster_path?: string | null,
    production_companies?: TMDB_TV_Details_Production_Company[],
    production_countries?: TMDB_TV_Details_Production_Country[],
    seasons?: TMDB_TV_Details_Season[],
    spoken_languages?: TMDB_TV_Details_Spoken_Languages[],
    status?: string,
    tagline?: string,
    type?: string,
    vote_average: number,
    vote_count?: number,

    videos?: TMDB_TV_Videos_Response,
    similar?: TMDB_TV_Similar_Response,
    recommendations?: TMDB_TV_Recommendations_Response,
    external_ids?: TMDB_TV_External_Ids_Response,
    episode_groups?: TMDB_TV_EpisodeGroups_Response,
    content_ratings?: TMDB_TV_Content_Ratings_Response
}

interface TMDB_TV_Details_Created_By {
    id?: number,
    credit_id?: string,
    name?: string,
    gender?: string,
    profile_path?: string | null
}

interface TMDB_TV_Details_Genres {
    id?: number,
    name?: string
}

interface TMDB_TV_Details_Last_Episode_To_Air {
    air_date?: string,
    episode_number?: number,
    id?: number,
    name?: string
    overview?: string
    production_code?: string,
    season_number?: number,
    still_path?: string | null,
    vote_average?: number,
    vote_count?: number
}

interface TMDB_TV_Details_Network {
    name?: string,
    id?: number,
    logo_path?: string | null,
    origin_country?: string
}

interface TMDB_TV_Details_Production_Company {
    name?: string,
    id?: number,
    logo_path?: string | null,
    origin_country?: string
}

interface TMDB_TV_Details_Production_Country {
    iso_3166_1?: string,
    name?: string
}

interface TMDB_TV_Details_Season {
    air_date?: string,
    episode_count?: number,
    id?: number,
    name?: string,
    overview?: string,
    poster_path?: string,
    season_number?: number
}

interface TMDB_TV_Details_Spoken_Languages {
    english_name?: string,
    iso_639_1?: string,
    name?: string
}