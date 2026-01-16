export interface User {
  id: string;
  businessName: string;
  ownerName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  languageCode: string;
  photoUrl?: string;
  businessCategory?: string;
  address?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  whatsappNumber?: string;
  address?: string;
  photoUrl?: string;
  businessType?: string;
  notes?: string;
  balance: number;
  lastTransactionDate?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName?: string;
  amount: number;
  type: 'sale' | 'payment';
  paymentMethod?: 'cash' | 'check' | 'digital' | 'other';
  description?: string;
  photoUrl?: string;
  status: 'paid' | 'due' | 'partial';
  createdAt: string;
}

export interface Reminder {
  id: string;
  customerId: string;
  templateId?: number;
  messageText: string;
  sentAt?: string;
  scheduledFor?: string;
  createdAt: string;
}

export interface ReminderTemplate {
  id: number;
  title: string;
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface CustomersState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
}

export interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  filter: 'all' | 'paid' | 'due' | 'week' | 'month';
}

export interface RemindersState {
  reminders: Reminder[];
  templates: ReminderTemplate[];
}

export interface SettingsState {
  languageCode: string;
  isDarkTheme: boolean;
  isBiometricEnabled: boolean;
  lastBackupDate?: string;
}

export interface UIState {
  isBottomSheetVisible: boolean;
  bottomSheetType?: 'quickActions' | 'templates' | 'customMessage';
  selectedCustomerIds: string[];
}

export type RootStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  Login: undefined;
  OTPVerification: { phoneNumber: string };
  Registration: { phoneNumber: string };
  MainTabs: undefined;
  CustomerDetail: { customerId: string };
  AddCustomer: { customerId?: string };
  AddTransaction: { customerId?: string };
  TransactionsList: undefined;
  Reports: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Customers: undefined;
  Dues: undefined;
  Reports: undefined;
  More: undefined;
};
