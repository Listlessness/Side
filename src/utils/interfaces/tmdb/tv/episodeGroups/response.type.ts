export type {
    TMDB_TV_EpisodeGroups_Response
}

interface TMDB_TV_EpisodeGroups_Response {
    id?: number,
    results?: TMDB_TV_EpisodeGroup_Item
}

interface TMDB_TV_EpisodeGroup_Item {
    description?: string,
    episode_count?: number,
    group_count?: number,
    id?: string,
    name?: string,
    network?: TMDB_TV_EpisodeGroup_Network[],
    type?: number
}

interface TMDB_TV_EpisodeGroup_Network {
    id?: number,
    logo_path?: string,
    name?: string,
    origin_country?: string
}