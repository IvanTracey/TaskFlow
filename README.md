Esta app es el proyecto final del curso dictado por CoderHouse.

Para ejecutarlo localmente se debe tener instalado Node "npm install" y en consola escribir: "npx expo start".
Una vez cargado, se puede escanear el QR desde el celular con la aplicacion Expo Go. Puedes apretar la letra "a" y correrlo en un emulador que hayas descargado y configurado. O tambien puedes correrlo en un navegador web al apretar "w", pero para ello debes instalar lo siguiente: "npx expo install react-dom react-native-web"

En este momento el proyecto esta en la etapa 3, se creó un pequeño formulario para la creación de tareas. El titulo debe tener más de 3 caracteres y la descripción un mínimo de 5, mostrando los respectivos errores. Una vez ingresado el título, la descripción y la categoría de la tarea, al presionar el boton de guardado, se imprime un console.log con dicha información junto con la fecha de carga. Además, al apretar dicho botón, también se limpian los campos.