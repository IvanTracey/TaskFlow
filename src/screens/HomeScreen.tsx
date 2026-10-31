import { SafeAreaView  } from 'react-native-safe-area-context';
import { FlatList,Text,TouchableOpacity,StyleSheet,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import { TasksStackParamList } from '../navigation/TasksStack';
import { COLORS, MARGIN, SIZE } from '../constants/theme';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setFilter } from '../store/slices/tasksSlice';
import { TaskFilter } from '../constants/types';

// Tipamos la navegación para tener autocompletado en navigate()
type HomeNavProp = NativeStackNavigationProp <TasksStackParamList, 'TaskList'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  // Declaracion del dispatch
  const dispatch = useAppDispatch();

  // useAppSelector lee/selecciona datos - cuando state cambia, trae el objeto tasks de state y asigna sus valores internos al array tareas y a la variable filter
  const { tasks, filter } = useAppSelector((state) => state.tasks);
  
  // Esto se recalcula solo cuando cambian tasks o filter (useSelector ya re-renderiza).
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true; // 'all'
  });

  // Ahora navegamos al detalle pasando el id (tambien indicando el tipo, por ser TypeScript).
  const handleTaskPress = (id: string) => {
    // Solo pasamos el id: el detalle busca los datos en el store
    navigation.navigate('TaskDetail', { id });
  };

  // Botón flotante para ir al formulario de nueva tarea
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
            <Text style={filter === f ? styles.filterTextActive : styles.btnText}>
              {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
            <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleTaskPress(item.id)}
            >
              <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>{item.completed ? '✅ ' : ''}{item.title}</Text>
              <Text style={styles.taskCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {/* Botón flotante "+" para nueva tarea */}
      <TouchableOpacity 
      style={styles.fab} 
      onPress={handleAddPress}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.primary,
  },

  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: MARGIN.marginM,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: MARGIN.marginXS,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  filterActive: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTextActive: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
  btnText:{
    fontSize: SIZE.fontSmall,
  },
  card: {
    padding: MARGIN.marginS,
    marginBottom: MARGIN.marginS,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 8,
  },
  cardDone: {
    opacity: 0.6,
  },
  taskTitle: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  taskCategory: {
    color: COLORS.textLight,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: COLORS.primary,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: 'bold',
  },
});