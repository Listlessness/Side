import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    LandingScreenProps,
    LandingScreenState
}

type LandingScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'> & SideStreamWrapperContextProps;

interface LandingScreenState {
    refreshingCount: number
}