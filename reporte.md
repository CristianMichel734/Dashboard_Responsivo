# Reporte Técnico
**Proyecto:** Dashboard SPA — Responsivo   
**Fecha:** Noviembre 2026  

---

## 1. Introducción y Alcance del Documento

Este reporte técnico muestra como se ve y funciona la página de monitoreo de servidores. Se auditará y demostrará que se cumplan las especificaciones de interfaz, adaptando todo al perfil técnico de un ingeniero en DevOps.

---

## 2. Evidencia de la Estrategia Mobile-First a Desktop

La arquitectura fue construida con el enfoque Mobile-first, haciendo que la pantalla se adapte a diferentes resoluciones de manera sencilla mediante el uso de Media Queries.

### 2.1. Vista Móvil (< 768 px)
En dispositivos móviles, la interfaz simplifica su carga visual:
- La **Zona 1 (Sidebar)** permanece oculta mediante una barra lateral retráctil que se activa únicamente a través del menú de tipo hamburguesa (`☰`).
- La **Zona 2 (Workspace)** apila las tarjetas de métricas en una única columna  para facilitar la navegación vertical continua.
- Las zonas de toque cumplen con el área mínima recomendada de $44 \times 44\text{ px}$.

### 2.2. Vista Escritorio / Monitor Ultra-Wide (≥ 1024 px)
Al escalar la resolución a monitores de escritorio ($1920 \times 1080\text{ px}$):
- La **Zona 1 (Sidebar)** se vuelve persistente a la izquierda con un ancho fijo de $260\text{ px}$.
- La **Zona 2** activa el patrón **Bento Grid**, distribuyendo métricas clave (CPU, RAM, Red) en una cuadrícula asimétrica donde la tarjeta *Hero* abarca 2 columnas para gráficos ampliados.
- Se mantiene el encabezado superior (*Header*) alineado con la retícula principal mediante la regla `grid-template-areas`.

> **[ CAPTURA DE EVIDENCIA 2.2 ]**  
> *Inserte aquí la captura de pantalla de la pantalla completa en escritorio con el patrón Bento Grid y la barra lateral persistente.*

---

## 3. Demostración del Modo Oscuro Nativo

El sistema incorpora un esquema de color dual definido mediante **Variables CSS (`:root`)**, soportando conmutación manual y detección automática de preferencia del sistema operativo (`prefers-color-scheme`).

```css
/* Tokenización de variables para modo oscuro/claro */
:root {
  --bg-main: #0f172a;
  --bg-card: #1e293b;
  --text-primary: #f8fafc;
  --accent-cyan: #38bdf8;
}

[data-theme="light"] {
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --text-primary: #0f172a;
  --accent-cyan: #0284c7;
}
```


---

## 4. Auditoría Visual de los 5 Estados de Control

Para evitar carga cognitiva y evitar errores accidentales, cada componente interactivo de la interfaz implementa 5 estados visuales:

| Estado | Descripción del Comportamiento Visual | Código / Token Aplicado |
| :--- | :--- | :--- |
| **1. Default** | Estado base del botón/input con alto contraste sobre fondo oscuro. | `background-color: #0284c7; color: #ffffff;` |
| **2. Hover** | Elevación sutil o aclarado del tono al superponer el puntero. | `background-color: #0ea5e9; cursor: pointer;` |
| **3. Focus** | Indicador visual claro para navegación por teclado (Accesibilidad WCAG). | `outline: 2px solid #38bdf8; outline-offset: 2px;` |
| **4. Disabled** | Reducción de opacidad y bloqueo de interacción cuando no se cumple la condición. | `opacity: 0.4; cursor: not-allowed;` |
| **5. Loading** | Ocultamiento del texto, despliegue de spinner animado y bloqueo de clics repetidos. | `pointer-events: none; animation: spin 0.6s infinite;` |

---

## 5. Tabla Checklist: Las 5 Dimensiones del Diseño de Interacción (IxD)

A continuación se detalla el cumplimiento práctico de las 5 dimensiones de IxD dentro de la Single Page Application:

| Dimensión | Requisito Evaluado | Implementación en el Dashboard SPA | Estado |
| :--- | :--- | :--- | :---: |
| **1D - Palabras** | Microcopia clara y directa. | Botones de acción directos ("Reiniciar Instancia", "Filtrar") y advertencias explícitas de interrupción de servicio. | Cumplido |
| **2D - Repr. Visuales** | Jerarquía tipográfica y color funcional. | Uso semántico del color (Verde = Ok, Rojo = Destructivo, Cyan = Activo) e iconos vectoriales universales. | Cumplido |
| **3D - Objetos Físicos** | Dimensionamiento para táctil y mouse. | Targets táctiles en móvil de $\ge 44 \times 44\text{ px}$ y controles compactos en escritorio para puntero de precisión. | Cumplido |
| **4D - Tiempo** | Transiciones y estados asíncronos. | Transiciones calibradas entre $200\text{ ms}$ y $300\text{ ms}$ (`cubic-bezier`), más spinners de carga en peticiones de red. | Cumplido |
| **5D - Comportamiento** | Reglas de confirmación y accesibilidad. | Cierre de modales con tecla Esc, trampa de foco por teclado y validación de doble paso escribiendo la cadena del nodo. | Cumplido |

---

## 6. Conclusiones

La auditoría confirma que la página desarrollada cumple con todos los requisitos técnicos planteados en la rúbrica. La separación en 3 zonas, combinada con maquetación bidimensional con CSS Grid y la gestión estricta de estados y accesibilidad hacen que la herramienta sea robusta, confiable y segura para la operación de una infraestructura en la nube en tiempo real.