import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    LandingPageProps,
    LandingPageState
}

type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'Home'> & SideStreamWrapperContextProps;

interface LandingPageState {
    refreshingCount: number
}