import { useState } from 'react';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { FlatList,Text,TouchableOpacity,StyleSheet,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import { Task } from '../constants/types';
import { TasksStackParamList } from '../navegation//TasksStack';
import { COLORS, MARGIN, SIZE } from '../constants/theme';

// Tipamos la navegación para tener autocompletado en navigate()
type HomeNavProp = NativeStackNavigationProp<TasksStackParamList, 'TaskList'>;

//setstaks por si luego queremos hacer modificaciones en la lista.
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const [ tasks ] = useState<Task[]>([
    {
      id: '1',
      title: 'Estudiar React Native',
      description: 'Repasar FlatList y componentes.',
      category: 'Estudio',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Crear TaskFlow',
      description: 'Continuar con el proyecto de tareas.',
      category: 'Trabajo',
      createdAt: new Date(),
    },
  ]);

  // Ahora navegamos al detalle pasando los datos por params.
  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetail', {
      id: task.id,
      title: task.title,
      description: task.description,
      category: task.category,
      createdAt: task.createdAt.toISOString(), // Date → string ISO (serializable)
    });
  };

  // Botón flotante para ir al formulario de nueva tarea
  const handleAddPress = () => {
    navigation.navigate('TaskForm');
  };

  return (
    <SafeAreaView  style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>
      {tasks.length === 0 ? (
        <EmptyState />
      ) : ( 
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleTaskPress(item)}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {/* Botón flotante "+" para nueva tarea */}
      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
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

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: MARGIN.marginS,
    alignSelf: 'center',
  },

  card: {
    padding: MARGIN.marginS,
    marginBottom: MARGIN.marginS,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 8,
  },

  taskTitle: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    marginBottom: 5,
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