import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {logo, profile} from '../assets';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <View style={styles.logo}>
        <Image source={logo} style={styles.logoImg} />
      </View>
      <View style={styles.profil}>
        <Image source={profile} style={styles.profilImg} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 40,
  },

  logo: {
    width: 50,
    height: 40,
  },

  profil: {
    backgroundColor: '#F40000',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  logoImg: {
    height: 40,
    width: 81,
  },
  profilImg: {
    height: 17,
    width: 16,
  },
});
