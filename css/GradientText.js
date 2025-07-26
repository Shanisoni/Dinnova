import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientText({ children, style }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;
  const gradientWidth = screenWidth * 2; // ensure it's wider than text

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 5000, // ⏱ Adjust speed here
      useNativeDriver: true,
    }).start(); // only runs once
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-gradientWidth, 0], // moves from off-screen left to center
  });

  return (
    <MaskedView
      maskElement={
        <View style={styles.center}>
          <Text style={[styles.maskText, style]}>{children}</Text>
        </View>
      }
    >
      <Animated.View style={{ transform: [{ translateX }] }}>
        <LinearGradient
          colors={['#0ff0fc', '#39ff14', '#0ff0fc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { width: gradientWidth }]}
        />
      </Animated.View>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskText: {
    color: 'black', // required for masking
    // Removed fontSize and fontWeight so they can be passed in from props
  },
  gradient: {
    height: 100,
  },
});
