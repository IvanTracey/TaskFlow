// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,   //  sesion del usuario
    tasks: tasksReducer, //  registramos el slice
  },
});

//  Tipos derivados del store para usar en hooks tipados
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;