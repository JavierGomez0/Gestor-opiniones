# Gestor de Opiniones

Este repositorio contiene la lógica de backend para el sistema de gestión de opiniones, desarrollado con Node.js, Express y MongoDB.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración del .env](#configuración-del-env)
- [Ejecutar el servidor](#ejecutar-el-servidor)
- [Documentación de URLs](#documentación-de-urls)
- [Ejemplos de JSON](#ejemplos-de-json)
- [Resumen de Endpoints](#resumen-de-endpoints)
- [Administrador por defecto](#administrador-por-defecto)

---

## 📦 Requisitos

- Node.js >= 18
- MongoDB en ejecución local o en la nube
- npm o pnpm instalado

---

## 🚀 Instalación

### 1. Clonar el repositorio:

```bash
git clone https://github.com/JavierGomez0/Gestor-de-Opiniones.git
cd Gestor-de-Opiniones
```

### 2. Instalar dependencias

```bash
npm install
```

O si utilizas pnpm:

```bash
pnpm install
```

### 3. Crear archivo .env

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

---

## 🔧 Configuración del .env

```env
PORT=3001
NODE_ENV=development
URI_MONGODB=mongodb://localhost:27017/gestor-opiniones
```

**Variables explicadas:**
- `PORT`: Puerto en el que se ejecutará el servidor (por defecto 3001)
- `NODE_ENV`: Ambiente de ejecución (development, production)
- `URI_MONGODB`: URL de conexión a MongoDB

---

## ▶️ Ejecutar el servidor:

```bash
node index.js
```

El servidor estará disponible en: `http://localhost:3001/gestor-de-opiniones/v1`

---

## 🔗 Documentación de URLs

### Usuarios

**Método POST y GET** - Agregar y Consultar Usuarios
```
POST   /gestor-de-opiniones/v1/usuarios
GET    /gestor-de-opiniones/v1/usuarios
```

**Método GET, PUT y DELETE** - Buscar, Actualizar y Eliminar Usuario
```
GET    /gestor-de-opiniones/v1/usuarios/:id
PUT    /gestor-de-opiniones/v1/usuarios/:id
DELETE /gestor-de-opiniones/v1/usuarios/:id
```

---

### Publicaciones

**Método POST y GET** - Agregar y Consultar Publicaciones
```
POST   /gestor-de-opiniones/v1/publicaciones
GET    /gestor-de-opiniones/v1/publicaciones
```

**Método PUT** - Actualizar Publicación
```
PUT    /gestor-de-opiniones/v1/publicaciones/:id
```

**Método PUT** - Activar Publicación
```
PUT    /gestor-de-opiniones/v1/publicaciones/:id/activar
```

**Método PUT** - Desactivar Publicación
```
PUT    /gestor-de-opiniones/v1/publicaciones/:id/desactivar
```

---

### Comentarios

**Método POST y GET** - Agregar y Consultar Comentarios
```
POST   /gestor-de-opiniones/v1/comentarios
GET    /gestor-de-opiniones/v1/comentarios
```

---

## 📝 Ejemplos de JSON

### Crear Usuario

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan.perez@example.com",
  "contrasena": "123456"
}

```

### Crear Publicación

```json
{
  "titulo": "Mi primera publicación",
  "descripcion": "Esta es una publicación de prueba",
  "usuario": "699352f8a314482b0f2dde3c"
}
```

### Crear Comentario

```json
{
  "descripcion": "Estoy jugando Fortnite",
  "publicacion": "6993a5da8678a88918a45a06"
}
```

---


## 🔐 Administrador por defecto

Para acceder como administrador, utiliza las siguientes credenciales:

```json
{
  "email": "admin@gestor.com",
  "password": "admin123"
}
```
