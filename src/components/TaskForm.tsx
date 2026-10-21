import { useState } from 'react';
import { COLORS, MARGIN, SIZE } from '../constants/theme';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TasksStackParamList } from '../navegation/TasksStack';

type TaskFormNavProp = NativeStackNavigationProp <TasksStackParamList, 'TaskForm'>;

export default function TaskForm() {
  const navigation = useNavigation<TaskFormNavProp>();

  // Creacion de estados para la informacion del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');

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
  const handleAddTask = () => {
    //Seteo en "Presionados" los estados para activar los errores visuales si están vacíos
    setTouchedTitle(true); 
    setTouchedDescription(true);

    // Creacion del objeto "Tarea"
    const task = {
      title: title.trim(), 
      description: description.trim(),
      category,
      createdAt: new Date(),
    };
    
    if(validateForm()){  
      console.log('Tarea creada:', task);
      Alert.alert('Éxito', 'Tarea capturada localmente');

      // Reseteo las variables
      setTitle('');
      setDescription('');
      setCategory('Trabajo');
      setTouchedTitle(false);
      setTouchedDescription(false);

      // De vuelve la navegacion a la lista
      navigation.navigate('TaskList');
    }
    else{
     Alert.alert('Error', 'No has completado correctamente los campos');
    }
    
  };

  const titleError = touchedTitle && title.trim().length < 5;
  const descriptionError = touchedDescription && description.trim().length < 10;
  
  return (
    <KeyboardAvoidingView 
    style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
  },
  label: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.card,
  },
  description: {
    height: 100,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
  },
  category: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: COLORS.card,
  },
  selectedCategory: {
    backgroundColor: COLORS.background,
  },
  button: {
    marginTop: MARGIN.marginS,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
  text: {
    fontSize: SIZE.fontSmall,
  },
});