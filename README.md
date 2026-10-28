# Herramientas Prolub · app instalable

Página pequeña que convierte el **Centro de Herramientas** (Apps Script) en una app que se instala en computador, Android y iPhone, con nombre e ícono propios.

## Cómo funciona

```
Comercial ──▶ App instalada (esta carpeta, en GitHub Pages)
                 │  1. muestra la pantalla de Prolub
                 │  2. abre la URL /exec del Centro de Herramientas
                 ▼
          Apps Script (Google) ──▶ verifica la cuenta corporativa y la hoja USUARIOS
```

- Aquí **no hay datos ni claves**: solo la página de arranque, los íconos y la URL del Centro.
- El acceso lo sigue controlando Google: sin cuenta corporativa registrada en `USUARIOS`, nadie entra.
- Los cambios que hagas en Apps Script se ven en la app sin tocar nada de esta carpeta.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | Página de instalación (navegador) y arranque de la app (instalada) |
| `config.js` | **Lo único que se edita:** la URL `/exec` y el modo de apertura |
| `manifest.webmanifest` | Nombre, colores e íconos que lee el navegador para instalar |
| `sw.js` | Requisito técnico de instalación; guarda la página de arranque |
| `icons/` | Ícono normal, ícono adaptable de Android (`maskable`), ícono de iPhone y favicon |
| `.nojekyll` | Evita que GitHub Pages procese los archivos |

## Publicar en GitHub Pages (recomendado)

1. En `config.js`, reemplaza `PEGA_AQUI_LA_URL_EXEC_DEL_CENTRO_DE_HERRAMIENTAS` por la URL `/exec` del despliegue (Apps Script → Implementar → Administrar implementaciones).
2. En GitHub, con la cuenta de la empresa, crea un repositorio **público** llamado `herramientas-prolub`. En el plan gratuito, GitHub Pages solo publica repositorios públicos.
3. **Add file → Upload files**: sube todo el contenido de esta carpeta, con la carpeta `icons/` incluida. Haz commit en `main`.
4. **Settings → Pages**: en *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)**, y guarda.
5. En 1–2 minutos queda en `https://<usuario-u-organización>.github.io/herramientas-prolub/`. Marca **Enforce HTTPS** si aparece.
6. En `Codigo.gs`, pega esa URL en `URL_APP_INSTALABLE` y publica una **nueva versión** del despliegue. Así el botón *Instalar app* del Centro lleva a esta página.
7. Prueba la instalación en computador con Chrome o Edge, en un Android con Chrome y en un iPhone con Safari.
8. Comparte el enlace con los comerciales: lo abren una vez, tocan **Instalar app** y listo.

### Dominio propio (opcional)

Si administran el DNS de `prolub.com.co`, pueden usar `herramientas.prolub.com.co`:
1. En el DNS, crea un registro `CNAME` de `herramientas` a `<usuario>.github.io`.
2. En **Settings → Pages → Custom domain**, escribe el dominio.

La URL queda corporativa y, si un día cambian de hosting, el enlace instalado no cambia.

## Seguridad

- **Qué queda público:** esta página, los íconos y la URL `/exec`. Esa URL no da acceso por sí sola: pide cuenta de Google de la organización y estar activo en `USUARIOS`.
- **Nunca subas a este repositorio:** `Codigo.gs`, el ID de la hoja, correos, contraseñas ni archivos de datos.
- Activa la verificación en dos pasos en la cuenta de GitHub, y deja solo a 1–2 personas con permiso de escritura en el repositorio.
- `index.html` solo abre direcciones `https://script.google.com/…`, aunque alguien altere `config.js`.

## Alternativa: Google Cloud (Firebase Hosting)

Úsala si la empresa no permite repositorios públicos.
1. Crea un proyecto de Firebase **aparte** (no el de Adán), por ejemplo `prolub-herramientas`.
2. En el computador, con Node instalado, corre `npm i -g firebase-tools` y luego `firebase login`.
3. Dentro de esta carpeta, corre `firebase init hosting`. Usa `.` como carpeta pública y responde **No** a "single-page app".
4. Corre `firebase deploy`. La app queda en `https://<proyecto>.web.app`, y también admite dominio propio.

## Mantenimiento

- **Cambios en el Centro (Apps Script):** no hay que hacer nada aquí.
- **Cambio de ícono, nombre o colores:** edita los archivos y sube la constante `CACHE` en `sw.js` (por ejemplo `-v2`) para que los equipos tomen la versión nueva.
- **Modo `incrustar`** (en `config.js`): muestra el Centro dentro de la app sin barra del navegador, pero en iPhone y en navegadores que bloquean cookies de terceros puede no iniciar sesión. Úsalo solo si lo probaste en los equipos del equipo comercial.

## Si dice "no se puede instalar"

- La página debe abrirse por **https** (GitHub Pages o Firebase), no como archivo local.
- Ábrela en **Chrome, Edge o Safari**, no dentro de WhatsApp, Gmail u otra app.
- Si ya estaba instalada, el navegador no ofrece instalarla de nuevo: búscala en el inicio o en el escritorio.
