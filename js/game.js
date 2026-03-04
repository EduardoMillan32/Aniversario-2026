/* --- js/game.js (MOTOR DEL JUEGO CON TUS REGLAS) --- */

// --- REFERENCIAS AL HTML ---
const boardElement = document.getElementById('game-board');
const levelTitle = document.getElementById('level-title');
const itemsCounter = document.getElementById('items-counter');

const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

const tauntModal = document.getElementById('taunt-modal');
const tauntMsg = document.getElementById('taunt-msg');
const btnRetry = document.getElementById('btn-retry');

// --- VARIABLES DE ESTADO ---
let currentLevelIndex = 0; 
let mapArray = []; 
let playerPos = { x: 0, y: 0 };
let collectedItems = 0;
let totalItems = 0;

// --- FUNCIÓN 1: CARGAR Y DIBUJAR EL MAPA ---
function loadLevel() {
    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    mapArray = JSON.parse(JSON.stringify(levelData.mapa)); 
    
    collectedItems = 0;
    totalItems = 0;
    
    for (let y = 0; y < mapArray.length; y++) {
        for (let x = 0; x < mapArray[y].length; x++) {
            if (mapArray[y][x].includes('-P')) {
                playerPos = { x: x, y: y };
            }
            // AHORA BUSCA LA "-O" DE OBJETO
            if (mapArray[y][x].includes('-O')) {
                totalItems++;
            }
        }
    }
    drawMap();
}

function drawMap() {
    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    const rows = mapArray.length;
    const cols = mapArray[0].length; 

    boardElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    boardElement.innerHTML = '';

    levelTitle.textContent = `Nivel ${levelData.id}`;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cellData = mapArray[y][x]; 
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // DIBUJAR PAREDES CON TUS NUEVAS LETRAS (T, B, I, D)
            if (cellData.includes('T')) cell.classList.add('wall-T');
            if (cellData.includes('B')) cell.classList.add('wall-B');
            if (cellData.includes('I')) cell.classList.add('wall-I');
            if (cellData.includes('D')) cell.classList.add('wall-D');

            // DIBUJAR PERSONAJES/OBJETOS
            if (cellData.includes('-')) {
                const content = cellData.split('-')[1]; 
                const sprite = document.createElement('span');
                sprite.classList.add('emoji-sprite');

                if (content === 'P') sprite.innerHTML = "🏃";
                // AHORA LEE LA "O"
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

// --- FUNCIÓN 2: MOVIMIENTO Y COLISIONES ---
function movePlayer(dx, dy) {
    const nextX = playerPos.x + dx;
    const nextY = playerPos.y + dy;

    if (nextX < 0 || nextY < 0 || nextY >= mapArray.length || nextX >= mapArray[0].length) return;

    const currentCell = mapArray[playerPos.y][playerPos.x];
    const nextCell = mapArray[nextY][nextX];

    // COLISIONES ACTUALIZADAS CON TUS LETRAS (I, D)
    // Derecha
    if (dx === 1 && (currentCell.includes('D') || nextCell.includes('I'))) return; 
    // Izquierda
    if (dx === -1 && (currentCell.includes('I') || nextCell.includes('D'))) return; 
    // Abajo
    if (dy === 1 && (currentCell.includes('B') || nextCell.includes('T'))) return; 
    // Arriba
    if (dy === -1 && (currentCell.includes('T') || nextCell.includes('B'))) return; 

    // TOCA UN ENEMIGO
    if (nextCell.includes('-E')) {
        die();
        return;
    }

    // TOCA LA META
    if (nextCell.includes('-M')) {
        if (collectedItems < totalItems) {
            itemsCounter.classList.add('warning-text');
            setTimeout(() => itemsCounter.classList.remove('warning-text'), 500);
            return; 
        } else {
            winLevel(); 
            return;
        }
    }

    // TOCA UN OBJETO ("-O")
    if (nextCell.includes('-O')) {
        collectedItems++;
        mapArray[nextY][nextX] = nextCell.replace('-O', ''); 
    }

    // MOVER AL JUGADOR
    mapArray[playerPos.y][playerPos.x] = currentCell.replace('-P', '');
    mapArray[nextY][nextX] = mapArray[nextY][nextX] + '-P';
    
    playerPos = { x: nextX, y: nextY };
    drawMap(); 
}

// --- FUNCIÓN 3: PERDER Y GANAR ---
function die() {
    const burlas = GAME_CONFIG.taunts;
    const randomTaunt = burlas[Math.floor(Math.random() * burlas.length)];
    
    tauntMsg.textContent = randomTaunt;
    tauntModal.classList.remove('hidden');
}

function winLevel() {
    alert("¡PASASTE EL NIVEL! (Próximamente: Galería de Fotos)");
}

// --- EVENTOS DE BOTONES ---
function addControl(btnElement, dx, dy) {
    btnElement.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        movePlayer(dx, dy);
    }, {passive: false});

    btnElement.addEventListener('mousedown', (e) => {
        e.preventDefault();
        movePlayer(dx, dy);
    });
}

addControl(btnUp, 0, -1);
addControl(btnDown, 0, 1);
addControl(btnLeft, -1, 0);
addControl(btnRight, 1, 0);

btnRetry.addEventListener('click', () => {
    tauntModal.classList.add('hidden');
    loadLevel(); 
});

// --- SOPORTE PARA TECLADO (PC / Laptop) ---
document.addEventListener('keydown', (e) => {
    // Evitamos que la pantalla haga "scroll" (se mueva hacia abajo/arriba) 
    // cuando presiona las flechas, lo cual es muy molesto al jugar.
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }

    // Detectamos qué tecla presionó y movemos al jugador
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            movePlayer(1, 0);
            break;
    }
});

// INICIAR EL JUEGO AL CARGAR
loadLevel();