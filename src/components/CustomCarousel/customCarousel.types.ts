import { SideStreamWrapperContextProps } from "../../utils"

export type {
    CustomCarouselProps,
    CustomCarouselState,
    CustomCarouselBaseProps
}

interface CustomCarouselBaseProps<T> {
    title: string,
    keyPrefix: string,
    fetchItems: () => Promise<T[]>,
    onPress?: () => void,
    renderItem: (arg: RenderItemArg<T>) => JSX.Element,
    refreshing: boolean,
    onRefreshComplete: () => void,
    horizontal?: boolean,
    checkOnFocus?: boolean
}

type CustomCarouselProps<T> = CustomCarouselBaseProps<T> & SideStreamWrapperContextProps;

type RenderItemArg<T> = { item: T; index: number; }

interface CustomCarouselState<T> {
    messageText: string | undefined,
    items: T[]
}