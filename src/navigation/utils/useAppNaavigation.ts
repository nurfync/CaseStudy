
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
