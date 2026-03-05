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
    document.getElementById('slider-modal').classList.remove('hidden');

    clearInterval(carouselInterval); 
    carouselInterval = setInterval(nextPhoto, 3000); // 3 segundos por foto
}

// Evento exclusivo para el botón de Siguiente Nivel
btnNextLevel.addEventListener('click', () => {
    clearInterval(carouselInterval); 
    document.getElementById('slider-modal').classList.add('hidden');
    
    currentLevelIndex++; 
    
    if (currentLevelIndex >= GAME_CONFIG.niveles.length) {
        alert("¡TERMINASTE TODO EL JUEGO! (Falta la pantalla final de aniversario)");
    } else {
        loadLevel(); 
    }
});