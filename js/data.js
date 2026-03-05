/* --- js/data.js --- */

const GAME_CONFIG = {
    Derrota: [
        "¡Uy! Más lenta que el internet de los 90s. 😂 ¡Vas de nuevo!",
        "¿Esos son tus reflejos? Con razón siempre te gano. 🐢",
        "¡Te atraparon! Menos mal que para enamorarme fuiste más rápida. 🥰"
    ],
    niveles: [
        {
            id: 1,
            itemEmoji: "☕",
            enemigoEmoji: "🚦",
            metaEmoji: "❤️",
            cantidadFotos: 3,
            extension: ".jpg",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1         2       3       4       5       6       7       8
                // Fila 1
                ["TI",      "T",    "TD",   "T",    "T",    "T",    "T",    "TD"],
                // Fila 2
                ["BD-P",    " ",    "T",    "T",    "I",    "TD",   "D",    "D-O"],
                // Fila 3
                ["I",       " ",    "TD",   " ",    "T",    "D",    "T",    "D"],
                // Fila 4
                ["ID",      "T",    "T",    " ",    "T",    "T",    " ",    "TD-E"],
                // Fila 5
                ["IT",      " ",    "ID",   "T",    "T",    "ID",   "T",    "D"],
                // Fila 6
                ["ID",      " ",    "T",    "D",    "T",    "I",    "D",    "TD"],
                // Fila 7
                ["IT",      " ",    "T",    "ID",   " ",    "T",    "T",    "-M"],
                // Fila 8
                ["IB",      "TDB",  "B",    "TB",   "BD",   "BD",   "TB",   "BD"]
            ]
        },
        {
            id: 2,
            itemEmoji: "☕",    
            enemigoEmoji: "🚦", 
            metaEmoji: "❤️",
            cantidadFotos: 3,
            extension: ".jpg",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1     2       3       4       5       6       7       8      9       10
                // Fila 1
                ["IT",  "T",    "T",    "TI",   "T",    "IT",   "T",    "TI",   "T",    "T-M"],
                // Fila     
                ["IT",  "I",    "I",    "T",    "I",    " ",     "I",    "T",    "T",    "D"],
                // Fila 3
                ["I",   "I",    "T",    "I",    "D",    "T",    "T",    "IT",   "D",    "TD"],
                // Fila 4
                ["I",   "T",    "I",    "T",    "TD",   "D",    "T",    "T",    "IT",   "D"],
                // Fila 5
                ["I",   "IT",   "T",    " ",     "IT",   "D",    "D",    " ",     "T",    "D"],
                // Fila 6
                ["I",   "I",    "T",    "IT",   "I",    "T",    "D",    "D",    " ",     "ITD"],
                // Fila 7
                ["I",   "T",    " ",     " ",     "T",    " ",     "T",    "D",    " ",     "ID"],
                // Fila 8
                ["IT",  "T",    " ",     "I",    "IT",   "I",    "IT",   "T",    " ",     "D"],
                // Fila 9
                ["I",   "IT",   " ",     " ",     "I",    " ",     " ",     "ID",   "T",    "TD"],
                // Fila 10
                ["B-P", "TB",   "TB",   "B",    "B",    "TB",   "IB",   "TB",   "B",    "IBD"]
            ]
        },
        {
            id: 3,
            itemEmoji: "☕",    
            enemigoEmoji: "🚦", 
            metaEmoji: "❤️",
            cantidadFotos: 3,
            extension: ".jpg",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1         2       3       4       5       6       7       8      9
                // Fila 1
                ["IT",      "IT",    "T",   "T",    "TD",    "T",   "IT",   "T",    "TD"],
                // Fila     
                ["I",       "I",    "IT",   "T",    "T",    " ",     "I",     "T",   "T-M"],
                // Fila 3
                ["I",       " ",     " ",     "I",    "ID",    "T",   "T",    " ",     "TD"],
                // Fila 4
                ["ID",      " ",     "IT",   "I",    "T",    " ",     "T",    "IT",   "D"],
                // Fila 5
                ["IT",      " ",     " ",     "IT",   "T",    " ",     "I",    "I",    "ID"],
                // Fila 6
                ["I",       "IT",   "I",   "T",    "IT",    "T",    "I",    "I",     "TD"],
                // Fila 7
                ["I",       " ",     "T",    "I",    " ",     "T",    "I",    "T",     "TD"],
                // Fila 8
                ["T-P",    "T",    "IT",    "T",    "D",     "T",   "I",    "IT",    "TD"],
                // Fila 9
                ["ITB",     "B",    "B",    "TB",   "TB",   "B",    "IB",   "TB",    "BD"]
            ]
        },
        {
            id: 4,
            itemEmoji: "☕",    
            enemigoEmoji: "🚦", 
            metaEmoji: "❤️",
            cantidadFotos: 3,
            extension: ".jpg",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1         2       3       4       5        6           7       8
                // Fila 1
                ["TI",      "T",    "T",    "T",    "T",    "I-M",     "IT",   "TD"],
                // Fila 2
                ["I",       "T",    "ITD",   " ",    "T",    "I",        "D",     "D"],
                // Fila 3
                ["T-P",    "I",     "D",     "T",    " ",    "IT",       "T",    "D"],
                // Fila 4
                ["I",       "D",    "T",    " ",     "I",    "I",        "TD",    "TD"],
                // Fila 5
                ["IT",      "T",    "D",     "T",    "T",    "T",        "D",     "D"],
                // Fila 6
                ["I",      "T",     "TD",    " ",    "IT",    "T",    "T",    "D"],
                // Fila 7
                ["I",      "IT",     "D",    " ",   "IT",     "T",    "T",    "D"],
                // Fila 8
                ["IB",      "IB",  "TB",    "B",   "B",   "ITB",   "TB",   "BD"]
            ]
        },
        {
            id: 5,
            itemEmoji: "☕",    
            enemigoEmoji: "🚦", 
            metaEmoji: "❤️",
            cantidadFotos: 3,
            extension: ".jpg",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1     2       3       4       5       6       7       8      9       10
                // Fila 1
                ["I-P", "TD",   "T",    "T",    "T",    "T",    "T",   "IT",   "T",    "TD"],
                // Fila     
                ["ITD", "D",    "D",    " ",    "I",    "TD",   "",    "ID",    "D",    "D"],
                // Fila 3
                ["I",   "D",    "D",    " ",    "T",   "ID",    " ",    "T",    "D",    "D"],
                // Fila 4
                ["I",  "ID",    "T",    "TD",    "",   "ID",    "T",    "T",    "TD",   "D"],
                // Fila 5
                ["I",   "T",    "D",    "D",    "",    "ID",    "D",    "T",    "T",    "D"],
                // Fila 6
                ["IT",  "T",    "T",    "D",    "",    "I",    "D",    "D",    "TD",   "D"],
                // Fila 7
                ["ID",  " ",    "IT",    "D",    " ",    "TD",   "T",    "D",    " ",    "D"],
                // Fila 8
                ["ID",  " ",    "T",    "T",    "D",    "D",    "D",    "T",    "T ",   "TD"],
                // Fila 9
                ["ID",  "T",    "T",   "IT",    "TD",   "T",    "D",    "TD",   "D",    "D"],
                // Fila 10
                ["IB", "BD",   "B",   "TB",    "BD",    "B",   "TB",   "B",   "BD",    "D-M"]
            ]
        }
    ]
};