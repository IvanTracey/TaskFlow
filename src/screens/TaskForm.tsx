import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Text, TextInput,TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TasksStackParamList } from '../navigation/TasksStack';
import { useAppDispatch, useAppSelector  } from '../store/hooks';
import { addTask } from '../store/slices/tasksSlice';
import { styles } from '../constants/styles';


type TaskFormNavProp = NativeStackNavigationProp <TasksStackParamList, 'TaskForm'>;

export default function TaskForm() {
  const navigation = useNavigation<TaskFormNavProp>();
  
  const dispatch = useAppDispatch();
  // Creacion de estados para la informacion del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');

  const saving = useAppSelector(
    (state) => state.tasks.saving
  );
  // Estados como flags, para saber si salgo del campo
  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedDescription, setTouchedDescription] = useState(false);

  //Funcion de validacion
  const validateForm = ()  => {
    if (title.trim().length < 5 || description.trim().length < 10) {
      return false; //detiene la funcion, da un undefined
    }else{
      return true;
    }
  }

  // Funcion al presionar boton "Guardar"
  const handleAddTask = async () => {
    //Seteo en "Presionados" los estados para activar los errores visuales si están vacíos
    setTouchedTitle(true); 
    setTouchedDescription(true);

    if(validateForm()){
      // Despacha la accion addTask (guarda en Firestore). unwrap() lanza error si falla 
      try {
        await dispatch(
          addTask({
            title: title.trim(),
            description: description.trim(),
            category,
          })
        ).unwrap();
      } catch (error) {
        Alert.alert('Error', typeof error === 'string' ? error : 'No pudimos guardar la tarea.');
        return;
      }
      Alert.alert('Éxito', 'Tarea guardada');

      // Reseteo las variables
      setTitle('');
      setDescription('');
      setCategory('Trabajo');
      setTouchedTitle(false);
      setTouchedDescription(false);

      // Vuelve a la lista con goBack() para no acumular pantallas en el stack
      navigation.goBack();
    }
    else{
     Alert.alert('Error', 'No has completado correctamente los campos');
    }
    
  };

  const titleError = touchedTitle && title.trim().length < 5;
  const descriptionError = touchedDescription && description.trim().length < 10;
  
  return (
    <KeyboardAvoidingView style={styles.container} >
      <Text style={styles.title}>Tarea nueva</Text>
      <ScrollView>
        {/* Sector del titulo*/}
        <View>
          <Text style={styles.label}>Título</Text>
          <TextInput 
          // Aplica el estilo base, y si hay error, le suma el borde rojo
            style={[styles.input, titleError && styles.errorInput,]}
            placeholder="Título de la tarea"
            value={title}
            //Captura el cambio y envia
            onChangeText={setTitle} 
            // Cuando el usuario sale del input, marca que ya lo tocó
            onBlur={() => setTouchedTitle(true)}
            // Pone la primera letra de cada oración en mayúscula 
            autoCapitalize="sentences"
            // Cambia el botón del teclado del celular por uno que dice "Siguiente" 
            returnKeyType="next" 
          />
          {/* Si titleError es true, dibuja en la pantalla el siguiente texto de error */}
          {titleError && (//le avisan a react que es un bloque de codigo.
            <Text style={styles.error}>
              El título debe tener al menos 5 caracteres.
            </Text>
          )}
          </View>
          <View>
          <Text style={styles.label}>Descripción</Text>
          <TextInput //Para añadir estilos uso un array
            style={[styles.input, styles.description, descriptionError && styles.errorInput]}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            onBlur={() => setTouchedDescription(true)}
            autoCapitalize="sentences"
            multiline // Permite que el texto salte de línea y sea un campo alto
          />

          {descriptionError && (
            <Text style={styles.error}>
              La descripción debe tener al menos 10 caracteres.
            </Text>
          )}
        </View>

        {/* Sector de la categoria*/}
        <View>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categories}>
            {['Trabajo', 'Estudio', 'Personal'].map((item) => (
              <TouchableOpacity
                // Aplica el diseño de botón común, pero si coincide con la categoría seleccionada, aplica el estilo resaltado
                key={item}
                style={[
                  styles.category, 
                  category === item && styles.selectedCategory,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            ))}
            </View>
        </View>
        <TouchableOpacity 
          style={ [styles.button, saving && styles.buttonDisabled] } 
          onPress={handleAddTask} disabled={saving}>
          <Text style={styles.buttonText}>
            {saving ? 'Guardando...' : 'Guardar'} 
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}