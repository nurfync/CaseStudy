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
    <View style={styles.screenContainer}>
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
          const icons: Record<string, any> = {
            Home: kesfetIcon,
            AnotherScreen: star,
          };

          if (route.name === 'Plus') {
            return (
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => navigation.navigate('Plus')}>
                <Image source={plusIcon} style={styles.plusIcon} />
              </TouchableOpacity>
            );
          }

          return (
            <View style={styles.iconContainer}>
              <Image source={icons[route.name]} style={styles.icon} />
            </View>
          );
        },
        tabBarLabel: ({focused}) => {
          const labels: Record<string, string> = {
            Home: 'KEŞFET',
            AnotherScreen: 'DAHA CÜZDAN',
          };

          return (
            <Text style={[styles.tabLabel, {color: focused ? '#000' : '#888'}]}>
              {labels[route.name]}
            </Text>
          );
        },
        tabBarButton: (props: TouchableOpacityProps) => (
          <TouchableOpacity {...props} />
        ),
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,

      })}>
      <BottomTab.Screen
        name="Home"
        options={{headerShown: false}}>
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
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 30,
    shadowOpacity: 0.1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    height:60
  },
  plusButton: {
    position:'absolute'
  },
  plusIcon: {
    marginBottom:30,
    width: 80,
    height: 80,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    paddingTop: 15,
    fontSize: 10,
  },
});
