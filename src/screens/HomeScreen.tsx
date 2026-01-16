import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../types';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { useAppSelector, useAppDispatch } from '../store';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency, getGreeting, formatRelativeDate } from '../utils/format';
import { getAllCustomers, getAllTransactions } from '../services/database';
import { setCustomers } from '../store/slices/customersSlice';
import { setTransactions } from '../store/slices/transactionsSlice';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { customers } = useAppSelector((state) => state.customers);
  const { transactions } = useAppSelector((state) => state.transactions);
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;
  const { t } = useTranslation();

  const loadData = async () => {
    if (!user) return;
    try {
      const customersData = await getAllCustomers(user.id);
      const transactionsData = await getAllTransactions();
      dispatch(setCustomers(customersData));
      dispatch(setTransactions(transactionsData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const todaySales = transactions
    .filter((t) => {
      const today = new Date().toDateString();
      const transactionDate = new Date(t.createdAt).toDateString();
      return transactionDate === today && t.status === 'paid';
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingDues = customers.reduce((sum, c) => sum + c.balance, 0);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={[styles.greeting, { color: colors.text }]}>
          {t('home.greeting', { greeting: getGreeting(), name: user?.ownerName || '' })}
        </Text>

        <View style={styles.cardsContainer}>
          <View style={[styles.card, { backgroundColor: colors.blue }]}>
            <Ionicons name="cash-outline" size={32} color="#FFF" />
            <Text style={styles.cardValue}>{formatCurrency(todaySales)}</Text>
            <Text style={styles.cardLabel}>{t('home.todaySales')}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.red }]}>
            <Ionicons name="wallet-outline" size={32} color="#FFF" />
            <Text style={styles.cardValue}>{formatCurrency(pendingDues)}</Text>
            <Text style={styles.cardLabel}>{t('home.pendingDues')}</Text>
          </View>
        </View>

        <View style={[styles.cardFull, { backgroundColor: colors.green }]}>
          <Ionicons name="people-outline" size={32} color="#FFF" />
          <Text style={styles.cardValue}>{customers.length}</Text>
          <Text style={styles.cardLabel}>{t('home.totalCustomers')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('home.recentTransactions')}
          </Text>

          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <View
                key={transaction.id}
                style={[
                  styles.transactionCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View style={styles.transactionLeft}>
                  <Text style={[styles.transactionName, { color: colors.text }]}>
                    {transaction.customerName}
                  </Text>
                  <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                    {formatRelativeDate(transaction.createdAt)}
                  </Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.status === 'paid'
                            ? colors.green
                            : transaction.status === 'due'
                            ? colors.red
                            : colors.orange,
                      },
                    ]}
                  >
                    {formatCurrency(transaction.amount)}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          transaction.status === 'paid'
                            ? colors.green
                            : transaction.status === 'due'
                            ? colors.red
                            : colors.orange,
                      },
                    ]}
                  >
                    <Text style={styles.statusText}>{transaction.status.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={64} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                {t('home.noTransactions')}
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                {t('home.startAddingTransactions')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('AddTransaction', {})}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={colors.onPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SIZES.md,
  },
  greeting: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    marginBottom: SIZES.lg,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
  },
  card: {
    flex: 1,
    padding: SIZES.md,
    borderRadius: SIZES.md,
    marginRight: SIZES.sm,
    alignItems: 'center',
  },
  cardFull: {
    padding: SIZES.md,
    borderRadius: SIZES.md,
    marginBottom: SIZES.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardValue: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: SIZES.sm,
  },
  cardLabel: {
    fontSize: FONTS.sizes.sm,
    color: '#FFF',
    marginTop: SIZES.xs,
  },
  section: {
    marginTop: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    marginBottom: SIZES.md,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.md,
    borderRadius: SIZES.sm,
    marginBottom: SIZES.sm,
    borderWidth: 1,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: FONTS.sizes.sm,
    marginTop: SIZES.xs,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.sm,
    marginTop: SIZES.xs,
  },
  statusText: {
    color: '#FFF',
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.xxl,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginTop: SIZES.md,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.sm,
    marginTop: SIZES.xs,
  },
  fab: {
    position: 'absolute',
    right: SIZES.md,
    bottom: SIZES.md,
    width: SIZES.fabSize,
    height: SIZES.fabSize,
    borderRadius: SIZES.fabSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;
