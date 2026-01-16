import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { useAppSelector } from '../store';
import { useTranslation } from 'react-i18next';
import { validatePhoneNumber } from '../utils/format';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;
  const { t } = useTranslation();

  const handleSendOTP = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError(t('auth.invalidPhone'));
      return;
    }

    setError('');
    const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
    navigation.navigate('OTPVerification', { phoneNumber: formattedPhone });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('auth.loginTitle')}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {t('auth.loginSubtitle')}
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t('auth.phoneNumber')}
            </Text>
            <View style={styles.phoneInputContainer}>
              <Text style={[styles.countryCode, { color: colors.text }]}>+91</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
                ]}
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text.replace(/[^0-9]/g, ''));
                  setError('');
                }}
                placeholder="9876543210"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.primary },
                !phoneNumber && styles.buttonDisabled,
              ]}
              onPress={handleSendOTP}
              disabled={!phoneNumber}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
                {t('auth.sendOtp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SIZES.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SIZES.xxl,
  },
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: FONTS.sizes.md,
    marginBottom: SIZES.sm,
    fontWeight: '600',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  countryCode: {
    fontSize: FONTS.sizes.lg,
    marginRight: SIZES.sm,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: SIZES.inputHeight,
    borderRadius: SIZES.sm,
    paddingHorizontal: SIZES.md,
    fontSize: FONTS.sizes.lg,
    borderWidth: 1,
  },
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.light.error,
    fontSize: FONTS.sizes.sm,
    marginTop: SIZES.xs,
  },
});

export default LoginScreen;
