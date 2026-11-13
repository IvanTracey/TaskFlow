import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const saveTaskToFirebase = async (taskData) => {
  try {
    // Referencia a la colección 'tasks'
    const tasksRef = collection(db, 'tasks');
    
    // Agregamos el documento
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      createdAt: serverTimestamp(), // Mejor práctica: usar tiempo del servidor
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar tarea:", error);
    throw error;
  }
};