import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    GenresProps,
    GenresState
}

type TAPBaseProps = NativeStackScreenProps<RootStackParamList, 'Genres'> & SideStreamWrapperContextProps;

interface GenresProps<T> extends TAPBaseProps{
    
}

interface GenresState<T> {
    currIndex: number,
    currPage: number,
    currGenreValue: number,
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean
}
