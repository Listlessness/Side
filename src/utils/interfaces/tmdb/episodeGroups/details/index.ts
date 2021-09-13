export type {
    TMDB_Episode_Group_Details_Request,
    TMDB_Episode_Group_Details_Response,
}

interface TMDB_Episode_Group_Details_Request {
    path: {
        id: number
    }
    params: {
        language?: string
    }
}

interface TMDB_Episode_Group_Details_Response {
    description?: string,
    episode_count?: number,
    group_count?: number,
    groups?: TMDB_Episode_Group_Details_Item[],
    id?: string,
    name?: string,
    network?: TMDB_Episode_Group_Details_Response_Network,
    type?: number,
}


interface TMDB_Episode_Group_Details_Item {
    id?: string,
    name?: string,
    order?: number,
    episodes?: TMDB_Episode_Group_Details_Item_Episode[],
    locked?: boolean
}


interface TMDB_Episode_Group_Details_Item_Episode{
    air_date?: string,
    episode_number?: number,
    id?: number,
    name?: string
    overview?: string,
    production_code?: string | null,
    season_number?: number,
    show_id?: number,
    still_path?: string | null,
    vote_average?: number,
    vote_count?: number
    order?: number
}


interface TMDB_Episode_Group_Details_Response_Network {
    id?: number,
    logo_path?: string | null,
    name?: string
    origin_country?: string
}