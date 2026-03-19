# 🐾 AdoptMe | Desarrollado como Proyecto Final — BTech

Aplicación web para gestión de mascotas en adopción. Permite agregar, editar, eliminar y adoptar mascotas, con soporte para modo oscuro y subida de imágenes.

---

## 🚀 Demo

> [Ver demo en vivo](#) ← reemplazá con tu link de GitHub Pages

---

## ✨ Funcionalidades

- 📋 **Listar mascotas** — visualización de mascotas disponibles y adoptadas en cards
- ➕ **Agregar mascota** — formulario con validaciones, subida de foto y datos completos
- ✏️ **Editar mascota** — modal de edición con datos precargados
- ❌ **Eliminar mascota** — con confirmación via SweetAlert2
- ❤️ **Adoptar / Devolver** — cambio de estado de adopción en tiempo real
- 🌙 **Modo oscuro / claro** — persistido en localStorage
- 👤 **Usuario anónimo** — autenticación anónima con Firebase Auth

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| [React.js](https://reactjs.org/) | Framework frontend |
| [Firebase Firestore](https://firebase.google.com/) | Base de datos |
| [Firebase Auth](https://firebase.google.com/) | Autenticación anónima |
| [Cloudinary](https://cloudinary.com/) | Almacenamiento de imágenes |
| [React Router](https://reactrouter.com/) | Navegación |
| [React Bootstrap](https://react-bootstrap.github.io/) | Componentes UI |
| [SweetAlert2](https://sweetalert2.github.io/) | Alertas y confirmaciones |
| [FontAwesome](https://fontawesome.com/) | Iconos |
| [Vite](https://vitejs.dev/) | Bundler |

---

## 🏗️ Arquitectura

El proyecto usa **Context API + useReducer** como sistema de estado global, siguiendo el patrón:

```
Firebase (nube) ←→ Service ←→ Reducer (estado local) ←→ UI
```

- **`service.js`** — operaciones CRUD con Firestore
- **`reducer.js`** — maneja el estado en memoria (SET, ADD, UPDATE, DELETE, CHANGE_MODE)
- **`Context.jsx`** — provee el estado global a toda la app

---

## 📁 Estructura del proyecto

```
src/
├── assets/
│   ├── img/
│   └── utils/
│       ├── Cloudinary.js
│       └── routes.js
├── components/
│   ├── Banner.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Loading.jsx
│   ├── LoadingPage.jsx
│   ├── ModalAddPet.jsx
│   ├── ModalEditPet.jsx
│   ├── NavBar.jsx
│   ├── NoAdopted.jsx
│   ├── NoPets.jsx
│   ├── PetsAdopted.jsx
│   ├── PetsInAdopt.jsx
│   ├── SectionPetsAdopted.jsx
│   └── SectionPetsInAdopt.jsx
├── css/
├── firebase/
│   ├── config.js
│   └── service.js
├── pages/
│   ├── Home.jsx
│   └── NotFound.jsx
├── reducers/
│   └── reducer.js
├── routes/
│   └── RoutesViews.jsx
├── App.jsx
└── Context.jsx
```

---

## ⚙️ Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/MaxiSoriano70/pf-btech-adoptme.git
cd adopt-me
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Correr en desarrollo

```bash
npm run dev
```

### 5. Deploy a GitHub Pages

```bash
npm run deploy
```

---

## 🔐 Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_FIREBASE_API_KEY` | API Key de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth Domain de Firebase |
| `VITE_FIREBASE_PROJECT_ID` | Project ID de Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage Bucket de Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID de Firebase |

> ⚠️ Nunca subas el archivo `.env` a GitHub. Asegurate de tenerlo en el `.gitignore`.

---

## 📬 Contacto

Desarrollado por **Maximiliano Soriano** 🧑‍💻 
📧 Email: [maxi.soriano.70.23@gmail.com](mailto:maxi.soriano.70.23@gmail.com)
🔗 LinkedIn: [linkedin.com/in/maximilianosoriano](https://www.linkedin.com/in/maximiliano-soriano/)