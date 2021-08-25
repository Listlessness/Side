export type {
    StackItemProps
}

interface StackItemProps {
    id?: number | string;
    title: string;
    description?:  string;
    url:  string;
    picture_url: string
}