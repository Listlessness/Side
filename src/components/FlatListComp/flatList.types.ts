
export type {
    FlatListProps
}

interface FlatListProps<T> {
    messageText?: string,
    listRef: any,
    shouldShow: boolean,
    items: T[],
    numColumns?: number,
    renderItem: (arg: RenderItemArgs<T>) => JSX.Element,
    onEndReached?: (info: {distanceFromEnd: number}) => void,
    keyExtractor?: (item: T, index: number) => any,
    getItemLayout?: ((data: T[] | null | undefined, index: number) => { length: number; offset: number; index: number; }) | undefined,
    onScroll?: () => void,
    onRefresh?: () => void,
    refreshing?: boolean
}

type RenderItemArgs<T> = { item: T; index: number; }