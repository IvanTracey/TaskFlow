Esta app es el proyecto final del curso dictado por CoderHouse.

Para ejecutarlo localmente se debe tener instalado Node "npm install" y en consola escribir: "npx expo start".
Una vez cargado, se puede escanear el QR desde el celular con la aplicacion Expo Go. Puedes apretar la letra "a" y correrlo en un emulador que hayas descargado y configurado. O tambien puedes correrlo en un navegador web al apretar "w", pero para ello debes instalar lo siguiente: "npx expo install react-dom react-native-web". Para el uso de Redux Toolkit, se la instalo con el siguiente comando: npm install @reduxjs/toolkit react-redux

La pantalla principal muestra botones para filtrar las tareas (Todas, pendientes y completadas), el listado de tareas correspondiente a la seleccion, y en caso de no haber, un mensaje notificandolo. 
    - En ella existe el boton "+", donde te envia a otra pantalla (navegacion stack). Alli se puede crear una nueva tarea mediante un formulario. Por defecto, la tarea se crea con la condición de "Pendiente". Se regresa a la pantalla de inico a partir del guardado de la tarea creada o al presionar sobre una flecha. 
    
    - Si se presiona sobre una de las tareas, se muestra el detalle de la misma (Título, estado, descripción, categoría y fecha). Además de botones con los cuales podes marcar la tarea como "Completada" o eliminarla. Por último, el boton de "Volver" que completa la navegación. 

    - En HomeScreen tambien existe una barra horizontal que permite una navegacion tab hacia la pantalla de perfiles. La opción correspondiente a la página actual, posee el color negro.



FIG 1: Imagen de HomeScreen donde se observa la lista de tareas, el boton para agregar una nueva y la barra horizontal mencionada.
FIG 2: Imagen de detalles de una tarea seleccionada.
FIG 3: Imagen que muestra el formulario para crear una nueva tarea.
FIG 4: Imagen de la pantalla correspondiente al listado de perfiles creados.


<img width="240" height="480" alt="image" src="https://github.com/user-attachments/assets/414f547c-fde3-4b10-b2d8-79dfdb0308e2" />
<img width="240" height="480" alt="image" src="https://github.com/user-attachments/assets/971cb420-0a6c-4f24-af53-78a0458986c2" />
<img width="240" height="480" alt="image" src="https://github.com/user-attachments/assets/f81a162e-d208-4cf0-8536-bb4098e2e727" />
<img width="240" height="480" alt="image" src="https://github.com/user-attachments/assets/f23ce78a-3221-4127-854b-b0db06b84963" />
