// src/store/slices/tasksSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Task, TaskFilter } from '../../constants/types';
import { AuthState, clearSession } from './authSlice';

// Tipo del estado que vive en el store global. Aca se guardan las tareas y el filtro elegido a partir de los botones en el HomeScreen.
type TasksState = {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  error: string | null;
};

// Estado inicial: las tareas ya no estan hardcodeadas, se cargan desde Firestore
const initialState: TasksState = {
  tasks: [],
  filter: 'all', // Por defecto, sin filtrar
  loading: false,
  error: null,
};

type ThunkConfig = { rejectValue: string };

// Coleccion "tasks": cada documento es una tarea y guarda el uid de su dueño en userId
const tasksRef = collection(db, 'tasks');

// Sin internet Firestore no devuelve error: deja la peticion esperando.
// Cortamos a los 10 segundos para poder avisarle al usuario.
const withTimeout = <T>(promise: Promise<T>): Promise<T> =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000)),
  ]);

// Lee el uid del usuario activo desde el store (los thunks necesitan saber de quien son las tareas)
const getUid = (getState: () => unknown): string => {
  const uid = (getState() as { auth: AuthState }).auth.user?.uid;
  if (!uid) throw new Error('No hay sesión iniciada');
  return uid;
};

// Carga inicial: trae de Firestore solo las tareas cuyo userId es el del usuario activo
export const fetchTasks = createAsyncThunk<Task[], void, ThunkConfig>(
  'tasks/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const snapshot = await withTimeout(
        getDocs(query(tasksRef, where('userId', '==', getUid(getState))))
      );
      return snapshot.docs
        .map((d) => ({ id: d.id, ...(d.data() as Omit<Task, 'id'>) }))
        // Mas nuevas primero (ordenamos aca para no necesitar un indice compuesto en Firestore)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } catch {
      return rejectWithValue('No pudimos cargar tus tareas. Revisa tu conexión.');
    }
  }
);

// Guarda la tarea en Firestore (addDoc) y recien ahi la agrega al store
export const addTask = createAsyncThunk<
  Task,
  { title: string; description: string; category: string },
  ThunkConfig
>('tasks/add', async (data, { getState, rejectWithValue }) => {
  try {
    const fields = {
      ...data,
      userId: getUid(getState),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    const ref = await withTimeout(addDoc(tasksRef, fields));
    return { id: ref.id, ...fields };
  } catch {
    return rejectWithValue('No pudimos guardar la tarea. Revisa tu conexión.');
  }
});

// Busca la tarea, da vuelta el booleano en Firestore y devuelve el nuevo valor
export const toggleTaskStatus = createAsyncThunk<
  { id: string; completed: boolean },
  string,
  ThunkConfig
>('tasks/toggle', async (id, { getState, rejectWithValue }) => {
  const task = (getState() as { tasks: TasksState }).tasks.tasks.find((t) => t.id === id);
  if (!task) return rejectWithValue('La tarea no existe.');
  try {
    await withTimeout(updateDoc(doc(db, 'tasks', id), { completed: !task.completed }));
    return { id, completed: !task.completed };
  } catch {
    return rejectWithValue('No pudimos actualizar la tarea. Revisa tu conexión.');
  }
});

export const deleteTask = createAsyncThunk<string, string, ThunkConfig>(
  'tasks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await withTimeout(deleteDoc(doc(db, 'tasks', id)));
      return id;
    } catch {
      return rejectWithValue('No pudimos borrar la tarea. Revisa tu conexión.');
    }
  }
);

// Creacion de Slice: nombre, valor inicial, reducers (acciones).
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    //  setFilter: actualiza el criterio global
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },
  },
  // Respuestas a las acciones asincronas (Firestore) y al cierre de sesion
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error inesperado.';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          task.completed = action.payload.completed;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      // Al cerrar sesion vaciamos las tareas para que el proximo usuario no vea las del anterior
      .addCase(clearSession, (state) => {
        state.tasks = [];
        state.filter = 'all';
        state.error = null;
      });
  },
});

// Exporto las acciones sincronas (los thunks se exportan arriba). Solo una puede exportarse por defecto
export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
