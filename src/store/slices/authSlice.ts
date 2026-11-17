// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Solo guardamos datos simples (serializables) del usuario, no el objeto completo de Firebase
export type AuthUser = {
  uid: string;
  email: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  isLoading: boolean; // true mientras Firebase revisa si ya habia una sesion guardada
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Se despacha desde el listener cuando hay usuario logueado
    setSession: (state, action: PayloadAction<{ user: AuthUser }>) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    // Se despacha desde el listener cuando no hay usuario (o se cerro sesion)
    clearSession: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setSession, clearSession  } = authSlice.actions;
export default authSlice.reducer;
