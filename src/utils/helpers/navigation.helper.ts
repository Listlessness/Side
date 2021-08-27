import { RootStackParamList } from '../';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export const UseNavigation = () => useNavigation<NativeStackNavigationProp<RootStackParamList>>();