/* --- js/carrusel.js (VERSIÓN LIMPIA AUTOMÁTICA) --- */

let currentPhotoNumber = 1;
let totalPhotosInLevel = 0;
let carouselInterval = null;

// Solo nos quedamos con el botón para avanzar de nivel
const btnNextLevel = document.getElementById('btn-next-level');

function nextPhoto() {
    currentPhotoNumber++;
    if (currentPhotoNumber > totalPhotosInLevel) {
        currentPhotoNumber = 1; 
    }
    updateSlider();
}

function updateSlider() {
    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    const imgElement = document.getElementById('slider-img');

    // Construimos la ruta de la foto automáticamente
    const extension = levelData.extension ? levelData.extension : '.jpg';
    const imagePath = `img/nivel ${levelData.id}/${currentPhotoNumber}${extension}`;
    
    if (imgElement) {
        imgElement.src = imagePath;
    }
}

function winLevel() {
    clearInterval(enemyInterval);

    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    totalPhotosInLevel = levelData.cantidadFotos || 1;
    currentPhotoNumber = 1; 

    const titleElement = document.getElementById('slider-title');
    if (titleElement) titleElement.textContent = `¡Nivel ${levelData.id} Superado!`;
    
    updateSlider();
    startLiveTimer(levelData.fechaEvento, levelData.tituloEvento);
    document.getElementById('slider-modal').classList.remove('hidden');

    clearInterval(carouselInterval); 
    carouselInterval = setInterval(nextPhoto, 3000); // 3 segundos por foto
}

// Evento exclusivo para el botón de Siguiente Nivel
btnNextLevel.addEventListener('click', () => {
    clearInterval(carouselInterval);
    clearInterval(timeInterval);
    document.getElementById('slider-modal').classList.add('hidden');
    
    currentLevelIndex++; 
    
    if (currentLevelIndex >= GAME_CONFIG.niveles.length) {
        alert("¡TERMINASTE TODO EL JUEGO! (Falta la pantalla final de aniversario)");
    } else {
        loadLevel(); 
    }
});

// --- LÓGICA DEL RELOJ EN VIVO ---
let timeInterval = null; // Guardará el reloj para poder detenerlo

function startLiveTimer(fechaInicioTexto, tituloTexto) {
    const labelElement = document.getElementById('level-timer-label');
    const containerElement = document.getElementById('level-timer-container');

    // Si no hay fecha en este nivel, escondemos el contador
    if (!fechaInicioTexto) {
        containerElement.style.display = 'none';
        return;
    }

    containerElement.style.display = 'block';
    labelElement.textContent = tituloTexto || "Desde ese evento han pasado:";

    const start = new Date(fechaInicioTexto);

    function updateCounter() {
        const now = new Date();
        
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();
        let hours = now.getHours() - start.getHours();
        let minutes = now.getMinutes() - start.getMinutes();
        let seconds = now.getSeconds() - start.getSeconds();

        // Ajustes matemáticos para tiempos exactos
        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        // Imprimir en la pantalla
        const elY = document.getElementById('t-years');
        if (elY) {
            elY.textContent = years;
            document.getElementById('t-months').textContent = months;
            document.getElementById('t-days').textContent = days;
            document.getElementById('t-hours').textContent = hours;
            document.getElementById('t-mins').textContent = minutes;
            document.getElementById('t-secs').textContent = seconds;
        }
    }

    // Ejecutar inmediatamente y luego cada 1 segundo (1000 ms)
    updateCounter();
    clearInterval(timeInterval);
    timeInterval = setInterval(updateCounter, 1000);
}