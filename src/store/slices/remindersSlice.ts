import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RemindersState, Reminder } from '../../types';
import { REMINDER_TEMPLATES } from '../../constants';

const initialState: RemindersState = {
  reminders: [],
  templates: REMINDER_TEMPLATES,
};

const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action: PayloadAction<Reminder>) => {
      state.reminders.unshift(action.payload);
    },
    setReminders: (state, action: PayloadAction<Reminder[]>) => {
      state.reminders = action.payload;
    },
  },
});

export const { addReminder, setReminders } = remindersSlice.actions;
export default remindersSlice.reducer;
