export type {
    ThumbnailProps
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