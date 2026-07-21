# El Cangüé — diseño de mejoras posteriores a revisión

Fecha: 2026-07-20

## Objetivo

Resolver los defectos detectados en blog, reservas y traducciones; completar la
captura centralizada de consultas; y mejorar las páginas públicas sin romper la
edición de posts ni los enlaces actuales de WhatsApp.

El trabajo extenderá la arquitectura existente de Next.js App Router, Supabase,
Resend y los componentes UI del proyecto. Las migraciones serán aditivas y cada
dominio se entregará en un commit atómico.

## Estado actual confirmado

- El blog almacena contenido como texto y el admin usa un `textarea`. No existe
  endpoint, acción ni bucket configurado para subir imágenes desde el editor.
- Los enlaces del admin apuntan a `/blog/:slug`, pero las notas públicas viven en
  `/noticias/:slug` y `/:locale/noticias/:slug`.
- `blog_posts` no registra visualizaciones.
- Reservas ya persiste solicitudes y tiene correos con Resend. El cambio de
  estado dispara el correo de confirmación sin esperarlo ni exponer su resultado,
  y la interfaz no muestra errores de la acción.
- No existe alta manual de reservas ni suite de tests.
- El formulario de Eventos no tiene handlers. Contacto simula un envío sin
  persistencia. Destination Wedding no tiene formulario.
- No existe una entidad de mensajes ni una sección correspondiente en el admin.
- Las páginas Contacto, Posada, Eventos, Destination Wedding y Rosedal tienen
  contenido español hardcodeado. Sus wrappers localizados validan el locale pero
  renderizan el mismo contenido, por lo que el selector solo cambia la URL.
- Reviews consulta Google Places mediante `/api/reviews` y conserva reseñas
  estáticas como fallback.
- El footer enlaza a la portada genérica de Instagram. La cuenta oficial enlazada
  por el sitio anterior es `https://www.instagram.com/estanciaelcangue/`.

## Diseño técnico

### 1. Blog

Se incorporará TipTap como editor controlado con una barra para encabezados,
párrafos, negrita, cursiva, enlaces, familias y tamaños de fuente, imágenes y
video embebido. El campo oculto `content` seguirá enviándose a las server actions
existentes, preservando el flujo de creación y edición. El editor detectará el
contenido histórico en texto plano y lo convertirá a párrafos al cargarlo; los
posts nuevos se almacenarán como HTML.

Las imágenes se subirán desde una route handler autenticada. La ruta validará
tipo y tamaño, generará nombres no controlados por el usuario y guardará los
archivos en un bucket público `blog-media`. Una migración creará el bucket y sus
políticas para lectura pública y escritura de administradores/editores. La misma
subida servirá para imagen destacada y contenido.

La vista pública sanitizará el HTML con una lista explícita de elementos,
atributos y proveedores de video admitidos. El texto histórico seguirá
renderizándose como párrafos. La interfaz pública mejorará jerarquía, ancho de
lectura, metadatos y contenido multimedia.

Una migración agregará `view_count bigint not null default 0` y una función SQL
`increment_blog_post_views(post_id uuid)` que incrementará de forma atómica solo
posts publicados. Una route handler pública llamará esa función una vez montada
la nota. El valor será informativo, no analítica única por visitante.

Los enlaces del admin se corregirán a `/noticias/:slug`, mostrando vista pública
solo para posts publicados. Las rutas revalidadas incluirán versiones localizadas.

### 2. Reservas

Se extraerán esquemas y tipos compartidos para validar fechas, habitación y
configuración de camas. El admin tendrá un formulario de alta manual con nombre
operativo opcional derivado del email cuando no se ingrese, email, teléfono,
habitación, ingreso, salida y configuración. Las reservas manuales comenzarán en
estado pendiente para pasar por el mismo control que las solicitudes web.

La acción de estado validará identificador y transición, verificará que la
reserva exista, persistirá primero el estado y ejecutará el correo con `await` y
manejo explícito de error. Un fallo de email no revertirá el cambio ni producirá
una excepción 500: se devolverá una advertencia visible. Confirmar enviará el
detalle al huésped; rechazar y cancelar enviarán una notificación de estado. El
admin verá éxito, advertencia o error sin depender de una recarga implícita.

El correo de nueva solicitud ya existente se conservará y se usará también para
el alta manual, incluyendo email, teléfono, habitación, fechas y configuración.
El HTML de emails escapará datos ingresados por usuarios.

Los tests cubrirán payloads válidos e inválidos y las transiciones a confirmada,
rechazada y cancelada, incluyendo errores de base y correo. Las dependencias de
Supabase y Resend quedarán detrás de funciones inyectables o módulos mockeables.

### 3. Mensajes y formularios

Una migración creará `contact_messages` con `id`, `origin`, `name`, `email`,
`phone`, `subject`, `message`, `metadata`, `is_read` y timestamps. RLS permitirá
inserción pública únicamente mediante una función SQL acotada y lectura/gestión a
administradores y editores. El endpoint aplicará Zod, límites de longitud y un
honeypot para reducir spam básico.

