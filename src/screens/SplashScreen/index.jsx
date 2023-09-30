import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenComponent = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      hideSplashScreen();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const hideSplashScreen = () => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    backgroundColor: '#09090b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SplashScreenComponent;
