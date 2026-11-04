export type Task = {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    completed: boolean;
    userId: string; // uid del usuario dueño de la tarea (para filtrar en Firestore)
}


export type TaskFilter = 'all' | 'completed' | 'pending';