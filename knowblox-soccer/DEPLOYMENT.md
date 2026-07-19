# Guía de Publicación y Despliegue para KNOWBLOX PWA

El prototipo de **KNOWBLOX** está estructurado como una aplicación web estática pura (HTML, CSS y JS), lo que significa que **no requiere ningún servidor backend dinámico**. Puedes publicarlo de forma 100% gratuita en cuestión de minutos.

A continuación, tienes las tres mejores opciones para subir tu juego a internet:

---

## Opción 1: Despliegue con Vercel (Recomendado - 2 minutos)
Vercel es ideal para aplicaciones frontend, ofrece HTTPS automático (esencial para PWA) y es extremadamente rápido.

1. Regístrate gratis en [Vercel](https://vercel.com).
2. Instala la herramienta de Vercel en tu terminal o simplemente usa su interfaz web:
   * **Desde la web:** Conecta tu cuenta de GitHub, crea un nuevo proyecto e importa el repositorio de KNOWBLOX.
   * **Desde la terminal (CLI):**
     ```bash
     npm install -g vercel
     vercel
     ```
     *(Sigue los pasos interactivos en pantalla aceptando los valores predeterminados. ¡Listo! Te dará un enlace público HTTPS).*

---

## Opción 2: GitHub Pages (Ideal si usas Git - 3 minutos)
Si tu código está en un repositorio de GitHub, puedes alojarlo directamente en los servidores de GitHub gratis.

1. Crea un repositorio en GitHub y sube los archivos de la carpeta `knowblox-app`.
2. En la página de tu repositorio en GitHub, ve a **Settings** (Configuración) -> **Pages**.
3. En la sección **Build and deployment**, bajo **Source**, selecciona `Deploy from a branch`.
4. Elige tu rama principal (`main` o `master`) y la carpeta raíz `/` (root), luego haz clic en **Save**.
5. En un par de minutos, GitHub te proporcionará un enlace como `https://tu-usuario.github.io/nombre-del-repo/`.

> [!IMPORTANT]
> Si despliegas en una subcarpeta (ej. `github.io/nombre-del-repo/`), asegúrate de que las rutas del `manifest.json` y del `sw.js` apunten de forma correcta usando rutas relativas `./` (las cuales ya hemos configurado previamente en tu proyecto para evitar problemas).

---

## Opción 3: Netlify (Fácil y rápido sin consola - 2 minutos)
Ideal si prefieres arrastrar y soltar carpetas sin usar Git ni terminal.

1. Ingresa a [Netlify](https://www.netlify.com) y crea una cuenta gratuita.
2. Ve a la sección **Sites** (Sitios).
3. Arrastra la carpeta física `c:\Users\Dell\OneDrive\Documentos\knowblox-app` y suéltala directamente en el recuadro que dice *"Want to deploy a new site without Git? Drag and drop your site folder here"*.
4. Netlify procesará los archivos al instante y te dará una URL segura `https://nombre-aleatorio.netlify.app` lista para compartir y jugar.

---

## Requisitos de Publicación Exitosos (PWA)
Para que los teléfonos móviles (Android y iPhone) muestren el botón de **"Instalar KNOWBLOX en pantalla de inicio"**:
* **HTTPS Obligatorio:** El servicio de alojamiento debe usar certificados SSL (Tanto Vercel, GitHub Pages y Netlify lo incluyen de forma automática y gratuita).
* **Service Worker Activo:** El archivo `sw.js` debe cargarse sin errores en la raíz.
* **Íconos de Aplicación:** El archivo `manifest.json` hace referencia a un icono PNG genérico de 512px. Se recomienda reemplazar ese enlace con la ruta de tu logo oficial de KNOWBLOX antes de compartirlo de forma masiva.
