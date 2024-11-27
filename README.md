# Vue 3 + TypeScript + Vite

# front-ikbo
Repositorio que alberga el front para la prueba técnica para Ingeniero de Desarrollo Senior para IBK S.A.S

Frontend Realizado con:
* Vue 3
* TypeScript v5.6.2
* Vite v6.0.0
* NPM v10.9.0
* Axios v1.7.8

Para la ejecucion del codigo es necesario crear un archivo .env en la raiz del mismo, este archivo debe contener
la siguiente información:

VITE_API_URL=http://localhost:3000/api

VITE_API_URL ===> es la Url donde se este ejecutando el backend, es necesario que despues de la url se adicione '/api', como se muestra en el ejemplo para una correcta conexion al backend

Antes de ejecutar el proyecto es necesario relizar la instalacion de las dependencias con el comando:
npm install

Y una vez hecho este paso se puede ejecutar el servidor con el comando:
npm run dev
