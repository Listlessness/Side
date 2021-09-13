import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    SimpleListScreenProps,
    SimpleListScreenState
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Simple List'> & SideStreamWrapperContextProps;

interface SimpleListScreenProps<T> extends LEPBaseProps{
    
}

interface SimpleListScreenState<T, R> {
    currPage: number,
    messageText: string | undefined,
    items: R[],
    refreshing: boolean,
    loadingMore: boolean,
    lastPage?: number,
    fetching: boolean,
    ScreenName: string
}