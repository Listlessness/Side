export type {
    StackCarouselProps
}

interface StackCarouselProps<T> {
    title: string,
    fetchItems: () => Promise<T[]>,
    onPress: () => void,
    renderItem: ({item, index}: { item: T; index: number; }) => JSX.Element
}