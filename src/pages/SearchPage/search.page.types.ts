import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList } from "../../utils";

export type {
    SearchPageProps,
    SearchPageState
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

interface SearchPageProps<T> extends LEPBaseProps{
    
}

interface SearchPageState<T> {
    queryText: string,
    tempText: string,
    filters: Filters,
    currPage: number,
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean,
    lastPage?: number,
    fetching: boolean,
    justFiltered: boolean
}