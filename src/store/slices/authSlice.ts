// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Solo guardamos datos simples (serializables) del usuario, no el objeto completo de Firebase
export type AuthUser = {
  uid: string;
  email: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean; // true mientras Firebase revisa si ya habia una sesion guardada
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
};

// Este slice solo guarda la sesion. El login y el registro se hacen en sus pantallas,
// y el listener onAuthStateChanged (en AppNavigator) despacha estas acciones.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Se despacha desde el listener cuando hay usuario logueado
    setSession: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    // Se despacha desde el listener cuando no hay usuario (o se cerro sesion)
    clearSession: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
