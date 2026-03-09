/* --- js/juego.js --- */

const tauntModal = document.getElementById('taunt-modal');
const tauntMsg = document.getElementById('taunt-msg');
const btnRetry = document.getElementById('btn-retry');

let currentLevelIndex = 0; 
let mapArray = []; 
let playerPos = { x: 0, y: 0 };
let collectedItems = 0;
let totalItems = 0;
let enemies = []; 
let enemyInterval = null;

//1 = Derecha, -1 = Izquierda
let playerFacing = 1;

function loadLevel(esReintento = false) {
    clearInterval(enemyInterval); 
    const levelData = GAME_CONFIG.niveles[currentLevelIndex];
    
    if (!esReintento) {
        mapArray = JSON.parse(JSON.stringify(levelData.mapa)); 
        collectedItems = 0;
        totalItems = 0;
        playerFacing = 1;
    } else {
        for (let y = 0; y < mapArray.length; y++) {
            for (let x = 0; x < mapArray[y].length; x++) {
                mapArray[y][x] = mapArray[y][x].replace('-P', '').replace('-E', '');
            }
        }
    }

    enemies = []; 
    const mapaOriginal = levelData.mapa;

    for (let y = 0; y < mapaOriginal.length; y++) {
        for (let x = 0; x < mapaOriginal[y].length; x++) {
            if (!esReintento && mapaOriginal[y][x].includes('-O')) totalItems++;
            if (mapaOriginal[y][x].includes('-P')) {
                playerPos = { x: x, y: y };
                if (!mapArray[y][x].includes('-P')) mapArray[y][x] += '-P';
            }
            if (mapaOriginal[y][x].includes('-E')) {
                if (!mapArray[y][x].includes('-E')) mapArray[y][x] += '-E';
                
                let dx = 0, dy = 0;
                let mapHeight = mapaOriginal.length;
                let mapWidth = mapaOriginal[0].length;
                
                let paredDer = mapaOriginal[y][x].includes('D') || x === mapWidth - 1 || (x < mapWidth - 1 && mapaOriginal[y][x+1].includes('I'));
                let paredIzq = mapaOriginal[y][x].includes('I') || x === 0 || (x > 0 && mapaOriginal[y][x-1].includes('D'));
                let paredAba = mapaOriginal[y][x].includes('B') || y === mapHeight - 1 || (y < mapHeight - 1 && (mapaOriginal[y+1][x].includes('A') || mapaOriginal[y+1][x].includes('T')));
                let paredArr = mapaOriginal[y][x].includes('A') || mapaOriginal[y][x].includes('T') || y === 0 || (y > 0 && mapaOriginal[y-1][x].includes('B'));

                if (paredDer && paredIzq) { 
                    dy = (!paredAba) ? 1 : -1; 
                } else if (paredArr && paredAba) { 
                    dx = (!paredDer) ? 1 : -1; 
                } else {
                    if (!paredDer) dx = 1;
                    else if (!paredAba) dy = 1;
                    else if (!paredIzq) dx = -1;
                    else dy = -1;
                }

                enemies.push({ x: x, y: y, dx: dx, dy: dy });
            }
        }
    }
    drawMap(); 
    
    startEmojiRain();
    
    enemyInterval = setInterval(moveEnemies, 700); 
}

function movePlayer(dx, dy) {
    const nextX = playerPos.x + dx;
    const nextY = playerPos.y + dy;

    if (nextX < 0 || nextY < 0 || nextY >= mapArray.length || nextX >= mapArray[0].length) return;

    const currentCell = mapArray[playerPos.y][playerPos.x];
    const nextCell = mapArray[nextY][nextX];

    if (dx === 1 && (currentCell.includes('D') || nextCell.includes('I'))) return; 
    if (dx === -1 && (currentCell.includes('I') || nextCell.includes('D'))) return; 
    if (dy === 1 && (currentCell.includes('B') || nextCell.includes('T'))) return; 
    if (dy === -1 && (currentCell.includes('T') || nextCell.includes('B'))) return; 

    if (nextCell.includes('-E')) { die(); return; }

    if (nextCell.includes('-M')) {
        if (collectedItems < totalItems) {
            document.getElementById('items-counter').classList.add('warning-text');
            setTimeout(() => document.getElementById('items-counter').classList.remove('warning-text'), 500);
            return; 
        } else {
            winLevel(); // Llama a la función que ahora vive en carrusel.js
            return;
        }
    }

    if (nextCell.includes('-O')) {
        collectedItems++;
        mapArray[nextY][nextX] = nextCell.replace('-O', ''); 
    }

    mapArray[playerPos.y][playerPos.x] = currentCell.replace('-P', '');
    mapArray[nextY][nextX] = mapArray[nextY][nextX] + '-P';

    if (dx === 1) {
        playerFacing = 1;  // Movió a la derecha
    } else if (dx === -1) {
        playerFacing = -1; // Movió a la izquierda
    }
    
    playerPos = { x: nextX, y: nextY };
    drawMap(); 
}

