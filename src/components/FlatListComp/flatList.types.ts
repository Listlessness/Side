
export type {
    FlatListProps,
    FlatListState
}

interface FlatListState<T> {
    fabVisibility: boolean
}

interface FlatListProps<T> {
    messageText?: string,
    shouldShow: boolean,
    items: T[],
    numColumns?: number,
    renderItem: (arg: RenderItemArgs<T>) => JSX.Element,
    onEndReached?: (info: {distanceFromEnd: number}) => void,
    keyExtractor?: (item: T, index: number) => any,
    getItemLayout?: ((data: T[] | null | undefined, index: number) => { length: number; offset: number; index: number; }) | undefined,
    onRefresh?: () => void,
    refreshing?: boolean,
    loadingMore?: boolean
}

type RenderItemArgs<T> = { item: T; index: number; }