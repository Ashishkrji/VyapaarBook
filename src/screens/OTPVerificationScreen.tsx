import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store';
import { useTranslation } from 'react-i18next';
import { loginSuccess } from '../store/slices/authSlice';
import { generateId } from '../utils/format';
import { OTP_RESEND_TIME } from '../constants';

type OTPNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
type OTPRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

interface Props {
  navigation: OTPNavigationProp;
  route: OTPRouteProp;
}

const OTPVerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(OTP_RESEND_TIME);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpValue: string = otp.join('')) => {
    if (otpValue.length !== 6) {
      setError(t('auth.invalidOtp'));
      return;
    }

    // Mock OTP verification - in real app, call API
    if (otpValue === '123456' || otpValue.length === 6) {
      // Check if user exists (mock)
      const userExists = Math.random() > 0.5;

      if (userExists) {
        // Mock user login
        const mockUser = {
          id: generateId(),
          businessName: 'My Shop',
          ownerName: 'Shop Owner',
          phoneNumber,
          languageCode: 'en',
          createdAt: new Date().toISOString(),
        };
        dispatch(loginSuccess({ user: mockUser, token: 'mock-token' }));
        navigation.replace('MainTabs');
      } else {
        navigation.navigate('Registration', { phoneNumber });
      }
    } else {
      setError('Invalid OTP');
    }
  };

  const handleResend = () => {
    setResendTimer(OTP_RESEND_TIME);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('auth.otpTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('auth.otpSubtitle')} {phoneNumber}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[
                styles.otpInput,
                { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
                digit && { borderColor: colors.primary },
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => handleVerify()}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
            {t('auth.verify')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResend}
          disabled={resendTimer > 0}
        >
          <Text
            style={[
              styles.resendText,
              { color: resendTimer > 0 ? colors.textSecondary : colors.primary },
            ]}
          >
            {resendTimer > 0
              ? t('auth.resendIn', { seconds: resendTimer })
              : t('auth.resendOtp')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SIZES.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SIZES.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.lg,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderRadius: SIZES.sm,
    borderWidth: 2,
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  buttonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: SIZES.lg,
    alignItems: 'center',
  },
  resendText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.light.error,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    marginTop: SIZES.sm,
  },
});

export default OTPVerificationScreen;
