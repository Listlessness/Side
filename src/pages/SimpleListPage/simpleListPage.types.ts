import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList } from "../../utils";

export type {
    SimpleListPageProps,
    SimpleListPageState
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Simple List'>;

interface SimpleListPageProps<T> extends LEPBaseProps{
    
}

interface SimpleListPageState<T, R> {
    currPage: number,
    messageText: string | undefined,
    items: R[],
    refreshing: boolean,
    loadingMore: boolean,
    lastPage?: number,
    fetching: boolean,
    pageName: string
}