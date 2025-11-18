# CodeDAM - Plataforma Educativa para Estudiantes de DAM

Una web completa de apuntes para estudiantes de DAM (Desarrollo de Aplicaciones Multiplataforma) en España.

## Características

- **Diseño moderno y responsive** - Adaptado para móvil, tablet y PC
- **Contenido completo** de 1º y 2º de DAM (todas las asignaturas)
- **Sección especial de Inglés Técnico** para programadores
- **Buscador funcional** e intuitivo
- **Optimizado para SEO** y preparado para Google AdSense
- **Navegación clara** y rápida

## Estructura del Proyecto

```
CodeDAM/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos CSS responsive
├── js/
│   └── main.js             # JavaScript (buscador, navegación)
├── pages/
│   ├── 1dam/               # Asignaturas de 1º DAM
│   │   ├── programacion.html
│   │   ├── bases-datos.html
│   │   ├── lenguajes-marcas.html
│   │   ├── entornos-desarrollo.html
│   │   └── sistemas-informaticos.html
│   ├── 2dam/               # Asignaturas de 2º DAM
│   │   ├── acceso-datos.html
│   │   ├── desarrollo-interfaces.html
│   │   ├── programacion-multimedia.html
│   │   ├── programacion-servicios.html
│   │   └── sistemas-gestion.html
│   ├── ingles/             # Inglés Técnico
│   │   └── index.html
│   └── buscar.html         # Página de búsqueda
├── assets/
│   └── images/             # Imágenes del proyecto
└── README.md               # Este archivo
```

## Contenido Incluido

### 1º DAM
1. **Programación (Java)** - POO, estructuras de datos, colecciones, excepciones
2. **Bases de Datos** - SQL, MySQL, diseño de BD, normalización
3. **Lenguajes de Marcas** - HTML5, CSS3, XML, JSON
4. **Entornos de Desarrollo** - Git, IDEs, testing, debugging, metodologías ágiles
5. **Sistemas Informáticos** - Linux, Windows, redes, arquitectura

### 2º DAM
1. **Acceso a Datos** - JDBC, Hibernate, MongoDB, ficheros, persistencia
2. **Desarrollo de Interfaces** - JavaFX, Swing, diseño UI/UX
3. **Programación Multimedia** - Android, Kotlin, desarrollo móvil
4. **Programación de Servicios** - REST APIs, Spring Boot, microservicios, sockets
5. **Sistemas de Gestión Empresarial** - ERP, CRM, Odoo, procesos de negocio

### Recursos Adicionales
- **Inglés Técnico** - Vocabulario por asignatura, errores comunes traducidos, términos de programación

## Cómo Usar

### Opción 1: Abrir Directamente
1. Navega a la carpeta del proyecto
2. Abre `index.html` en tu navegador

### Opción 2: Servidor Local (Recomendado)

**Con Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Con Node.js:**
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar servidor
http-server
```

**Con VS Code:**
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

Luego abre tu navegador en `http://localhost:8000` (o el puerto correspondiente).

## Funcionalidades

### Buscador
- Búsqueda inteligente por palabras clave
- Resultados ordenados por relevancia
- Búsqueda en títulos, descripciones y categorías
- Filtrado automático de contenido

### Navegación
- Menú responsive con dropdown
- Navegación móvil adaptativa
- Breadcrumbs para orientación
- Enlaces internos optimizados

### Diseño
- Mobile-first responsive design
- Tema profesional tech/educativo
- Colores coherentes y accesibles
- Iconos y visualizaciones modernas

## SEO y Optimización

### Meta Tags Incluidos
- Descripción y keywords en todas las páginas
- Open Graph para redes sociales
- Twitter Cards
- Canonical URLs
- Robots meta tags

### Preparación para AdSense
- Estructura HTML semántica
- Espacios designados para anuncios
- Contenido original y valioso
- Navegación clara y UX optimizada

### Performance
- CSS optimizado
- JavaScript modular
- Lazy loading de imágenes
- Código minificable

## Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:

```css
:root {
    --primary-color: #667eea;      /* Color principal */
    --secondary-color: #764ba2;    /* Color secundario */
    --text-primary: #1a202c;       /* Color de texto */
    --bg-primary: #ffffff;         /* Fondo principal */
}
```

### Agregar Contenido
1. Crea un nuevo archivo HTML en la carpeta correspondiente
2. Copia la estructura de una página existente
3. Actualiza el contenido
4. Agrega el enlace en el menú de navegación
5. Actualiza el array `searchData` en `js/main.js`

### Modificar Buscador
Edita el array `searchData` en `js/main.js` para agregar nuevas páginas al buscador.

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript** - Funcionalidad interactiva
- **Google Fonts** - Tipografía Inter

## Compatibilidad

- Chrome/Edge: ✅ Última versión
- Firefox: ✅ Última versión
- Safari: ✅ Última versión
- Opera: ✅ Última versión
- IE11: ⚠️ Funcionalidad limitada (no recomendado)

## Próximas Mejoras

- [ ] Modo oscuro/claro
- [ ] Más ejemplos de código interactivos
- [ ] Sistema de favoritos
- [ ] Historial de búsqueda
- [ ] Ejercicios prácticos
- [ ] Videos tutoriales embebidos
- [ ] Foro de estudiantes
- [ ] Sistema de comentarios

## Contribuir

Este es un proyecto educativo. Para mejoras:

1. Identifica el área a mejorar
2. Realiza los cambios en archivos correspondientes
3. Prueba en diferentes dispositivos y navegadores
4. Documenta los cambios realizados

## Licencia

Este proyecto es de uso educativo y gratuito para estudiantes de DAM en España.

## Contacto

Para preguntas o sugerencias sobre CodeDAM, contacta a través de los canales habituales de tu institución educativa.

---

**CodeDAM** - Desarrollado con dedicación para estudiantes de DAM 🚀

¡Buena suerte con tus estudios!
