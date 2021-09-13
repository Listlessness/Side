import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    SearchScreenProps,
    SearchScreenState,
    SSBaseProps
}

type SSBaseProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

type SearchScreenProps = SSBaseProps & SideStreamWrapperContextProps;

interface SearchScreenState<T> {
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