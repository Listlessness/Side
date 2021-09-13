import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    SimpleListScreenProps,
    SimpleListScreenState,
    SLSBaseProps
}

type SLSBaseProps = NativeStackScreenProps<RootStackParamList, 'Simple List'>;

type SimpleListScreenProps = SLSBaseProps & SideStreamWrapperContextProps;

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