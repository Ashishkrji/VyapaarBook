import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { useAppSelector } from '../store';
import { useTranslation } from 'react-i18next';

const CustomersScreen: React.FC = () => {
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('customers.title')}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: SIZES.md },
  title: { fontSize: FONTS.sizes.title, fontWeight: 'bold' },
});

export default CustomersScreen;
