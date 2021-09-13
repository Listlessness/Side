import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    GenresProps,
    GenresState,
    GSBaseProps
}

type GSBaseProps = NativeStackScreenProps<RootStackParamList, 'Genres'>;

type GenresProps = GSBaseProps & SideStreamWrapperContextProps;

interface GenresState<T> {
    currIndex: number,
    currPage: number,
    currGenreValue: number,
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean
}
