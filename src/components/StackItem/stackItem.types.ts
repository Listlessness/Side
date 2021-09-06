import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils';

export type {
    StackItemProps
}

interface StackItemProps {
    id: string;
    title: string;
    episode:  string;
    url:  string;
    picture_url: string
}