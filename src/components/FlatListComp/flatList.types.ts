
export type {
    FlatListProps
}

interface FlatListProps<T> {
    messageText?: string,
    ref: any,
    shouldShow: boolean,
    items: T[],
    numColumns?: number,
    renderItem: ({ item, index }: { item: T; index: number; }) => JSX.Element,
    onEndReached?: (info: {distanceFromEnd: number}) => void,
    keyExtractor?: (item: T, index: number) => any,
    getItemLayout?: ((data: T[] | null | undefined, index: number) => { length: number; offset: number; index: number; }) | undefined,
    onScroll?: () => void,
    onRefresh?: () => void,
    refreshing?: boolean
}