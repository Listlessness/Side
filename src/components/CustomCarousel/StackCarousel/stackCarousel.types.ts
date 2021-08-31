export type {
    StackCarouselProps,
    StackCarouselState
}

interface StackCarouselProps<T> {
    title: string,
    fetchItems: () => Promise<T[]>,
    onPress: () => void,
    renderItem: (arg: RenderItemArg<T>) => JSX.Element
}

type RenderItemArg<T> = { item: T; index: number; }

interface StackCarouselState<T> {
    activeSlide: number,
    messageText: string | undefined,
    items: T[]
}