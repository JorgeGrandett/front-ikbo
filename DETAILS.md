Para la realizacion de este codigo se siguio un paron de arquitectura limpia y código limpio aporta claridad, escalabilidad y mantenimiento al proyecto. Esta diviendo el código en capas bien definidas (dominio, data, infraestructura, core y components), desacoplando las dependencias y permitiendo que los cambios en una capa no afecten a las demás. Además, el uso de código limpio garantiza que el proyecto sea fácil de entender, modificar y extender, lo que reduce costos y errores a largo plazo.

Uso de TypeScript:
Su tipado estatico ayuda a detectar errores en tiempo de desarrollo, aumentando la confiabilidad, ademas de que facilita la comprensión del código al declarar explícitamente tipos y estructuras, teniendo contratos claros entre las diferentes capas aumentando al robustes de este.

Uso de Axios:
Se uso  axios porque proporciona una API clara y sencilla para realizar solicitudes HTTP, como GET, POST, PUT, y DELETE, con un manejo facil de configuraciones y parámetros, ademas de que no es necesario convertir las respuestas a JSON, debido a que axios lo hace por si solo; ademas de que tiene compatibilidad con promesas permitiendo el desarrollo de proyectos asincronos.