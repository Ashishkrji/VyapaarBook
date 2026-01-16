import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';

const initialState: SettingsState = {
  languageCode: 'en',
  isDarkTheme: false,
  isBiometricEnabled: false,
  lastBackupDate: undefined,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.languageCode = action.payload;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },
    toggleBiometric: (state) => {
      state.isBiometricEnabled = !state.isBiometricEnabled;
    },
    setBiometric: (state, action: PayloadAction<boolean>) => {
      state.isBiometricEnabled = action.payload;
    },
    setLastBackupDate: (state, action: PayloadAction<string>) => {
      state.lastBackupDate = action.payload;
    },
  },
});

export const {
  setLanguage,
  toggleTheme,
  setTheme,
  toggleBiometric,
  setBiometric,
  setLastBackupDate,
} = settingsSlice.actions;

export default settingsSlice.reducer;
