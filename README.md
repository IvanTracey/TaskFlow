Esta app es el proyecto final del curso dictado por CoderHouse. App de tareas.

------------ COMPILACION

Para ejecutarlo localmente se debe tener instalado Node "npm install" y en consola escribir: "npx expo start".
Una vez cargado, se puede escanear el QR desde el celular con la aplicacion Expo Go. Puedes apretar la letra "a" y correrlo en un emulador que hayas descargado y configurado. 

Para la entrega final, se proporciona la URL de descarga directa de la APK de la app en funcionamiento. La información sensible sobre la configuración de firestore se encuentra cargada en EAS.

------------ FUNCIONALIDADES Y NAVEGACIÓN

La pantalla inicial muestra un login para poder ingresar a la cuenta de un usuario donde se podran ver y manipular sus tareas. En caso de ya estar logueado, directamente te muestra su sesión abierta. Cada cuenta maneja sus propias tareas y se mantiene sincronizado con Firebase. De querer registrar un nuevo usuario, te deriva a otra screen donde se ingresa el email y la contraseña en dos oportunidades, para poder crear una nueva cuenta.

Una vez logueado:
La pantalla principal muestra botones para filtrar las tareas (Todas, pendientes y completadas), el listado de tareas correspondiente a la selección, y en caso de no haber ninguna tarea, un mensaje notificandolo. 

En ella existe el boton "+", donde te envia a otra pantalla (navegacion stack). Allí se puede crear una nueva tarea mediante un formulario. Por defecto, la tarea se crea con la condición de "Pendiente". Se regresa a la pantalla de inicio a partir del guardado de la tarea creada o al presionar sobre una flecha. 
    
Si se presiona sobre una de las tareas, se muestra el detalle de la misma (Título, estado, descripción, categoría y fecha). Además de botones con los cuales podes marcar la tarea como "Completada" o eliminarla. Por último, el boton de "Volver" que completa la navegación. 

En HomeScreen tambien existe una barra horizontal que permite una navegacion tab hacia la pantalla de perfiles. En esta se muestra el email de la cuenta abierta, un nombre, una foto con la posibilidad de cambiarla y un boton para poder cerrar sesion. La opción correspondiente a la página actual, posee el color negro.

------------ Imagenes de las pantallas mas importantes

1. Imagen de LoginScreen.
2. Imagen de RegisterScreen.
3. Imagen de HomeScreen, con filtro de Todas las tareas.
4. Imagen de TaskForm, creación de tarea.
5. Imagen de TaskDetail, el detalle de una tarea.
6. Imagen de HomeScreen, con filtro de Tareas completadas.
7. Imagen de ProfileScreen, con avatar seleccionado.

<img width="240" height="495" alt="image1" src="https://github.com/user-attachments/assets/e6206600-16ee-42ec-ac70-7c3af90671c4" />
<img width="240" height="495" alt="image2" src="https://github.com/user-attachments/assets/0bd6951e-28c3-4f2d-bbe6-a0fb23eb0600" />
<img width="240" height="982" alt="image3" src="https://github.com/user-attachments/assets/6fc811cb-6ffb-4035-b1a8-fcaba3ea1753" />
<img width="240" height="495" alt="image4" src="https://github.com/user-attachments/assets/915931ce-93de-47e1-857c-6b82a1dcf643" />
<img width="240" height="495" alt="image5" src="https://github.com/user-attachments/assets/e2786fdd-ded7-40b1-b22d-93240b574cae" />
<img width="240" height="495" alt="image6" src="https://github.com/user-attachments/assets/c851c70a-cb87-4483-b9f2-c7f2b6a3a606" />
<img width="240" height="495" alt="image7" src="https://github.com/user-attachments/assets/f202e59e-e215-42fb-ad7f-a4fb54d6859d" />

