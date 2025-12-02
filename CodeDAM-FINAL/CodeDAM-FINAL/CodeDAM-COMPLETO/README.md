# CodeDAM - Rediseño Completo 🚀

## 📋 Descripción

Rediseño moderno y profesional de CodeDAM inspirado en plataformas tech líderes como Racks Labs, Racks Academy y MoureDev.

## ✨ Características Principales

### 🎨 Diseño Visual
- **Gradientes modernos** con colores vibrantes y profesionales
- **Animaciones suaves** en scroll y hover
- **Tipografía mejorada** con Inter y JetBrains Mono
- **Efectos glassmorphism** y sombras sutiles
- **Background animado** con orbes de gradiente
- **Diseño responsive** optimizado para móvil, tablet y desktop

### 🤖 AstroBot 2.0 - Premium Edition
- **Diseño completamente rediseñado** con más detalles y calidad
- **Movimientos fluidos** con física realista
- **Sistema de arrastrar y soltar** (drag & drop)
- **Animación de parpadeo** automática
- **Burbujas de mensaje** con animaciones suaves
- **Sistema de "poop binario"** mejorado
- **Dos modos**: Amigable 😊 y Sargento 😤
- **Botón de cambio de modo** flotante
- **Efectos de hover** y sombras dinámicas
- **Partículas animadas** de levitación

### 🎯 Funcionalidades
- **Búsqueda inteligente** de cursos con highlighting
- **Navegación suave** con scroll animations
- **Tarjetas de curso** interactivas con efectos hover
- **Tags de tecnologías** para cada curso
- **Hero section** impactante con código animado
- **Estadísticas visuales** en cards
- **Footer completo** con enlaces organizados
- **CTA section** llamativa con gradiente

## 📁 Estructura del Proyecto

```
CodeDAM-Redesign/
├── index.html          # Página principal rediseñada
├── css/
│   └── styles.css      # Estilos modernos con variables CSS
├── js/
│   ├── main.js         # JavaScript principal (scroll, búsqueda)
│   └── astro-bot.js    # AstroBot 2.0 Premium
└── README.md           # Este archivo
```

## 🚀 Instalación

1. **Descarga la carpeta completa** `CodeDAM-Redesign`

2. **Mantén la estructura de carpetas**:
   - NO cambies las rutas de los archivos CSS y JS
   - La estructura debe quedar así:
   ```
   Tu-Carpeta-CodeDAM/
   ├── index.html
   ├── css/
   │   └── styles.css
   └── js/
       ├── main.js
       └── astro-bot.js
   ```

3. **Copia las páginas de asignaturas**:
   - Si ya tienes páginas creadas en `pages/1dam/` y `pages/2dam/`
   - Cópialas a la nueva carpeta del proyecto
   - Los enlaces ya están configurados

4. **Abre** `index.html` en tu navegador

## 💡 Características Técnicas

### CSS Moderno
- Variables CSS personalizables
- Flexbox y CSS Grid
- Animaciones con `@keyframes`
- Transiciones suaves
- Media queries para responsive
- Gradientes múltiples
- Filtros y efectos visuales

### JavaScript Vanilla
- Clases ES6
- IntersectionObserver para scroll animations
- RequestAnimationFrame para animaciones fluidas
- LocalStorage para persistencia del modo del bot
- Event delegation
- Sistema de física básica para movimientos

### Optimizaciones
- Código limpio y comentado
- Sin dependencias externas (excepto Google Fonts)
- Performance optimizado
- Carga rápida
- Responsive desde 320px hasta 4K

## 🎨 Personalización

### Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --accent-blue: #3b82f6;
    --accent-purple: #8b5cf6;
    /* ... más variables */
}
```

### AstroBot
- **Cambiar modo**: Click en el botón flotante (abajo derecha)
- **Mover el bot**: Arrastra y suelta
- **Ver mensajes**: Click en el bot
- El modo se guarda automáticamente en localStorage

### Fuentes
Actualmente usa:
- **Inter**: Para texto general
- **JetBrains Mono**: Para código

Puedes cambiarlas editando el `<link>` de Google Fonts en `index.html`

## 📱 Responsive

Breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Mobile pequeño**: < 480px

## 🔧 Próximas Mejoras (Opcionales)

Si quieres mejorar aún más:
1. Añadir un menú hamburguesa funcional para móvil
2. Implementar modo oscuro
3. Añadir más animaciones en el AstroBot
4. Sistema de filtrado de cursos por categoría
5. Integración con backend para contenido dinámico

## ⚠️ Notas Importantes

1. **Mantén la estructura de carpetas** tal cual está
2. Las rutas de los CSS y JS son relativas (`css/`, `js/`)
3. El AstroBot guarda su modo en localStorage
4. Todas las animaciones usan CSS y JS vanilla (nada de librerías externas)

## 🎓 Tecnologías Utilizadas

- HTML5 semántico
- CSS3 (variables, Grid, Flexbox, animaciones)
- JavaScript ES6+ (clases, arrow functions, etc.)
- SVG para el AstroBot
- Google Fonts (Inter, JetBrains Mono)

## 📞 Soporte

Si tienes problemas:
1. Verifica que la estructura de carpetas sea correcta
2. Abre la consola del navegador (F12) para ver errores
3. Asegúrate de que todos los archivos se hayan copiado correctamente

---

**Hecho con 💙 por Claude para CodeDAM**

¡Disfruta tu nueva página! 🚀
