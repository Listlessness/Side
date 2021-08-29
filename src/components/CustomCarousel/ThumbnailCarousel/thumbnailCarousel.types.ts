import { SubTypes } from "../../../utils";

export type {
    ThumbnailCarouselProps
}

interface ThumbnailCarouselProps<T> {
    fetchItems: (...args: any[]) => Promise<T[]>,
    title: string,
    onPress: () => void,
    renderItem: (arg: RenderItemArg<T>) => JSX.Element
}

type RenderItemArg<T> = { item: T; index: number; }