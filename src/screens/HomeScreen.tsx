import { useEffect } from 'react';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { FlatList,Text,TouchableOpacity,View,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import { TasksStackParamList } from '../navigation/TasksStack';
import { useStyles } from '../constants/styles';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchTasks, setFilter } from '../store/slices/tasksSlice';
import { TaskFilter } from '../constants/types';

// Tipamos la navegación para tener autocompletado en navigate()
type HomeNavProp = NativeStackNavigationProp <TasksStackParamList, 'TaskList'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  // useAppSelector lee/selecciona datos - cuando state cambia, trae el objeto tasks de state y asigna sus valores a las variables nombradas
  const { tasks, filter, error, loading } = useAppSelector((state) => state.tasks);

  // Carga inicial: al montar la pantalla pedimos a Firestore las tareas del usuario
  useEffect(
    () => { dispatch(fetchTasks()) }, [dispatch]
  );

  // Esto se recalcula solo cuando cambian tasks o filter (useSelector ya re-renderiza).
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true; // 'all'
  });

  // Ahora navegamos al detalle pasando el id
  const handleTaskPress = (id: string) => {
    // Solo pasamos el id: el detalle busca los datos en el store
    navigation.navigate('TaskDetail', { id });
  };

  // Botón para ir al formulario de nueva tarea
  const handleAddPress = () => {
    navigation.navigate('TaskForm');
  };

  return (
    <SafeAreaView  style={styles.container}>

      {/*  UI de filtros: 3 botones que disparan setFilter */}
      <View style={styles.filters}>
        {(['all', 'pending', 'completed'] as TaskFilter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            // Despacho/envio accion al store
            onPress={() => dispatch(setFilter(f))}
          >
            <Text style={filter === f ? styles.filterTextActive : styles.buttonText}>
              {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? 
        <ActivityIndicator style={styles.loadingIndicator} size="large" ></ActivityIndicator> : (
        <>
        {/* Si fallo la carga desde Firestore (ej. sin internet) avisamos en pantalla */}
        {error && <Text style={styles.error}>{error}</Text>}
        
        {filteredTasks.length === 0 ? (
          <EmptyState />
          ) : ( 
          <FlatList
            // Array con la informacion
            data={filteredTasks}
            // Identificador
            keyExtractor={(item) => item.id}
            // Lo que se muestra en cada iteracion
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleTaskPress(item.id)}>
              <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>{item.completed ? '✅ ' : ''}{item.title}</Text>
              <Text style={styles.taskCategory}>{item.category}</Text>
            </TouchableOpacity>
            )}
          />
        )}
        </>
      )}

      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}