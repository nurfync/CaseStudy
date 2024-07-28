import React from 'react';
import PromotionDetail from '../screens/PromotionDetailScreen';
import {RootStackParamList} from '../types/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PromotionDetail"
          component={PromotionDetail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
