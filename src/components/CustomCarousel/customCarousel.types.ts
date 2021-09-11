import { SideStreamWrapperContextProps } from "../../utils"

export type {
    CustomCarouselProps,
    CustomCarouselState
}

interface CustomCarouselProps<T> extends SideStreamWrapperContextProps{
    title: string,
    keyPrefix: string,
    fetchItems: () => Promise<T[]>,
    onPress?: () => void,
    type: 'stack' | 'thumbnail',
    renderItem: (arg: RenderItemArg<T>) => JSX.Element,
    refreshing: boolean,
    onRefreshComplete: () => void,
    horizontal?: boolean,
    checkOnFocus?: boolean
}

type RenderItemArg<T> = { item: T; index: number; }

interface CustomCarouselState<T> {
    messageText: string | undefined,
    items: T[]
}