# Final Taller de Programación 2

API RESTful desarrollada en **Node.js + Express** para la gestión de habitaciones de un hotel.

El proyecto implementa autenticación mediante JWT, persistencia con MongoDB Atlas y consumo de una API externa para generar un archivo CSV.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- Morgan
- Dotenv

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/DanielaRios/Z_FINALTP2RiosValenciaMireyaDaniela
```

Ingresar al proyecto:

```bash
cd FinalTP2-Rios-Valencia-Mireya-Daniela
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
SERVER_HOST=127.0.0.1
SERVER_PORT=3001

MONGO_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/hotel

AUTH_USER=admin
AUTH_PASSWORD=admin123

JWT_SECRET=supersecret
```

---

# Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

---

# Estructura del proyecto

```text
src
│
├── auth
├── config
├── controllers
├── data
├── databases
├── middleware
├── models
├── repository
├── router
└── validators
└── server.js

tests
│
└── test.endpoints.http

app.js
package.json
README.md
```

---

# Endpoints

| Método | Endpoint | Autenticación |
|---------|----------|---------------|
| POST | /api/v1/auth/login | No |
| POST | /api/v1/habitaciones | No |
| GET | /api/v1/habitaciones | No |
| GET | /api/v1/habitaciones/:id | No |
| PUT | /api/v1/habitaciones/:id | Sí |
| DELETE | /api/v1/habitaciones/:id | Sí |
| GET | /api/v1/pokemon/csv | No |

---

# Login

Para obtener un JWT:

```

POST /api/v1/auth/login

```

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Luego utilizar el token recibido:

```

Authorization: Bearer <TOKEN>

```

en los endpoints protegidos (`PUT` y `DELETE`).

---

# Funcionalidades

- CRUD completo de habitaciones.
- Validación de reglas de negocio.
- Login mediante JWT.
- Middleware de autenticación reutilizable.
- Persistencia con MongoDB Atlas.
- Consumo de la API pública PokeAPI.
- Generación y almacenamiento del archivo `pokemon_15.csv`.

---

# Pruebas

El proyecto incluye el archivo:

```text
tests/test.endpoints.http
```

con pruebas para:

- Login válido e inválido.
- CRUD de habitaciones.
- Validaciones.
- Rutas protegidas con JWT.
- Consumo de la API externa.
- Generación del archivo CSV.

---

# Autor

**Mireya Daniela Rios Valencia**

Final - Taller de Programación 2  
ORT Argentina