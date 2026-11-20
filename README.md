Esta app es el proyecto final del curso dictado por CoderHouse. App de tareas.

------------ COMPILACION

Para ejecutarlo localmente se debe tener instalado Node "npm install" y en consola escribir: "npx expo start".
Una vez cargado, se puede escanear el QR desde el celular con la aplicacion Expo Go. Puedes apretar la letra "a" y correrlo en un emulador que hayas descargado y configurado. 

Para la entrega final, se proporciona la URL de descarga directa de la APK de la app en funcionamiento. La información sensible sobre la configuración de firestore se encuentra cargada en EAS. Link de instalación: https://expo.dev/accounts/ivcode/projects/taskflow/builds/1a3341c5-f63c-4b0b-9519-2815d45e3eb3

------------ FUNCIONALIDADES Y NAVEGACIÓN

La pantalla inicial muestra un login para poder ingresar a la cuenta de un usuario donde se podran ver y manipular sus tareas. En caso de ya estar logueado, directamente te muestra su sesión abierta. Cada cuenta maneja sus propias tareas y se mantiene sincronizado con Firebase. De querer registrar un nuevo usuario, te deriva a otra screen donde se ingresa el email y la contraseña en dos oportunidades, para poder crear una nueva cuenta.

Una vez logueado:
La pantalla principal muestra botones para filtrar las tareas (Todas, pendientes y completadas), el listado de tareas correspondiente a la selección, y en caso de no haber ninguna tarea, un mensaje notificandolo. 

En ella existe el boton "+", donde te envia a otra pantalla (navegacion stack). Allí se puede crear una nueva tarea mediante un formulario. Por defecto, la tarea se crea con la condición de "Pendiente". Se regresa a la pantalla de inicio a partir del guardado de la tarea creada o al presionar sobre una flecha. 
     
Si se presiona sobre una de las tareas, se muestra el detalle de la misma (Título, estado, descripción, categoría y fecha). Además de botones con los cuales podes marcar la tarea como "Completada" o eliminarla. Por último, el boton de "Volver" que completa la navegación. 

En HomeScreen tambien existe una barra horizontal que permite una navegacion tab hacia la pantalla de perfiles. En esta se muestra el email de la cuenta abierta, un nombre, una foto con la posibilidad de cambiarla y un boton para poder cerrar sesion. En dicha pantalla tambien existe la opción de elegir si la app se usa en modo claro u oscuro, cambiando el estilo de todas las pantallas. Por defecto comienza en modo claro, luego recordará la elección del usuario.

Sin conexion a internet, se puede navegar por la sesión abierta pero no será capaz de crear una tarea o modificar el estado de una existente, tampoco de crear una cuenta o iniciarla. Esta decisión de programación se realizó para que no se dupliquen acciones, es por eso que se verifica la conexión antes de cualquier vinculación con firestore.

------------ Imagenes de las pantallas mas importantes
1. Imagen de LoginScreen.
2. Imagen de RegisterScreen.
3. Imagen de HomeScreen, con filtro de Todas las tareas.
4. Imagen de TaskDetail, el detalle de una tarea.
5. Imagen de HomeScreen, con filtro de Tareas completadas.
6. Imagen de ProfileScreen, con avatar seleccionado y habiendo cambiado a modo oscuro.

<img width="240" height="495" alt="image1" src="https://github.com/user-attachments/assets/67487392-60d2-41ca-80c7-3e48980da972" />
<img width="240" height="495" alt="image2" src="https://github.com/user-attachments/assets/25ddf74d-fc8f-422d-88e0-25dc989d8f47" />
<img width="240" height="495" alt="image3" src="https://github.com/user-attachments/assets/055a422b-9efc-4908-983c-4bc1e29096ab" />
<img width="240" height="495" alt="image5" src="https://github.com/user-attachments/assets/ac81138c-d961-4add-9b9d-011faf05528f" />
<img width="240" height="495" alt="image6" src="https://github.com/user-attachments/assets/3f3ce84f-8973-4e5c-8c5b-5f68cb8c60bd" />
<img width="240" height="495" alt="image7" src="https://github.com/user-attachments/assets/0b8e410a-c786-4a1f-ba1a-5887c5cd84e8" />
