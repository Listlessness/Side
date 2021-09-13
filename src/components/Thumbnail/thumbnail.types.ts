export type {
    ThumbnailProps,
    EpisodeThumbnailProps
}

interface ThumbnailProps {
    mal_id: number;
    title: string;
    description?:  string;
    url:  string;
    picture_url: string,
    score?: number | null,
    type?: string,
    isBasic?: boolean
}

interface EpisodeThumbnailProps {
    id: string | number;
    title: string;
    episode:  string;
    url:  string;
    picture_url: string
}