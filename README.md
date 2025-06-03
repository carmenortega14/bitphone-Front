# BitPhone

BitPhone es una tienda online de smartphones y accesorios desarrollada con Angular. Permite a los usuarios explorar productos, gestionar un carrito de compras, realizar pedidos y a los administradores gestionar el catálogo, marcas y categorías. Incluye autenticación con Keycloak y un panel de administración.

## Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración](#configuración)
- [Uso](#uso)
- [Testing](#testing)
- [Dependencias Principales](#dependencias-principales)
- [Recursos Adicionales](#recursos-adicionales)

---

## Características

- **Catálogo de productos:** Visualización de smartphones y accesorios por categorías y marcas.
- **Carrito de compras:** Añadir, modificar y eliminar productos del carrito.
- **Pedidos:** Realización y visualización de historial de compras.
- **Panel de administración:** Gestión de productos, marcas y categorías.
- **Autenticación:** Integración con Keycloak.
- **Newsletter:** Suscripción a novedades.
- **Responsive:** Diseño adaptativo para dispositivos móviles y escritorio.
- **Alertas y modales:** Notificaciones amigables con SweetAlert2.

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios, guards, interceptores
│   ├── environments/   # Configuración de entornos
│   ├── features/       # Módulos de funcionalidades (adminpanel, carrito, smartphones, etc.)
│   ├── shared/         # Componentes reutilizables, modelos, pipes, directivas
│   ├── assets/         # Imágenes y recursos estáticos
│   └── styles/         # Estilos globales
├── assets/             # Archivos estáticos públicos
├── styles/             # Estilos globales SCSS
└── main.ts             # Punto de entrada de la aplicación
```

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd BitPhone
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura el entorno:**
   - Edita `src/app/environments/environment.ts` para ajustar la URL de la API y Keycloak si es necesario.

---

## Scripts Disponibles

- **Desarrollo:**
  ```bash
  ng serve
  ```
  Accede a [http://localhost:4200/](http://localhost:4200/)

- **Build producción:**
  ```bash
  ng build
  ```

- **Tests unitarios:**
  ```bash
  ng test
  ```

- **Tests end-to-end:**
  ```bash
  ng e2e
  ```

---

## Configuración

- **API REST:** Por defecto apunta a `http://localhost:3000`. Modifica en `environment.ts` si tu backend está en otra URL.
- **Keycloak:** Configura los datos de tu servidor Keycloak en `environment.ts`.

---

## Uso

- **Usuarios:** Pueden explorar productos, añadir al carrito, comprar y ver historial de pedidos.
- **Administradores:** Acceden al panel `/adminpanel` para gestionar productos, marcas y categorías.
- **Newsletter:** Suscripción disponible en el footer y sección dedicada.

---

## Dependencias Principales

- [Angular 19.x](https://angular.io/)
- [Keycloak Angular](https://www.npmjs.com/package/keycloak-angular)
- [SweetAlert2](https://sweetalert2.github.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [RxJS](https://rxjs.dev/)
- [ngx-pagination](https://www.npmjs.com/package/ngx-pagination)

---

## Recursos Adicionales

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Documentación oficial de Angular](https://angular.io/docs)
- [Keycloak Documentation](https://www.keycloak.org/documentation)

---

## Licencia

Este proyecto es solo para fines educativos y de demostración.