/* --- js/dibujo.js --- */

const boardElement = document.getElementById('game-board');
const levelTitle = document.getElementById('level-title');
const itemsCounter = document.getElementById('items-counter');

function drawMap() {
    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    const rows = mapArray.length;
    const cols = mapArray[0].length; 

    boardElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    boardElement.innerHTML = '';

    levelTitle.textContent = `Nivel ${levelData.id}`;

    // Calcula qué tan grande debe ser el emoji dependiendo de cuántos pasillos hay.
    // Si hay 5 columnas, el número será grande. Si hay 20, será chiquito.
    let tamañoCalculado = Math.floor(320 / cols);
    
    if (tamañoCalculado > 50) {
        tamañoCalculado = 50; 
    }

    const responsiveFontSize = tamañoCalculado + "px";

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cellData = mapArray[y][x]; 
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (cellData.includes('T')) cell.classList.add('wall-T');
            if (cellData.includes('B')) cell.classList.add('wall-B');
            if (cellData.includes('I')) cell.classList.add('wall-I');
            if (cellData.includes('D')) cell.classList.add('wall-D');

            if (cellData.includes('-')) {
                const content = cellData.split('-')[1]; 
                const sprite = document.createElement('span');
                sprite.classList.add('emoji-sprite');

                if (content === 'P') {
                    sprite.innerHTML = "🏃‍♀️";
                    
                    sprite.style.display = "inline-block"; 
                    
                    if (playerFacing === 1) {
                        sprite.style.transform = "scaleX(-1)"; 
                    } else {
                        sprite.style.transform = "scaleX(1)"; 
                    }
                }
                else if (content === 'O') sprite.innerHTML = levelData.itemEmoji; 
                else if (content === 'E') sprite.innerHTML = levelData.enemigoEmoji;
                else if (content === 'M') sprite.innerHTML = levelData.metaEmoji;

                cell.appendChild(sprite);
            }
            boardElement.appendChild(cell);
        }
    }

    itemsCounter.textContent = `Recoge los objetos: ${collectedItems}/${totalItems}`;
}

// --- LÓGICA DE LA LLUVIA DE EMOJIS EN EL FONDO ---
let rainInterval = null;

function startEmojiRain() {
    // Si ya estaba lloviendo, lo detenemos para actualizar los emojis
    if (rainInterval) clearInterval(rainInterval);

    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    // Elegimos quiénes van a llover: El ítem a recoger y la meta
    const emojisToFall = [levelData.itemEmoji, levelData.metaEmoji];

    // Lanzar un nuevo emoji cada 800 milisegundos
    rainInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('falling-emoji');
        
        // Elige al azar si cae el objeto o la meta
        particle.textContent = emojisToFall[Math.floor(Math.random() * emojisToFall.length)];
        
        // Posición horizontal al azar
        particle.style.left = Math.random() * 100 + 'vw';
        
        // Velocidad de caída al azar 
        const duration = Math.random() * 3 + 4;
        particle.style.animationDuration = duration + 's';
        
        // Tamaño al azar 
        const size = Math.random() * 1.5 + 1; // Tamaño entre 1 y 2.5rem
        particle.style.fontSize = size + 'rem';

        // Lo agregamos a la pantalla
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);

    }, 800); // Puedes bajar a 500 si quieres que llueva más tupido, o subir a 1000 si quieres menos
}