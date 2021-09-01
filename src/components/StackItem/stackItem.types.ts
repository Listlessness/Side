export type {
    StackItemProps
}

interface StackItemProps {
    id?: number | string;
    title: string;
    episode?:  string;
    url:  string;
    picture_url: string,
    watchEpisode: () => void
}