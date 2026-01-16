import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { SPLASH_DURATION } from '../constants';
import { useAppSelector } from '../store';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('LanguageSelection');
      }
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation, isAuthenticated]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={[styles.title, { color: colors.onPrimary }]}>
          व्यापार बुक
        </Text>
        <Text style={[styles.subtitle, { color: colors.onPrimary }]}>
          VyapaarBook
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.sizes.large + 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.xl,
    marginTop: SIZES.sm,
    textAlign: 'center',
  },
});

export default SplashScreen;