function moveEnemies() {
    const mapaOriginal = GAME_CONFIG.niveles[currentLevelIndex].mapa;
    
    let mapHeight = mapaOriginal.length;
    let mapWidth = mapaOriginal[0].length;

    enemies.forEach(enemy => {
        let currX = enemy.x;
        let currY = enemy.y;
        
        // Calculamos a dónde se quiere mover
        let nextX = currX + enemy.dx;
        let nextY = currY + enemy.dy;

        let hitWall = false;

        if (nextX < 0 || nextX >= mapWidth || nextY < 0 || nextY >= mapHeight) {
            hitWall = true;
        } else {
            let cellCurrent = mapaOriginal[currY][currX] || "";
            let cellTarget = mapaOriginal[nextY][nextX] || "";

            if (enemy.dx === 1 && (cellCurrent.includes('D') || cellTarget.includes('I'))) hitWall = true;
            if (enemy.dx === -1 && (cellCurrent.includes('I') || cellTarget.includes('D'))) hitWall = true;
            if (enemy.dy === 1 && (cellCurrent.includes('B') || cellTarget.includes('A') || cellTarget.includes('T'))) hitWall = true;
            if (enemy.dy === -1 && (cellCurrent.includes('A') || cellCurrent.includes('T') || cellTarget.includes('B'))) hitWall = true;
        }

        if (hitWall) {
            enemy.dx = -enemy.dx;
            enemy.dy = -enemy.dy;
            
            nextX = currX + enemy.dx;
            nextY = currY + enemy.dy;
            
            let trapped = false;
            if (nextX < 0 || nextX >= mapWidth || nextY < 0 || nextY >= mapHeight) {
                trapped = true;
            } else {
                let cellCurrent = mapaOriginal[currY][currX] || "";
                let cellTarget = mapaOriginal[nextY][nextX] || "";
                if (enemy.dx === 1 && (cellCurrent.includes('D') || cellTarget.includes('I'))) trapped = true;
                if (enemy.dx === -1 && (cellCurrent.includes('I') || cellTarget.includes('D'))) trapped = true;
                if (enemy.dy === 1 && (cellCurrent.includes('B') || cellTarget.includes('A') || cellTarget.includes('T'))) trapped = true;
                if (enemy.dy === -1 && (cellCurrent.includes('A') || cellCurrent.includes('T') || cellTarget.includes('B'))) trapped = true;
            }
            
            if (trapped) {
                nextX = currX;
                nextY = currY;
            }
        }

        mapArray[currY][currX] = mapArray[currY][currX].replace('-E', '');
        
        enemy.x = nextX;
        enemy.y = nextY;
        
        mapArray[enemy.y][enemy.x] += '-E';

        if (playerPos.x === enemy.x && playerPos.y === enemy.y) {
            die(); 
            return;
        }
    });
    
    drawMap(); 
}

function die() {
    clearInterval(enemyInterval);
    let randomTaunt = "¡Te atraparon! 💥 Inténtalo de nuevo."; 
    
    if (GAME_CONFIG.Derrota && GAME_CONFIG.Derrota.length > 0) {
        const mensaje = GAME_CONFIG.Derrota;
        randomTaunt = mensaje[Math.floor(Math.random() * mensaje.length)];
    }
    
    tauntMsg.textContent = randomTaunt;
    tauntModal.classList.remove('hidden');
}

// Eventos de botones y teclado
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

function addControl(btnElement, dx, dy) {
    btnElement.addEventListener('touchstart', (e) => { e.preventDefault(); movePlayer(dx, dy); }, {passive: false});
    btnElement.addEventListener('mousedown', (e) => { e.preventDefault(); movePlayer(dx, dy); });
}

addControl(btnUp, 0, -1);
addControl(btnDown, 0, 1);
addControl(btnLeft, -1, 0);
addControl(btnRight, 1, 0);

btnRetry.addEventListener('click', () => {
    tauntModal.classList.add('hidden');
    loadLevel(true); 
});

document.addEventListener('keydown', (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
    switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': movePlayer(0, -1); break;
        case 'ArrowDown': case 's': case 'S': movePlayer(0, 1); break;
        case 'ArrowLeft': case 'a': case 'A': movePlayer(-1, 0); break;
        case 'ArrowRight': case 'd': case 'D': movePlayer(1, 0); break;
    }
});


// ==========================================
// INICIO DEL JUEGO (BOTÓN DE LA PANTALLA INICIAL)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start-game');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');

    btnStart.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        
        gameScreen.classList.remove('hidden');
        
        loadLevel();
    });
});

// INICIAR EL JUEGO AL CARGAR
loadLevel();