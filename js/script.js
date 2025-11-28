// Script para Lonchería Ceballos - Versión Final Corregida

// 1. Manejo del Formulario
const formulario = document.querySelector("form");
if (formulario) {
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Gracias por contactarnos. Te responderemos pronto.");
    });
}

// 2. Manejo del Video Accesible
document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('promoVideo');
    const btnAD = document.getElementById('btnToggleAD');

    if (videoElement && btnAD) {
        
        // --- TUS RUTAS ---
        const rutaVideoNormal = 'images/video.mp4';
        const rutaVideoAD = 'images/videoAD.mp4';
        // -----------------

        let esModoAD = false;

        // Detector de errores (por si no encuentra el video)
        videoElement.addEventListener('error', (e) => {
             if (videoElement.error && videoElement.error.code === 4) {
                console.error("Error: Archivo no encontrado. Ruta: " + videoElement.currentSrc);
            }
        }, true);

        btnAD.addEventListener('click', () => {
            const tiempoActual = videoElement.currentTime;
            const estabaReproduciendo = !videoElement.paused;

            // Logica de cambio de video
            if (esModoAD) {
                videoElement.src = rutaVideoNormal;
                btnAD.innerHTML = 'Activar Audio Descripción (AD)';
                btnAD.classList.remove('activo'); 
                btnAD.setAttribute('aria-pressed', 'false');
                esModoAD = false;
            } else {
                videoElement.src = rutaVideoAD;
                btnAD.innerHTML = 'Desactivar Audio Descripción';
                btnAD.classList.add('activo');
                btnAD.setAttribute('aria-pressed', 'true');
                esModoAD = true;
            }

            videoElement.currentTime = tiempoActual;

            // --- CORRECCIÓN DE SUBTÍTULOS DUPLICADOS ---
            
            // Paso A: Borrar pistas viejas para que no se acumulen
            const pistasViejas = videoElement.querySelectorAll('track');
            pistasViejas.forEach(pista => pista.remove());

            // Paso B: Crear la nueva pista limpia
            const track = document.createElement('track');
            track.kind = 'captions';
            track.label = 'Español';
            track.srclang = 'es';
            track.src = 'images/subtitulos.vtt';
            
            videoElement.appendChild(track);
            // -------------------------------------------

            if (estabaReproduciendo) {
                // Promesa para evitar errores si el navegador bloquea el autoplay
                let playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Reproducción automática pausada por el navegador.");
                    });
                }
            }
        });
    }
});