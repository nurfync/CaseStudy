import React from 'react';
import {Text, View} from 'react-native';
import {useAppNavigation} from '../navigation/utils/useAppNaavigation';

const AnotherScreen = (props: any) => {
  const navigation = useAppNavigation();
  return (
    <View>
      <Text>Another Screen</Text>
    </View>
  );
};

export default AnotherScreen;
