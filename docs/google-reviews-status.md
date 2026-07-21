# Estado de Google Reviews

Fecha de revisión: 2026-07-20

## Implementación actual

- La home renderiza `TestimonialsSection` con tres reseñas editoriales como
  fallback inmediato.
- En el navegador se consulta `GET /api/reviews`.
- El endpoint usa Google Places Details con `GOOGLE_PLACES_API_KEY` y
  `GOOGLE_PLACE_ID`, solicita las reseñas más recientes en español y cachea la
  respuesta de Google durante 24 horas.
- Si Google devuelve reseñas con texto, reemplazan el fallback. Si faltan las
  variables, Google falla o no hay textos, la sección conserva el fallback.
- Las fotos de perfil remotas se sirven mediante `next/image` y el host de Google
  está autorizado en `next.config.mjs`.

## Dependencias operativas

- `GOOGLE_PLACES_API_KEY` debe tener habilitada la API correspondiente, límites
  y facturación válidos.
- `GOOGLE_PLACE_ID` debe apuntar a la ficha oficial de Estancia El Cangüé.
- Places Details decide qué reseñas entrega y no garantiza un listado completo.

## Riesgos y límites conocidos

- Las reseñas editoriales de fallback se presentan actualmente dentro de una
  sección rotulada como Google. Antes de producción debe confirmarse si esos
  textos provienen efectivamente de la ficha y si se conserva esa atribución.
- No hay moderación, selección manual ni persistencia local de reseñas.
- La sección depende de una API con costo y cuota, aunque el caché reduce llamadas.

## Decisión de producto pendiente

Definir una de estas estrategias antes de cambiar o eliminar la sección:

1. Mantener Google Places en vivo y usar fallback solo como contingencia.
2. Mantener una selección editorial verificable y actualizarla manualmente.
3. Diseñar una combinación con atribución distinta para cada fuente.

Hasta que exista esa definición, la sección y su fallback permanecen activos.
