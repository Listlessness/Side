export type {
    ThumbnailCarouselProps,
    ThumbnailCarouselState
}

interface ThumbnailCarouselProps<T> {
    fetchItems: (...args: any[]) => Promise<T[]>,
    title: string,
    onPress: () => void,
    renderItem: (arg: RenderItemArg<T>) => JSX.Element
}

type RenderItemArg<T> = { item: T; index: number; }

interface ThumbnailCarouselState<T> {
    currIndex: number,
    messageText: string | undefined,
    items: T[]
}