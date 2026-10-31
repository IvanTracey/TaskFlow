export type Task = {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    completed: boolean;
}


export type TaskFilter = 'all' | 'completed' | 'pending';