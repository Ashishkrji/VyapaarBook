import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../../types';

const initialState: UIState = {
  isBottomSheetVisible: false,
  bottomSheetType: undefined,
  selectedCustomerIds: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showBottomSheet: (
      state,
      action: PayloadAction<'quickActions' | 'templates' | 'customMessage'>
    ) => {
      state.isBottomSheetVisible = true;
      state.bottomSheetType = action.payload;
    },
    hideBottomSheet: (state) => {
      state.isBottomSheetVisible = false;
      state.bottomSheetType = undefined;
    },
    toggleCustomerSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedCustomerIds.indexOf(action.payload);
      if (index !== -1) {
        state.selectedCustomerIds.splice(index, 1);
      } else {
        state.selectedCustomerIds.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedCustomerIds = [];
    },
    setSelectedCustomerIds: (state, action: PayloadAction<string[]>) => {
      state.selectedCustomerIds = action.payload;
    },
  },
});

export const {
  showBottomSheet,
  hideBottomSheet,
  toggleCustomerSelection,
  clearSelection,
  setSelectedCustomerIds,
} = uiSlice.actions;

export default uiSlice.reducer;
