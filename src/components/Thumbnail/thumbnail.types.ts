export type {
    ThumbnailProps,
    EpisodeThumbnailProps
}

interface ThumbnailProps {
    id?: number | string;
    title: string;
    description?:  string;
    url:  string;
    picture_url: string,
    score: number,
    type: string
}

interface EpisodeThumbnailProps {
    id?: number | string;
    title: string;
    episode?:  string;
    url:  string;
    picture_url: string
}