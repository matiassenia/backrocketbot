# Proyecto de construcción de API.
## Autenticación con Node.js, Express y Prisma

Este proyecto implementa una API REST para autenticación de usuarios, utilizando Node.js, Express, Prisma y JSON Web Tokens (JWT). La API permite registrar usuarios, iniciar sesión y obtener el perfil del usuario autenticado.

---

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para crear aplicaciones web y APIs.
- **Prisma**: ORM para interactuar con la base de datos.
- **bcryptjs**: Biblioteca para encriptar contraseñas.
- **jsonwebtoken (JWT)**: Manejo de tokens para autenticación.
- **dotenv**: Manejo de variables de entorno.

---

## Prerrequisitos

- **Node.js**: Versión 14.x o superior.
- **Base de datos**: Configurada y accesible. Se utiliza SQLite para desarrollo; PostgreSQL/MySQL recomendado para producción.

---

## Instalación y configuración inicial

```bash
# Clonar el repositorio
$ git clone <https://github.com/matiassenia/backrocketbot.git>
$ cd <backrocketbot>

# Instalar las dependencias
$ npm install

# Configurar las variables de entorno
# Crear un archivo .env y definir las variables:
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="contrasenasegura1234"

# Configurar la base de datos
$ npx prisma migrate dev --name init

# Iniciar el servidor
$ npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

---

## Endpoints

### **1. Registro de usuario**

- **Ruta**: `/api/register`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
      "email": "matias@rocketbot.com",
      "password": "qwerty1234",
      "name": "Matias"
  }
  ```
- **Respuesta de éxito**:
  ```json
  {
      "message": "Usuario creado con éxito",
      "user": {
          "id": 1,
          "email": "matias@rocketbot.com",
          "name": "Matias"
      }
  }
  ```

### **2. Inicio de sesión**

- **Ruta**: `/api/login`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
      "email": "matias@rocketbot.com",
      "password": "qwerty1234"
  }
  ```
- **Respuesta de éxito**:
  ```json
  {
      "message": "Login exitoso",
      "token": "eltoken"
  }
  ```

### **3. Perfil de usuario**

- **Ruta**: `/api/profile`
- **Método**: `GET`
- **Encabezado de autorización**:
  ```
Authorization (En Postman):
En la pestaña Headers, agregar un encabezado con:
Key: Authorization
Value: Bearer <token> (reemplazar <token> con el token generado)


  ```
- **Respuesta de éxito**:
  ```json
  {
      "user": {
          "id": 1,
          "email": "matias@rocketbot.com",
          "name": "Matias"
      }
  }
  ```

---

## Estructura del proyecto

```backrocketbot
├── src
│   ├── controllers
│   │   └── auth.controller.js
│   ├── middlewares
│   │   └── auth.middleware.js
│   ├── routes
│   │   └── auth.routes.js
│   ├── app.js
│   └── server.js
├── prisma
│   └── schema.prisma
├── .env
├── package.json
├── README.md
```

---

## Scripts disponibles

```bash
# Inicia el servidor en modo desarrollo con nodemon
$ npm run dev

# Inicia el servidor en modo producción
$ npm start
```

---

## Notas

1. Asegúrarse de tener una base de datos configurada y accesible desde el archivo `.env`.
2. Probar los endpoints usando herramientas como Postman.
3. Personalizar el esquema de Prisma en el archivo `prisma/schema.prisma` según las necesidades.

```prisma
   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     password  String
     name      String
     createdAt DateTime @default(now())
   }
```

4. Cambiar el valor de JWT_SECRET a algo único y difícil.

---
