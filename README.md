Esta app es el proyecto final del curso dictado por CoderHouse.

Para ejecutarlo localmente se debe tener instalado Node "npm install" y en consola escribir: "npx expo start".
Una vez cargado, se puede escanear el QR desde el celular con la aplicacion Expo Go. Puedes apretar la letra "a" y correrlo en un emulador que hayas descargado y configurado. O tambien puedes correrlo en un navegador web al apretar "w", pero para ello debes instalar lo siguiente: "npx expo install react-dom react-native-web". Para el uso de Redux Toolkit, se la instalo con el siguiente comando: npm install @reduxjs/toolkit react-redux

La pantalla inicial muestra un login para poder ingresar a la cuenta de un usuario donde se podran ver y manipular sus tareas. En caso de ya estar logueado, directamente te muestra su sesion. Cada cuenta maneja sus propias tareas y se mantiene sincronizado con Firebase. 

Una vez logueado:
La pantalla principal muestra botones para filtrar las tareas (Todas, pendientes y completadas), el listado de tareas correspondiente a la seleccion, y en caso de no haber, un mensaje notificandolo. 

- En ella existe el boton "+", donde te envia a otra pantalla (navegacion stack). Alli se puede crear una nueva tarea mediante un formulario. Por defecto, la tarea se crea con la condición de "Pendiente". Se regresa a la pantalla de inicio a partir del guardado de la tarea creada o al presionar sobre una flecha. 
    
- Si se presiona sobre una de las tareas, se muestra el detalle de la misma (Título, estado, descripción, categoría y fecha). Además de botones con los cuales podes marcar la tarea como "Completada" o eliminarla. Por último, el boton de "Volver" que completa la navegación. 

- En HomeScreen tambien existe una barra horizontal que permite una navegacion tab hacia la pantalla de perfiles. Alli se muestra el email de la cuenta abierta, un nombre y un boton para poder cerrar sesion. La opción correspondiente a la página actual, posee el color negro.

En dicho proyecto se encuentra oculto la informacion sensible de mi cuenta de Firebase que se encuentra en .env.local. Las variables que se necesitan son:
    EXPO_PUBLIC_FIREBASE_API_KEY=
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
    EXPO_PUBLIC_FIREBASE_PROJECT_ID=
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    EXPO_PUBLIC_FIREBASE_APP_ID=
También que hay que habilitar Email/Password en Authentication y crear Firestore con las reglas por userId.

La recomendacion de como usar el repo es que cada persona use su propia base de datos, de la siguiente manera:
1. Clona el repo y corre npm install.
2. Crea un proyecto en Firebase, agrega una app Web y copia las 6 claves.
3. Activa Authentication → Correo/contraseña y crea Firestore.
4. Pega las reglas por userId en la pestaña Reglas.
5. Crea el .env.local con sus claves y corre npx expo start.
6. Escanea el QR con Expo Go, que tiene que ser compatible con SDK 58.