Un formulario reutilizable conectará Contacto, Eventos y Destination Wedding a
la misma acción. Cada uso fijará el origen en servidor y guardará campos
específicos en `subject` o `metadata`. La interfaz mostrará estados de envío,
errores y confirmación sin alertas del navegador.

El admin agregará “Mensajes” a la navegación y una bandeja ordenada por fecha,
con origen, remitente, asunto, contenido, leído/no leído y detalle de metadatos.
No se implementarán respuestas ni borrado en esta etapa.

### 4. Traducciones

Los diccionarios existentes se ampliarán con copias de Posada, Contacto,
Eventos, Destination Wedding, Rosedal, formularios y mensajes de validación para
español, inglés, francés y portugués. Las páginas base recibirán `locale` y
`dictionary` de manera explícita, siguiendo el patrón ya usado por Home y Blog.
Los wrappers localizados pasarán esos valores en lugar de reutilizar contenido
español. La ruta sin prefijo continuará usando español.

El selector de idioma mantendrá query y hash cuando corresponda, y se comprobarán
los enlaces internos localizados en todas las páginas públicas.

### 5. Eventos, Destination Wedding y Rosedal

Eventos se reorganizará con un hero editorial, bloques de celebraciones y
corporativos, capacidades/servicios y CTA con formulario conectado. Se
reutilizarán colores, tipografías y patrones existentes.

Destination Wedding tendrá narrativa más completa, galería editorial, servicios,
proceso y formulario. El acordeón manual se reemplazará por el componente Radix
existente, con navegación por teclado, estados consistentes y animación accesible.
No se presentará un botón de video si no existe un video reproducible.

Rosedal declarará un catálogo de variedades con identidad estable, nombre,
descripción e imagen por ficha. Inicialmente podrá reutilizar las fotos actuales,
pero cada variedad tendrá una ruta de imagen independiente para permitir el
reemplazo posterior sin cambiar el layout ni el código del componente.

### 6. Rendimiento, navegación y reviews

Se auditarán las imágenes visibles y se definirán `sizes`, `quality`, `priority`
o lazy loading según posición. Solo el recurso LCP tendrá prioridad/preload; el
resto cargará diferido. Los recursos remotos se limitarán en `next.config` y las
imágenes locales demasiado grandes se convertirán a WebP/AVIF cuando la reducción
sea material sin degradación visible. El video de Posada mantendrá
`preload="metadata"` y una imagen poster optimizada.

Instagram se actualizará a la cuenta oficial confirmada. No se modificarán URLs,
componentes ni comportamiento de WhatsApp.

Se agregará documentación del módulo de Google Reviews: endpoint actual,
variables requeridas, fallback, caché, límites de Places API y decisión pendiente
sobre fuente, moderación y diseño. La sección no se eliminará ni se rediseñará sin
esa definición.

## Manejo de errores y seguridad

- Toda entrada pública se validará en servidor y tendrá límites de longitud.
- HTML de blog se sanitizará al renderizar; URLs y embeds se restringirán a
  protocolos/proveedores seguros.
- Los uploads rechazarán archivos no imagen, excesivos y nombres peligrosos.
- Los emails escaparán contenido del usuario.
- Los errores operativos se registrarán en servidor y devolverán mensajes útiles
  sin exponer detalles internos.
- Las políticas RLS mantendrán lectura administrativa y escrituras públicas
  mínimas y explícitas.

## Verificación

- Tests automatizados de reserva: creación, validación y tres estados.
- Tests de validación para mensajes y contenido del blog donde sean útiles.
- `npm run lint` y `npm run build` después de cada grupo de cambios.
- Verificación en navegador de creación/edición de post, upload, preview, vistas,
  alta manual, estados de reserva, formularios, bandeja admin, acordeón y selector
  de idiomas.
- Revisión específica de que edición de posts preexistentes y WhatsApp no cambien.

## Secuencia de commits

1. `docs: define site review improvement design`
2. `fix(blog): repair media uploads and public preview`
3. `feat(blog): add rich editor and post view counts`
4. `fix(reservations): harden status transitions and notifications`
5. `feat(reservations): add manual admin creation`
6. `test(reservations): cover reservation status workflows`
7. `feat(messages): centralize public contact submissions`
8. `fix(i18n): translate all public page content`
9. `feat(events): complete events and destination wedding pages`
10. `feat(rosedal): prepare variety-specific imagery`
11. `perf(site): optimize imagery and fix Instagram navigation`
12. `docs(reviews): document Google reviews integration status`

## Decisiones de producto pendientes

- Las imágenes reales y definitivas para cada variedad del Rosedal.
- La política futura de Google Reviews: API en vivo, selección editorial o
  eliminación. Hasta entonces se mantiene la implementación actual con fallback.
- El remitente definitivo de Resend requiere que el dominio esté verificado y que
  `RESEND_FROM`/`ADMIN_EMAIL` estén configurados en producción.

