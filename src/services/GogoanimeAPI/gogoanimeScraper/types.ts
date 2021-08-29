export type GogoUrlParamsType = {
    [key: string]: string | number | undefined;
  };
  
  export type GogoPagination<T = unknown> = {
    page: number;
    paginations: Array<number>;
    data: Array<T>;
  };
  
  export type GogoEntityBasic = {
    id: string;
    title: string;
    link: string;
  };
  
  export type GogoEntity = GogoEntityBasic & {
    thumbnail: string;
  };
  
  export type IEpisodePage = {
    start: number;
    end: number;
  };
  
  export type IAnimeBasic = GogoEntity & {
    genres: Array<GogoEntityBasic>;
    released?: string;
    status?: string;
    summary?: string;
  };
  
  export type IAnime = IAnimeBasic & {
    movieId: string;
    type?: string;
    otherNames?: Array<string>;
    episodeCount: number;
    episodePages: Array<IEpisodePage>;
  };
  
  export type IAnimeEpisodeInfo = {
    id: string;
    link: string;
    anime: GogoEntityBasic;
    movieId: string;
    videoId: string;
    episode: number;
    episodeCount: number;
    episodePages: Array<IEpisodePage>;
  };
  
  export type GogoRecentRelease = GogoEntity & {
    episode: string;
  };
  
  export type IPopularOngoingUpdate = GogoEntity & {
    genres: Array<GogoEntityBasic>;
  };
  
  export type IVideoSource = {
    file: string;
    label: string;
    type: string;
  };
  
  export type IVideoRes = {
    source: Array<IVideoSource>;
    source_bk: Array<IVideoSource>;
    track: {
      tracks: Array<{ file: string; kind: string }>;
    };
  };