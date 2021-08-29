export type {
    ListItemsState
}

interface ListItemsState<T> {
    messageText: string | undefined,
    items: T[]
}