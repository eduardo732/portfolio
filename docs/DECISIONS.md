# Decisiones de arquitectura

## 2026-08-02 — Migrar a Astro + React islands (en vez de reescribir en Next.js)

### Contexto

El portafolio está construido en Astro (sitio estático) + Tailwind CSS + TypeScript,
usando `typed.js` para el efecto de escritura del hero y `aos` para animaciones al
hacer scroll. Eduardo quiere practicar React y de paso renovar el diseño del sitio.

### Opciones consideradas

1. **Reescribir todo en Next.js.** Da práctica completa de React (componentes,
   hooks, routing, App Router) y mantiene generación estática (SSG) para SEO
   y velocidad. Costo: reescritura completa del sitio, mayor superficie de
   cosas nuevas que aprender a la vez (routing de Next, data fetching, etc.)
   y riesgo de romper funcionalidad que ya está andando (i18n, animaciones).

2. **Reescribir en un SPA con Vite + React puro.** Practica React "a secas"
   sin conceptos de framework extra. Costo: se pierde el renderizado estático
   que tiene el sitio hoy, lo que perjudica SEO y tiempo de carga inicial —
   malo para un portafolio, que vive de que lo indexen bien y cargue rápido.

3. **Mantener Astro y agregar componentes React como "islands"
   (`@astrojs/react`).** El sitio sigue siendo HTML estático por defecto
   (rápido, buen SEO) y los componentes interactivos que se construyan en
   React se hidratan solo donde se necesitan. Permite practicar React de
   forma incremental sin reescribir lo que ya funciona.

### Decisión

Se elige la **opción 3: Astro + React islands**.

### Razones

- El sitio ya funciona bien como estático; no hay necesidad real de
  server-side rendering ni de un framework full-stack como Next.js para un
  portafolio personal.
- Permite practicar React de forma progresiva (un componente a la vez) en
  lugar de una reescritura de una sola vez, de mayor riesgo.
- Astro soporta islands con React de forma nativa vía `@astrojs/react`, así
  que no hay que renunciar a Tailwind, i18n, ni al resto de la config actual.
- Menor riesgo de dejar el sitio roto a mitad de camino comparado con una
  migración completa a otro framework.

### Consecuencias

- Se agrega la integración `@astrojs/react` (y `react`, `react-dom` como
  dependencias) al proyecto.
- Los componentes `.astro` existentes se mantienen tal cual; los nuevos
  componentes interactivos (o los que se rediseñen y necesiten estado/
  interactividad) se escriben en `.tsx` y se hidratan con las directivas de
  Astro (`client:load`, `client:visible`, etc.) según se necesite.
- El rediseño visual del sitio es una decisión separada — ver sección
  siguiente cuando se elija dirección visual.

## 2026-08-02 — Dirección visual: "Plano técnico" (blueprint)

### Contexto

Con la arquitectura ya decidida (ver arriba), se necesitaba elegir una
dirección visual para el rediseño. Se presentaron 3 propuestas como mockup
comparativo (artifact con contenido real del sitio):

1. **Panel de control** — estética de dashboard de observabilidad,
   monospace, indicadores de estado tipo uptime.
2. **Plano técnico** — estética de diagrama de arquitectura/blueprint:
   papel cuadriculado, nodos conectados, notación de anotación técnica.
   La trayectoria profesional se representa como un flujo de sistemas
   conectados en vez de una lista.
3. **Mate & código** — dirección más cálida y personal, paleta de yerba/
   cobre, retrato en primer plano, tono editorial.

### Decisión

Se elige la **opción 2: Plano técnico (blueprint)**.

### Razones

- Encaja con el trabajo real de Eduardo: migraciones, diseño de
  arquitecturas desacopladas, sistemas de misión crítica — el lenguaje
  visual de "diagrama técnico" refleja el tipo de trabajo, no es
  decorativo.
- Permite representar la línea de tiempo de experiencia como un diagrama
  de sistemas conectados (nodos + conectores), coherente con
  `experience.jobs` en los JSON de i18n en vez de forzar una lista genérica.

### Consecuencias

- El rediseño visual (paleta blueprint: azul profundo, grid de fondo, cian
  de acento, anotaciones tipo callout; tipografía técnica/mono para
  labels) se implementa en los componentes existentes y, donde haga sentido
  practicar interactividad (por ejemplo el diagrama de experiencia), como
  React island nuevo según la decisión de arquitectura de arriba.
- Pendiente para la próxima sesión: implementar el rediseño en
  `Layout.astro`, `Header.astro`, `Experience.astro`/`ExperienceItem.astro`
  y `AboutMe.astro` siguiendo esta dirección.

### Implementación (2026-08-03)

Valores concretos elegidos para la paleta blueprint, agregados como tokens
en `tailwind.config.mjs` (`theme.extend.colors.blueprint`):

| Token               | Valor      | Uso                                   |
| ------------------- | ---------- | -------------------------------------- |
| `blueprint.bg`       | `#0a0f1e`  | Fondo base del sitio                   |
| `blueprint.panel`    | `#101a30`  | Fondo de paneles/tarjetas/nodos        |
| `blueprint.line`     | `#1e3a5f`  | Bordes y líneas conectoras             |
| `blueprint.accent`   | `#22d3ee`  | Acento cian (estado activo, hover)     |
| `blueprint.accent2`  | `#0ea5e9`  | Acento secundario (hover de links)     |

El grid de fondo (papel cuadriculado) se implementa como CSS puro en
`Layout.astro` con `repeating-linear-gradient` (líneas cian al 6-12% de
opacidad, menores cada 32px y mayores cada 160px), no como imagen ni
librería adicional.

El diagrama de experiencia (`Experience.astro`/`ExperienceItem.astro`) se
reemplaza por un componente React nuevo, `ExperienceDiagram.tsx`, montado
como island con `client:visible` (está debajo del fold, no bloquea el
render inicial). Renderiza los trabajos de `t('experience.jobs')` como
nodos de sistema conectados por líneas verticales, con el trabajo más
reciente marcado `ACTIVE` (indicador pulsante) y estado de hover manejado
con `useState` para resaltar nodo/conector — la interactividad real
(no solo estética) es lo que justifica usarlo como practica de React en
vez de dejarlo en Astro puro.

Fuera de alcance en esta pasada: `Footer.astro`, `Projects.astro` y
`Articles.astro` no se tocan directamente (no estaban en el pendiente);
heredan color de fondo/texto global desde `Layout.astro`.

**Nota:** `@astrojs/react` se había agregado como `^6.0.2`, versión que
requiere APIs internas de middleware que no existen en Astro 4.16 (el
proyecto sigue en Astro 4, no se decidió upgrade a Astro 5+ en esta
sesión) — esto rompía `astro dev` con `MiddlewareCantBeLoaded`. Se bajó a
`@astrojs/react@^4.4.2`, que sí soporta Astro 4.16 y React 19 estable.
