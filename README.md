# Barbershop Frontend

Sistema de gestión de citas para barberías - Frontend en React

## 🚀 Tecnologías

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Git

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone git@github.com:yarlinson/barbershop-frontend.git
cd barbershop-frontend
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Crear archivo .env:
```bash
cp .env.example .env
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## 📁 Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos (imágenes, etc.)
├── components/     # Componentes reutilizables
├── hooks/         # Custom hooks
├── interfaces/    # TypeScript interfaces
├── layouts/       # Layouts de la aplicación
├── pages/         # Páginas/Vistas
├── routes/        # Configuración de rutas
├── services/      # Servicios API
├── store/         # Estado global (Redux)
└── utils/         # Utilidades y helpers
```

## 🔍 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter
- `npm run test`: Ejecuta los tests

## 🔐 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000/api
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🔗 Enlaces Relacionados

- [Backend Repository](https://github.com/yarlinson/barbershop-backend)
- [Documentación de la API](http://localhost:8000/api/docs/)

## 👥 Autores

- **Yarlinson Matos** - *Desarrollo Inicial* - [yarlinson](https://github.com/yarlinson)

## 📞 Soporte

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.
