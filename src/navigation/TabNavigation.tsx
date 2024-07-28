import React from 'react';
import AnotherScreen from '../screens/AnotherScreen';
import {RootTabBarList} from '../types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {fetchPromotions, fetchTags} from '../services/api';
import {kesfetIcon, plusIcon, star} from '../assets';

function PlusScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Plus</Text>
    </View>
  );
}

const BottomTab = createBottomTabNavigator<RootTabBarList>();

const TabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Plus') {
            return (
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => navigation.navigate('Plus')}>
                <Image source={plusIcon} style={{width: 80, height: 80}} />
              </TouchableOpacity>
            );
          }
          const icons: Record<string, any> = {
            Home: kesfetIcon,
            Plus: plusIcon,
            AnotherScreen: star,
          };
          return (
            <Image source={icons[route.name]} style={{width: 24, height: 24}} />
          );
        },
        tabBarLabel: ({focused}) => {
          const labels: Record<string, string> = {
            Home: 'KEŞFET',
            AnotherScreen: 'DAHA CÜZDAN',
          };
          return (
            <Text style={{paddingTop:5,color: focused ? '#000' : '#888', fontSize: 12}}>
              {labels[route.name]}
            </Text>
          );
        },
        tabBarButton: (props: TouchableOpacityProps) => (
          <TouchableOpacity {...props} />
        ),
        tabBarStyle: styles.tabBar,
      })}>
      <BottomTab.Screen
        name="Home"
        options={{headerShown: false, tabBarLabel: 'KEŞFET'}}>
        {props => (
          <HomeScreen
            {...props}
            fetchPromotions={fetchPromotions}
            fetchTags={fetchTags}
          />
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Plus"
        component={PlusScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="AnotherScreen"
        component={AnotherScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'DAHA CÜZDAN',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 30,
    shadowOpacity: 0.1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 10,
    borderWidth: 2,
  },
  tabText: {
    fontSize: 16,
  },
});
