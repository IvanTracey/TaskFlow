import { Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { TasksStackParamList } from '../navigation/TasksStack';
import TaskDetail from './TaskDetail';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTaskStatus, deleteTask } from '../store/slices/tasksSlice';


// Tipamos la ruta para que route.params tenga autocompletado
type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Recuperamos los params que enviamos desde HomeScreen
  const { id } = route.params;

// ...y buscamos la tarea en el store global.
  // Si la tarea cambia (toggle, delete), esta pantalla se re-renderiza sola.
  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

 // Si la tarea no existe (por ejemplo, la borraron y volvimos), mostramos nada
  if (!task) {
    return null;
  }

  //  Handler para toggle
  //  (unwrap() lanza error si Firestore falla, y se lo avisamos al usuario)
  const handleToggle = async () => {
    try {
      await dispatch(toggleTaskStatus(id)).unwrap();
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'No pudimos actualizar la tarea.');
    }
  };

  //  Handler para delete: borra y vuelve a la lista
  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'No pudimos borrar la tarea.');
    }
  };

  return (
    <TaskDetail
      task={task}
      onBack={() => navigation.goBack()}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  );
}