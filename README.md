# Proyecto de Construcción de API

## Autenticación con Node.js, Express y Prisma

Este proyecto implementa una API REST para la autenticación de usuarios, utilizando Node.js, Express, Prisma y JSON Web Tokens (JWT). La API permite registrar usuarios, iniciar sesión y obtener el perfil del usuario autenticado.

---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para crear aplicaciones web y APIs.
- **Prisma**: ORM para interactuar con la base de datos.
- **bcryptjs**: Biblioteca para encriptar contraseñas.
- **jsonwebtoken (JWT)**: Manejo de tokens para autenticación.
- **dotenv**: Manejo de variables de entorno.

---

## Prerrequisitos

- **Node.js**: Versión 14.x o superior.
- **Base de datos**: Se utiliza SQLite para desarrollo.

---

## Instalación y Configuración Inicial

```bash
# Clonar el repositorio
$ git clone https://github.com/matiassenia/backrocketbot.git
$ cd backrocketbot

# Instalar las dependencias
$ npm install

# Configurar las variables de entorno
# Crear un archivo .env y definir las siguientes variables:
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="contrasenasegura1234"

# Configurar la base de datos
$ npx prisma migrate dev --name init

# Iniciar el servidor
$ npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

![Localhost3000](./images/apifuncionando.jpg)
---

## Endpoints

### **1. Registro de Usuario**

- **Ruta**: `/api/register`
- **Método**: `POST`
- **Cuerpo de la Solicitud**:
  ```json
  {
      "email": "matias@rocketbot.com",
      "password": "qwerty1234",
      "name": "matiaspararocketbot"
  }
  ```

![Registro con éxito](./images/registerok.jpg)


- **Respuesta de Éxito**:
  ```json
  {
      "message": "Usuario creado con éxito",
      "user": {
        "id": 1,
        "email": "matias@rocketbot.com",
        "name": "matiaspararocketbot"
        }
  }
  ```

### **2. Inicio de Sesión**

- **Ruta**: `/api/login`
- **Método**: `POST`
- **Cuerpo de la Solicitud**:
  ```json
  {
      "email": "matias@rocketbot.com",
      "password": "qwerty1234"
  }
  ```
- **Respuesta de Éxito**:
  ```json
  {
      "message": "Login exitoso",
      "token": "eltoken"
  }
  ```
![Loguin exitoso](./images/loginok.jpg)

### **3. Perfil de Usuario**

- **Ruta**: `/api/profile`
- **Método**: `GET`
- **Encabezado de Autorización**:
  ```
  Authorization (En Postman):
  En la pestaña Headers, agregar un encabezado con:
  Key: Authorization
  Value: Bearer <token> (reemplazar <token> con el token generado)
  ```

![Profile](./images/profileok.jpg)


---

## Scripts Disponibles

```bash
# Iniciar el servidor en modo desarrollo con nodemon
$ npm run dev

# Iniciar el servidor en modo producción
$ npm start
```

---

## Notas

1. Asegurarse de tener una base de datos configurada y accesible desde el archivo `.env`.
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

