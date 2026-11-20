import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '../../constants/theme'

type ThemeState = {
    mode: ThemeMode;
}
const initialState: ThemeState = {
    mode: "light",
}

// Reglas/instrucciones de como se puede cambiar esa memoria
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    // El pedido se ejecuta al precionar un boton, el cual es llamado mediante "dispatch()"
    // El reducer recibe el valor actual, el pedido(action) y decide como actualizar los datos
    // Se ejecuta una actualizacion del valor en el store y avisa automaticamente a todos los componentes que esten leyendo ese dato
    reducers: {
        // Asigna el modo que le pasas con dispatch(setMode("dark"))
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
        // Alterna el actual, sin argumentos dispatch(toggleMode())
        toggleMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }, 
    }
})

// Exporto las Actions, para usar en botones
export const { setMode, toggleMode } = themeSlice.actions;
// Exporto los Reducers, para conectarlos al store
export default themeSlice.reducer;
