# Barbershop Frontend

Sistema de gestión de citas para barbería desarrollado con React, TypeScript y Material-UI.

## Características Implementadas

- 🔐 **Sistema de Autenticación**
  - Registro de usuarios
  - Login con JWT
  - Persistencia de sesión
  - Protección de rutas por roles

- 🛠️ **Gestión de Servicios**
  - Listado de servicios disponibles
  - Detalles de precios y duraciones
  - Vista responsive y moderna

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Material-UI
- Redux Toolkit
- React Router DOM
- Axios

## Requisitos Previos

- Node.js >= 16
- npm >= 8

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd barbershop-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env:
```bash
VITE_API_URL=http://localhost:8000/api
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas/Vistas principales
├── services/      # Servicios de API
├── store/         # Estado global (Redux)
├── hooks/         # Custom hooks
├── layouts/       # Layouts reutilizables
└── routes/        # Configuración de rutas
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run lint`: Ejecuta el linter
- `npm run preview`: Vista previa de la build de producción

## Desarrollo

El proyecto utiliza Git Flow para el control de versiones:

- `main`: Rama de producción
- `develop`: Rama de desarrollo
- `feature/*`: Ramas de características
- `release/*`: Ramas de release
- `hotfix/*`: Ramas de correcciones urgentes

## Estado Actual

- ✅ Configuración inicial completada
- ✅ Sistema de autenticación implementado
- ✅ Protección de rutas por roles
- ✅ Gestión de servicios básica
- 🚧 Gestión de barberos (en progreso)
- 🚧 Sistema de citas (pendiente)

## Próximos Pasos

1. Implementar gestión de barberos
2. Desarrollar sistema de citas
3. Agregar panel de administración
4. Implementar notificaciones

## Contribuir

1. Crear una nueva rama feature desde develop:
```bash
git flow feature start nombre-feature
```

2. Realizar cambios y commit:
```bash
git add .
git commit -m "feat: descripción del cambio"
```

3. Finalizar feature:
```bash
git flow feature finish nombre-feature
```

4. Subir cambios:
```bash
git push origin develop
```

## Licencia

Este proyecto está bajo la Licencia MIT.
