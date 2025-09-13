// store/settingsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
    [key: string]: any;
}

const initialState: SettingsState = {
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
  selectedSettingSection: "",
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    updateSetting: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setTheme,
  setLanguage,
  toggleNotifications,
  updateSetting,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
