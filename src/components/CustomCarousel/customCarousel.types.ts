export type {
    CustomCarouselProps,
    CustomCarouselState
}

interface CustomCarouselProps<T> {
    title: string,
    keyPrefix: string,
    fetchItems: () => Promise<T[]>,
    onPress: () => void,
    type: 'stack' | 'thumbnail',
    renderItem: (arg: RenderItemArg<T>) => JSX.Element,
    refreshing: boolean,
    onRefreshComplete: () => void
}

type RenderItemArg<T> = { item: T; index: number; }

interface CustomCarouselState<T> {
    messageText: string | undefined,
    items: T[]
}