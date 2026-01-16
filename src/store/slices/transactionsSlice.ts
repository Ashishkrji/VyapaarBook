import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionsState, Transaction } from '../../types';

const initialState: TransactionsState = {
  transactions: [],
  isLoading: false,
  filter: 'all',
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'paid' | 'due' | 'week' | 'month'>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setLoading,
  setTransactions,
  addTransaction,
  deleteTransaction,
  setFilter,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
