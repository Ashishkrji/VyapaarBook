import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomersState, Customer } from '../../types';

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.isLoading = false;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.unshift(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
      if (state.selectedCustomer?.id === action.payload.id) {
        state.selectedCustomer = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((c) => c.id !== action.payload);
      if (state.selectedCustomer?.id === action.payload) {
        state.selectedCustomer = null;
      }
    },
    updateCustomerBalance: (state, action: PayloadAction<{ id: string; balance: number }>) => {
      const customer = state.customers.find((c) => c.id === action.payload.id);
      if (customer) {
        customer.balance = action.payload.balance;
      }
      if (state.selectedCustomer?.id === action.payload.id) {
        state.selectedCustomer.balance = action.payload.balance;
      }
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const {
  setLoading,
  setCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  updateCustomerBalance,
  setSelectedCustomer,
} = customersSlice.actions;

export default customersSlice.reducer;
