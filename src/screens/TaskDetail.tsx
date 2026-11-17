import { Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../constants/types';
import { styles } from '../constants/styles';
import {useAppSelector} from '../store/hooks'

type Props = {
  task: Task; 
  onBack: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskDetail({ task, onBack, onToggle, onDelete  }: Props) {
  const saving = useAppSelector(
      (state) => state.tasks.saving
    );
    
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        {/* Mostramos el estado actual (completada / pendiente) */}
        <Text style={styles.label}>Estado</Text>
        <Text style={[styles.text, task.completed ? styles.done : styles.pending]}>
          {task.completed ? ' Completada' : ' Pendiente'}
        </Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.text}>{task.description}</Text>
        
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.text}>{task.category}</Text>
        
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.text}>{new Date(task.createdAt).toLocaleDateString()}</Text>

        <TouchableOpacity style={[styles.toggleButton, saving && styles.buttonDisabled]} onPress={onToggle} disabled={saving}>
          <Text style={styles.buttonText}>
            {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          </Text>
        </TouchableOpacity>

          <TouchableOpacity style={[styles.deleteButton, saving && styles.buttonDisabled]} onPress={onDelete} disabled={saving}>
            <Text style={styles.buttonText}>Eliminar tarea</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onBack}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}