import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { LANGUAGES } from '../constants';
import { useAppDispatch, useAppSelector } from '../store';
import { setLanguage } from '../store/slices/settingsSlice';
import { saveLanguage } from '../i18n';
import { useTranslation } from 'react-i18next';

type LanguageSelectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LanguageSelection'
>;

interface Props {
  navigation: LanguageSelectionNavigationProp;
}

const LanguageSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;
  const { t } = useTranslation();

  const handleLanguageSelect = async (languageCode: string) => {
    await saveLanguage(languageCode);
    dispatch(setLanguage(languageCode));
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t('language.title')}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('language.subtitle')}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.languageList}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => handleLanguageSelect(language.code)}
            activeOpacity={0.7}
          >
            <Text style={[styles.languageText, { color: colors.text }]}>
              {language.nativeName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SIZES.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
  },
  languageList: {
    padding: SIZES.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageButton: {
    width: '48%',
    height: SIZES.languageButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.sm,
    marginBottom: SIZES.md,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  languageText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '600',
  },
});

export default LanguageSelectionScreen;
