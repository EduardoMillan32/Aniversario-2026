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
    
    const btnNext = document.getElementById('btn-next-level');
    if (currentLevelIndex >= GAME_CONFIG.niveles.length - 1) {
        btnNext.textContent = "Abrir mi sorpresa especial 💌";
    } else {
        btnNext.textContent = "Ir al siguiente nivel 🎮";
    }

    // Iniciar el reloj principal
    startLiveTimer(levelData.fechaEvento, levelData.tituloEvento);

    document.getElementById('slider-modal').classList.remove('hidden');

    clearInterval(carouselInterval); 
    carouselInterval = setInterval(nextPhoto, 3000); 
}

// Evento exclusivo para el botón de Siguiente Nivel
btnNextLevel.addEventListener('click', () => {
    clearInterval(carouselInterval); 
    document.getElementById('slider-modal').classList.add('hidden');
    
    currentLevelIndex++; 
    
    if (currentLevelIndex >= GAME_CONFIG.niveles.length) {
        // ¡ES EL FINAL! Ocultamos el juego y mostramos la carta
        document.getElementById('game-screen').classList.add('hidden'); 
        document.getElementById('final-screen').classList.remove('hidden');
        
        // Iniciamos el muro de fotos y el reloj de la carta
        startCollageBackground();
        
        // Aquí puedes poner tu fecha oficial de Aniversario para el reloj de la carta
        startFinalTimer("2023-05-10T14:00:00"); 

    } else {
        loadLevel(); 
    }
});

// --- EL GENERADOR DE COLLAGE DE FOTOS ---
function startCollageBackground() {
    const collageBg = document.getElementById('collage-bg');
    let allPhotos = [];
    
    // Recopilamos TODAS las fotos de todos los niveles
    GAME_CONFIG.niveles.forEach(nivel => {
        let maxFotos = nivel.cantidadFotos || 1;
        let ext = nivel.extension || '.jpg';
        for (let i = 1; i <= maxFotos; i++) {
            allPhotos.push(`img/nivel ${nivel.id}/${i}${ext}`);
        }
    });

    // Creamos 12 "huecos" de fotos en la pantalla
    const photoElements = [];
    for (let i = 0; i < 12; i++) {
        const img = document.createElement('img');
        img.classList.add('collage-photo');
        img.src = allPhotos[Math.floor(Math.random() * allPhotos.length)];
        collageBg.appendChild(img);
        photoElements.push(img);
        
        // Las hacemos aparecer poco a poco
        setTimeout(() => { img.style.opacity = 0.5; }, Math.random() * 2000);
    }

    // Cada 3 segundos, elegimos una foto al azar en la pantalla y la cambiamos
    setInterval(() => {
        const randomElement = photoElements[Math.floor(Math.random() * photoElements.length)];
        randomElement.style.opacity = 0; // Desvanecer
        
        setTimeout(() => {
            randomElement.src = allPhotos[Math.floor(Math.random() * allPhotos.length)];
            randomElement.style.opacity = 0.5; // Reaparecer
        }, 2000); // Tarda 2 segundos en desvanecerse antes de cambiar
    }, 3000);
}

// --- LÓGICA DEL RELOJ EN VIVO ---
let timeInterval = null; // Guardará el reloj para poder detenerlo

function startLiveTimer(fechaInicioTexto, tituloTexto) {
    const labelElement = document.getElementById('level-timer-label');
    const containerElement = document.getElementById('level-timer-container');

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

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

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

    updateCounter();
    clearInterval(timeInterval);
    timeInterval = setInterval(updateCounter, 1000);
}

// --- RELOJ DE LA CARTA FINAL ---
function startFinalTimer(fechaOficial) {
    const start = new Date(fechaOficial);
    setInterval(() => {
        const now = new Date();
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();
        let hours = now.getHours() - start.getHours();
        let minutes = now.getMinutes() - start.getMinutes();
        let seconds = now.getSeconds() - start.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) { const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); months--; }
        if (months < 0) { months += 12; years--; }

        document.getElementById('final-years').textContent = years;
        document.getElementById('final-months').textContent = months;
        document.getElementById('final-days').textContent = days;
        document.getElementById('final-hours').textContent = hours;
        document.getElementById('final-mins').textContent = minutes;
        document.getElementById('final-secs').textContent = seconds;
    }, 1000);
}