import { SubTypes } from "../../../utils";

export type {
    ThumbnailCarouselProps
}

interface ThumbnailCarouselProps<T> {
    fetchItems: (...args: any[]) => Promise<T[]>,
    title: string,
    onPress: () => void,
    renderItem: ({item, index}: { item: T; index: number; }) => JSX.Element,
    messageText?: string
}