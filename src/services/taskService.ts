import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Task } from '../constants/types';

export const saveTaskToFirebase = async (task: {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    completed: boolean;
    userId: string;
  }) => {
  try {
    // Referencia a la colección 'tasks'
    const tasksRef = collection(db, 'tasks');
    
    // Agregamos el documento
    const docRef = await addDoc(tasksRef, {
      ...task,
      createdAt: serverTimestamp(), // Mejor práctica: usar tiempo del servidor
    });
    
    return docRef.id;
  } catch (error) {
      console.error("Error al guardar tarea:", error);
      throw error;
  }
};