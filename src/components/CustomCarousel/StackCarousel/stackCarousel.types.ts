export type {
    StackCarouselProps
}

interface StackCarouselProps<T> {
    title: string,
    fetchItems: () => Promise<T[]>,
    onPress: () => void,
    renderItem: (arg: RenderItemArg<T>) => JSX.Element
}

type RenderItemArg<T> = { item: T; index: number; }