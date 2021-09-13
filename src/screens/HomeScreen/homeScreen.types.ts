import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    HomeScreenProps,
    HomeScreenState
}

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'> & SideStreamWrapperContextProps;

interface HomeScreenState {
    refreshingCount: number
}