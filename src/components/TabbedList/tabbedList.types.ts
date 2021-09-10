export type {
    TabbedListProps,
    TabbedListState,
    TabListItem
}

interface TabbedListProps<T> {
    items: T[],
    messageText: string | undefined,
    renderItem: (arg: RenderListItemArgs<T>) => JSX.Element,
    onEndReached?: (info: {distanceFromEnd: number}) => void,
    keyExtractor?: (item: T, index: number) => any,
    getItemLayout?: ((data: T[] | null | undefined, index: number) => { length: number; offset: number; index: number; }) | undefined,
    onRefresh: () => void,
    refreshing: boolean,
    currIndex: number,
    onChange: (index: number) => void,
    tabsList: TabListItem[],
    loadingMore?: boolean
}

interface TabListItem {
    title: string,
    shouldShowCheck: (...args: any[]) => boolean,
    value?: any
}

type RenderListItemArgs<T> = { item: T; index: number; }

interface TabbedListState<T> {
    fabVisibility: boolean
}