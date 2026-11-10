# Pruebas y Ensayos ETED

App de campo para registrar pruebas en subestaciones (Depto. Pruebas & Ensayos, ETED): malla de tierra, protecciones mecánicas, DGA y rigidez dieléctrica, interruptores, transformadores, levantamiento de equipos, subestación móvil, averías, combustible y dietas.

Se publica con GitHub Pages y se puede instalar en el celular. Después de abrirla una vez con internet, funciona sin señal.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (v55) |
| `manifest.webmanifest` | Nombre, colores e íconos para instalarla como app |
| `sw.js` | Guarda la app en el teléfono para usarla sin conexión |
| `icons/` | Íconos PNG (Android, iPhone, escritorio) |
| `.nojekyll` | Le indica a GitHub Pages que publique los archivos tal cual |

El backend (Google Apps Script v30) no va en este repositorio. Se mantiene en Apps Script.

## Publicar una versión nueva

1. Reemplaza `index.html` por la versión nueva (con ese mismo nombre).
2. En `sw.js`, cambia `var CACHE = 'eted-app-v48';` por el número nuevo, por ejemplo `v49`.
3. Sube ambos cambios (commit). En uno o dos minutos la página queda actualizada y los celulares toman la versión nueva la próxima vez que abran la app con internet.

## Notas

- Los informes guardados localmente viven en el navegador de cada teléfono, ligados a la dirección de la app. Si se cambia la dirección, hay que pasarlos con *Diagnóstico → Exportar respaldo / Importar respaldo*.
- Los destinatarios de correo están definidos en el Apps Script (`RECIPIENTS`), no en este código.
