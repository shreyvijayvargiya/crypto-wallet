import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonLoadingComponent = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startSkeletonAnimation = () => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ).start();
    };
    startSkeletonAnimation();
  }, [animation]);

  const interpolateWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const skeletonStyle = {
    width: interpolateWidth,
  };

  const styles = StyleSheet.create({
    container: {
      height: 20,
      marginVertical: 4,
      borderColor: '#171717',
      borderWidth: 1,
      borderRadius: 4,
      width: '98%',
      marginHorizontal: 4,
    },
    loadingIndicator: {
      flex: 1,
      height: 20,
      backgroundColor: '#171717',
      borderRadius: 4,
    },
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loadingIndicator, skeletonStyle]} />
    </View>
  );
};

export default SkeletonLoadingComponent;
