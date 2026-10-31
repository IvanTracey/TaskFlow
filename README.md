Esta app es el proyecto final del curso dictado por CoderHouse.

Para ejecutarlo localmente se debe tener instalado Node "npm install" y en consola escribir: "npx expo start".
Una vez cargado, se puede escanear el QR desde el celular con la aplicacion Expo Go. Puedes apretar la letra "a" y correrlo en un emulador que hayas descargado y configurado. O tambien puedes correrlo en un navegador web al apretar "w", pero para ello debes instalar lo siguiente: "npx expo install react-dom react-native-web". Para el uso de Redux Toolkit, se la instalo con el siguiente comando: npm install @reduxjs/toolkit react-redux

La pantalla principal muestra botones para filtrar las tareas (Todas, pendientes y completadas), el listado de tareas correspondiente a la seleccion, y en caso de no haber, un mensaje notificandolo. 

- En ella existe el boton "+", donde te envia a otra pantalla (navegacion stack). Alli se puede crear una nueva tarea mediante un formulario. Por defecto, la tarea se crea con la condición de "Pendiente". Se regresa a la pantalla de inicio a partir del guardado de la tarea creada o al presionar sobre una flecha. 
    
- Si se presiona sobre una de las tareas, se muestra el detalle de la misma (Título, estado, descripción, categoría y fecha). Además de botones con los cuales podes marcar la tarea como "Completada" o eliminarla. Por último, el boton de "Volver" que completa la navegación. 

- En HomeScreen tambien existe una barra horizontal que permite una navegacion tab hacia la pantalla de perfiles. La opción correspondiente a la página actual, posee el color negro.

