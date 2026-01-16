import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../types';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { BUSINESS_CATEGORIES } from '../constants';
import { useAppDispatch, useAppSelector } from '../store';
import { useTranslation } from 'react-i18next';
import { registerSuccess } from '../store/slices/authSlice';
import { generateId } from '../utils/format';
import { saveUser } from '../services/database';
import { seedSampleData } from '../services/seedData';

type RegistrationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Registration'>;
type RegistrationRouteProp = RouteProp<RootStackParamList, 'Registration'>;

interface Props {
  navigation: RegistrationNavigationProp;
  route: RegistrationRouteProp;
}

const RegistrationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [whatsappSame, setWhatsappSame] = useState(true);
  const [businessCategory, setBusinessCategory] = useState('Retail Shop');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();
  const { isDarkTheme, languageCode } = useAppSelector((state) => state.settings);
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;
  const { t } = useTranslation();

  const handleRegister = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!businessName.trim()) {
      newErrors.businessName = t('validation.required');
    }
    if (!ownerName.trim()) {
      newErrors.ownerName = t('validation.required');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = {
      id: generateId(),
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      phoneNumber,
      whatsappNumber: whatsappSame ? phoneNumber : undefined,
      languageCode,
      businessCategory,
      address: address.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveUser(user);
      await seedSampleData(user.id);
      dispatch(registerSuccess({ user, token: 'mock-token' }));
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('auth.registrationTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('auth.registrationSubtitle')}
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>
            {t('auth.businessName')} *
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              if (errors.businessName) {
                setErrors({ ...errors, businessName: '' });
              }
            }}
            placeholder="My Shop"
            placeholderTextColor={colors.textSecondary}
            autoFocus
            autoCapitalize="words"
          />
          {errors.businessName ? (
            <Text style={styles.errorText}>{errors.businessName}</Text>
          ) : null}

          <Text style={[styles.label, { color: colors.text }]}>
            {t('auth.ownerName')} *
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
            value={ownerName}
            onChangeText={(text) => {
              setOwnerName(text);
              if (errors.ownerName) {
                setErrors({ ...errors, ownerName: '' });
              }
            }}
            placeholder="John Doe"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="words"
          />
          {errors.ownerName ? <Text style={styles.errorText}>{errors.ownerName}</Text> : null}

          <View style={styles.switchContainer}>
            <Text style={[styles.label, { color: colors.text, flex: 1 }]}>
              {t('auth.whatsappSame')}
            </Text>
            <Switch
              value={whatsappSame}
              onValueChange={setWhatsappSame}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={whatsappSame ? colors.onPrimary : colors.textSecondary}
            />
          </View>

          <Text style={[styles.label, { color: colors.text }]}>
            {t('auth.businessCategory')}
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Picker
              selectedValue={businessCategory}
              onValueChange={setBusinessCategory}
              style={{ color: colors.text }}
            >
              {BUSINESS_CATEGORIES.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, { color: colors.text }]}>
            {t('auth.address')}
          </Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
            value={address}
            onChangeText={setAddress}
            placeholder="Shop address (optional)"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
              {t('auth.register')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SIZES.lg,
  },
  header: {
    marginBottom: SIZES.lg,
    marginTop: SIZES.xl,
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
    marginTop: SIZES.md,
    fontWeight: '600',
  },
  input: {
    height: SIZES.inputHeight,
    borderRadius: SIZES.sm,
    paddingHorizontal: SIZES.md,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    paddingTop: SIZES.md,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderRadius: SIZES.sm,
    borderWidth: 1,
    overflow: 'hidden',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.md,
  },
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.xl,
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

export default RegistrationScreen;
