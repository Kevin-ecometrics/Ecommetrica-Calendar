# Ecommetrica - Calendar React

Este componente se enfoca en la reserva de citas construido con React y TypeScript. Permite a los usuarios seleccionar un día y una hora para hacer una reserva, y luego ingresar su nombre, correo electrónico y número de teléfono para confirmar la reserva.

![vite badge](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![tailwind badge](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![node badge](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![express badge](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![npm badge](https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![framer motion badge](https://img.shields.io/badge/-Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![axios badge](https://img.shields.io/badge/-Axios-007ACC?style=flat-square&logo=axios&logoColor=white)
![Logo](/public/ecommetrica.png)


## 🔒 Dependencias

- [REACT-MODERN-CALENDAR-DATEPICKER](https://github.com/Kiarash-Z/react-modern-calendar-datepicker) - Un componente de selector de fecha moderno y accesible para React.
- [Axios](https://www.npmjs.com/package/axios) -  Biblioteca para hacer solicitudes HTTP desde el navegador.
- [React-Hot-Toast](https://github.com/timolins/react-hot-toast) - Biblioteca para mostrar notificaciones tostadas.
- [Framer-Motion](https://www.framer.com/motion/) - Una biblioteca para animaciones y transiciones.
- [React-Vite](https://vitejs.dev/) - Biblioteca para construir interfaces de usuario.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript que añade tipado estático y objetos basados en clases.
- [Express](https://expressjs.com/) - Facilita la construcción de aplicaciones web y API de manera rápida y sencilla.
- [TailwindCss](https://tailwindcss.com/) - Proporciona clases de utilidad de bajo nivel para ayudar a los desarrolladores a crear diseños únicos sin salir de su HTML.

## 🗝️ Instalacion

Clona el proyecto del repositorio de [GitHub](https://github.com/) ejecutando el siguiente comando.

```bash
#Clonamos el proyecto
git clone https://github.com/username/project.git

#Nos movemos a la carpeta del proyecto clonado
cd project

#Instalamos dependencias
npm install
```

## 📁 Estructura
```
└── 📁Proyecto
    └── .eslintrc.cjs
    └── .gitignore
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── 📁public
        └── vite.svg
    └── README.md
    └── 📁src
        └── App.css
        └── App.tsx
        └── 📁assets
            └── react.svg
        └── index.css
        └── main.tsx
        └── vite-env.d.ts
    └── tailwind.config.js
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```

## 🧑‍💻 Uso

Para levanatar tu proyecto, solo debes ejecturar el siguiente comando.

```bash
npm run dev
```
Una vez ejecutado, podrás ver tu proyecto en tu navegador web accediendo a http://localhost:5173.

# 💻 Vista previa

![Logo](/public/calendar_image.png)

## 💻 Componentes
`App.tsx`

El componente principal de la aplicación Mantiene el estado de la aplicación y contiene la lógica principal.

## 💻 Estado

- `selectedDay`: El día seleccionado por el usuario.
- `name`: El nombre ingresado por el usuario.
- `email`: El correo electrónico ingresado por el usuario.
- `phone`: El número de teléfono ingresado por el usuario.
- `SelectedTime`: La hora seleccionada por el usuario.
- `bookedHours`: Las horas que ya han sido reservadas.
- `resetSelect`: Un estado para reiniciar el select.

## 💻 Funciones
- `handleSubmit`: Maneja el envío del formulario de reserva. Verifica que el número de teléfono sea válido, luego envía los datos de la reserva a un servidor y maneja la respuesta.
- `getBookedHours`: Obtiene las horas que ya han sido reservadas desde el servidor.

### Función `handleSubmit`

La función `handleSubmit` es un manejador de eventos que se ejecuta cuando el usuario envía el formulario de reserva. Esta función realiza varias tareas:

1. Previene la acción por defecto del evento de envío del formulario para evitar que la página se recargue.
2. Verifica que el número de teléfono ingresado por el usuario contenga solo números y tenga exactamente 10 dígitos. Si no cumple con estos requisitos, muestra una alerta al usuario y termina la ejecución de la función.
3. Convierte la hora seleccionada por el usuario a formato de 24 horas si es necesario.
4. Crea un objeto `BookingData` con los datos ingresados por el usuario y la fecha y hora seleccionadas.
5. Intenta enviar una solicitud POST a la API en la ruta especificada por la variable de entorno `VITE_HOST_URL` con `BookingData` como cuerpo de la solicitud.
6. Si la solicitud es exitosa, muestra un mensaje de éxito al usuario, limpia los campos del formulario y cambia el estado de `resetSelect` para reiniciar el selector de tiempo.
7. Si ocurre un error durante la solicitud, lo registra en la consola.

![logo](/public/handlesubmit.png)

### Endpoint `/booking`

El endpoint `/booking` de la API recibe solicitudes POST y almacena los datos de la reserva en la base de datos. Cuando se recibe una solicitud:

1. Extrae los datos `name`, `email`, `phone` y `date` del cuerpo de la solicitud.
2. Ejecuta una consulta SQL `INSERT` para almacenar estos datos en la `Tabla` de la base de datos.
3. Si la consulta se ejecuta con éxito, envía una respuesta con el mensaje "Datos del formulario almacenados".
4. Si ocurre un error durante la ejecución de la consulta, lanza el error.

Este endpoint espera recibir los datos de la reserva en el cuerpo de la solicitud en formato JSON. La ruta de la API puede ser una URL local o pública, dependiendo de la variable de entorno `VITE_HOST_URL`.

![logo](/public/booking.png)

### Función `getBookedHours`

La función `getBookedHours` se ejecuta dentro de un `useEffect` en el componente de React. Esta función se ejecuta cada vez que el estado `resetSelect` cambia. Aquí están los pasos que sigue:

1. Intenta hacer una solicitud GET a la API en la ruta especificada por la variable de entorno `VITE_HOST_URL` con el endpoint `/bookedHours`.
2. Si la solicitud es exitosa, establece el estado `bookedHours` con los datos de la respuesta. Estos datos representan las horas que ya han sido reservadas.
3. Si ocurre un error durante la solicitud, lo registra en la consola.

![logo](/public/getBookedHours.png)

### Endpoint `/bookedHours`

El endpoint `/bookedHours` de la API recibe solicitudes GET y devuelve las horas que ya han sido reservadas. Cuando se recibe una solicitud:

1. Ejecuta una consulta SQL `SELECT` para obtener todas las fechas de la tabla `information` en la base de datos.
2. Si la consulta se ejecuta con éxito, mapea los resultados a un nuevo array de objetos. Cada objeto tiene una propiedad `date` que representa la fecha de la reserva en formato 'YYYY-MM-DD' y una propiedad `hour` que representa la hora de la reserva en formato 'HH:mm:ss'.
3. Envía este array de objetos como respuesta en formato JSON.
4. Si ocurre un error durante la ejecución de la consulta, lanza el error.

Este endpoint no requiere ningún parámetro y devuelve los datos de las reservas en formato JSON.

![logo](/public/bookhours.png)

### Selección de la hora de la cita

El componente `<select>` se utiliza para que el usuario seleccione la hora de su cita. Este componente tiene varias características:

1. El valor actualmente seleccionado se almacena en el estado `selectedTime`. Cuando el usuario selecciona una nueva hora, el manejador de eventos `onChange` actualiza este estado con el nuevo valor.
2. El componente `<select>` mapea sobre el array `hours`, que contiene todas las horas posibles para las citas. Para cada hora, realiza lo siguiente:
   - Formatea la hora en formato de 12 horas con AM/PM.
   - Formatea la hora en formato de 24 horas como 'HH:00:00'.
   - Formatea la fecha seleccionada como 'YYYY-MM-DD'.
   - Comprueba si la hora y la fecha ya han sido reservadas. Si es así, no muestra esta hora como opción para el usuario.
   - Si la hora no ha sido reservada, la muestra como una opción que el usuario puede seleccionar.
3. Cuando una hora es seleccionada y la cita es reservada con éxito, esa hora ya no aparecerá como opción para futuras reservas en la misma fecha. Esto se logra al comprobar si la hora y la fecha están en el array `bookedHours` antes de mostrar la opción al usuario.

![logo](/public/select.png)


## 👾 Contribucion

Las `Pull requests` son bienvenidas. Para cambios importantes, abra primero un problema
para discutir lo que le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## 🪪 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
Copyright (c) [2024] [Ecommetrica](https://ecommetrica.com/)
