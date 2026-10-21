import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { TasksStackParamList } from '../navegation/TasksStack';
import TaskDetail from '../components/TaskDetail';
import { Task } from '../constants/types';

// Tipamos la ruta para que route.params tenga autocompletado
type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();

  // Recuperamos los params que enviamos desde HomeScreen
  const { id, title, description, category, createdAt } = route.params;

  // Reconstruimos el objeto Task. createdAt viene como string ISO
  // y lo convertimos a Date para que TaskDetail pueda usar toLocaleDateString().
  const task: Task = {
    id,
    title,
    description,
    category,
    createdAt: new Date(createdAt),
  };
  // Al seleccionar la flecha, vuelve a la pagina anterior
  return <TaskDetail task={task} onBack={() => navigation.goBack()} />;
}