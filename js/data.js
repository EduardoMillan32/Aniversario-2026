/* --- js/data.js --- */

const GAME_CONFIG = {
    Derrota: [
        "Si no puedes con esto como dices que eres la mejor en COD 🎮👀🤭",
        "¿Y asi te haces llamar Thorn Princess? Con razón siempre te gano. 😂",
        "Si ocupas ayuda me lo puedes pedir 🙋‍♂️, no todos son buenos en los juegos jajaja",
        "Oye y si empezamos a hacer apuestas 🤝💸, creo que puedo ganar mucho con esto 👀",
        "Con razon no la armas en el secuence 🃏🔴🔵🤷‍♂️"
    ],
    niveles: [
        {
            id: 1,
            itemEmoji: "📱",
            enemigoEmoji: "📅",
            metaEmoji: "❤️",
            cantidadFotos: 1,
            extension: ".jpeg",
            tituloEvento: "Desde que me diste tu numero han pasado:",
            fechaEvento: "2018-04-27T07:30:00",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1         2           3       4       5       6       7       8
                // Fila 1
                ["TI",      "T",        "TD",   "T",    "T",    "T",    "T",    "TD"],
                // Fila 2
                ["BD-P",    " ",        "T",    "T",    "I",    "TD",   "D",    "D-O"],
                // Fila 3
                ["I",       " ",        "TD",   " ",    "T",    "D",    "T",    "D"],
                // Fila 4
                ["ID",      "T",        "T",    " ",    "T",    "T",    " -E",  "TD"],
                // Fila 5
                ["IT",      " -E",      "ID",   "T",    "T-O",  "ID",   "T",    "D"],
                // Fila 6
                ["ID",      " ",        "T",    "D",    "T-E",  "I",    "D",    "TD"],
                // Fila 7
                ["IT",      " ",        "T",    "ID",   " ",    "T",    "T",    "-M"],
                // Fila 8
                ["IB",      "TDB-O",    "B",    "TB",   "BD",   "BD",   "TB",   "BD"]
            ]
        },
        {
            id: 2,
            itemEmoji: "🍣",    
            enemigoEmoji: "⏰", 
            metaEmoji: "❤️",
            cantidadFotos: 5,
            extension: ".jpg",
            tituloEvento: "Desde nuestra primera cita han pasado:",
            fechaEvento: "2018-05-20T15:38:00",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1         2       3       4       5       6       7       8      9       10
                // Fila 1
                ["IT-E",    "T",    "T",    "TI",   "T",    "IT",   "T",    "TI",   "T",    "T-M"],
                // Fila     
                ["IT-O",    "I",    "I",    "T",    "I",    " ",    "I",    "T",    "T",    "D"],
                // Fila 3
                ["I",       "I",    "T",    "I",    "D",    "T",    "T-O",  "IT",   "D",    "TD-O"],
                // Fila 4
                ["I",       "T",    "I",    "T",    "TD",   "D",    "T",    "T",    "IT",   "D"],
                // Fila 5
                ["I",       "IT",   "T",    " ",    "IT",   "D",    "D",    " ",    "T",    "D"],
                // Fila 6
                ["I",       "I",    "T",    "IT",   "I",    "T",    "D",    "D",    " -E",  "ITD"],
                // Fila 7
                ["I-E",     "T",    " ",    " ",    "T",    " ",    "T",    "D",    " ",    "ID"],
                // Fila 8
                ["IT",      "T",    " ",    "I",    "IT",   "I",    "IT",   "T",    " ",    "D"],
                // Fila 9
                ["I",       "IT",   " ",    " ",    "I",    " ",    " ",    "ID",   "T",    "TD"],
                // Fila 10
                ["B-P",     "TB",   "TB",   "B",    "B",    "TB",   "IB",   "TB",   "B",    "IBD"]
            ]
        },
        {
            id: 3,
            itemEmoji: "💋",    
            enemigoEmoji: "🙈", 
            metaEmoji: "❤️",
            cantidadFotos: 7,
            extension: ".jpg",
            tituloEvento: "Desde nuestro primer beso han pasado:",
            fechaEvento: "2018-06-02T16:30:00",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1     2       3       4       5       6       7       8      9
                // Fila 1
                ["IT",  "IT",    "T",   "T",    "TD-O", "T",    "IT",   "T",    "TD"],
                // Fila     
                ["I",   "I",    "IT",   "T",    "T",    " ",    "I",    "T",    "T-M"],
                // Fila 3
                ["I",   " ",     " ",   "I",    "ID",   "T",    "T",    " ",    "TD"],
                // Fila 4
                ["ID",  " -E",  "IT",   "I-E",  "T",    " ",    "T",    "IT",   "D"],
                // Fila 5
                ["IT",  " ",     " ",   "IT",   "T",    " ",    "I",    "I",    "ID"],
                // Fila 6
                ["I",   "IT",   "I",    "T",    "IT",   "T",    "I",    "I",    "TD"],
                // Fila 7
                ["I",   " ",     "T",   "I",    " -E",  "T",    "I",    "T",    "TD"],
                // Fila 8
                ["T-P", "T",    "IT",   "T",    "D",    "T-O",  "I",    "IT-O", "TD"],
                // Fila 9
                ["ITB", "B",    "B",    "TB",   "TB",   "B",    "IB",   "TB",   "BD"]
            ]
        },
        {
            id: 4,
            itemEmoji: "🎈",    
            enemigoEmoji: "🩹", 
            metaEmoji: "❤️",
            cantidadFotos: 7,
            extension: ".jpg",
            tituloEvento: "Desde que te volviste mi novia han pasado:",
            fechaEvento: "2018-06-14T21:30:00",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1         2       3       4       5        6      7       8
                // Fila 1
                ["TI",      "T",    "T",    "T",    "T",    "I-M",  "IT",   "TD"],
                // Fila 2
                ["I",       "T",    "ITD",  " ",    "T",    "I",    "D",    "D"],
                // Fila 3
                ["T-P",     "I-E",  "D",    "T",    " ",    "IT",   "T",    "D"],
                // Fila 4
                ["I",       "D",    "T",    " ",    "I-O",  "I",    "TD",   "TD-O"],
                // Fila 5
                ["IT",      "T",    "D",    "T",    "T",    "T",    "D",    "D"],
                // Fila 6
                ["I",       "T",    "TD",   " ",    "IT",   "T",    "T",    "D"],
                // Fila 7
                ["I",       "IT",   "D",    " ",    "IT",   "T",    "T",    "D"],
                // Fila 8
                ["IB-O",    "IB-E", "TB",   "B",    "B",    "ITB",  "TB",   "BD"]
            ]
        },
        {
            id: 5,
            itemEmoji: "🍂",    
            enemigoEmoji: "🎒", 
            metaEmoji: "❤️",
            cantidadFotos: 7,
            extension: ".jpg",
            tituloEvento: "Desde tu primer te amo han pasado:",
            fechaEvento: "2018-07-31T19:00:00",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1     2       3       4       5       6       7       8      9       10
                // Fila 1
                ["I-P", "TD",   "T",    "T",    "T",    "T-E",  "T",    "IT",    "T",    "TD"],
                // Fila     
                ["ITD", "D",    "D",    " ",    "I",    "TD",   " ",    "ID",    "D",    "D"],
                // Fila 3
                ["I",   "D",    "D",    " ",    "T",   "ID",    " ",    "T",    "D",    "D"],
                // Fila 4
                ["I",  "ID",    "T",    "TD",    " ",   "ID",   "T",    "T",    "TD-O", "D-E"],
                // Fila 5
                ["I",   "T",    "D",    "D",    " ",     "ID",  "D",    "T",    "T",    "D"],
                // Fila 6
                ["IT",  "T",    "T-E",  "D",    " ",     "I",   "D",    "D",    "TD-O", "D"],
                // Fila 7
                ["ID",  " ",    "IT",    "D",   " ",    "TD",   "T",    "D",    " ",    "D"],
                // Fila 8
                ["ID",  " ",    "T",    "T",    "D",    "D",    "D",    "T",    "T",    "TD"],
                // Fila 9
                ["ID",  "T",    "T",    "IT-O", "TD",   "T",    "D",    "TD",   "D",    "D"],
                // Fila 10
                ["IB",  "BD",   "B",    "TB",   "BD",   "B",    "TB",   "B",    "BD",   "D-M"]
            ]
        },
        {
            id: 6,
            itemEmoji: "💍",    
            enemigoEmoji: "⏳", 
            metaEmoji: "❤️",
            cantidadFotos: 9,
            extension: ".jpg",
            tituloEvento: "Y finalmente desde nuestra boda han pasado:",
            fechaEvento: "2023-04-22T19:30:00",
            // T=Arriba, B=Abajo, I=Izquierda, D=Derecha | -P=Jugador, -O=Objeto, -E=Enemigo, -M=Meta
            mapa: [
                //COLUMNA
                // 1     2       3       4       5       6       7       8      9       10       11
                // Fila 1
                ["T-P", "T",    "TD",   "T",    "T",    "T",    "T",    "T",   "IT-O",  "T",    "TD"],
                // Fila     
                ["IT",  "D",    "T",    "D",    "T",    "IT",   "D",    " ",    "T",    "T",    "D"],
                // Fila 3
                ["I",   "TD",   "D",    "T",    " ",    "I",    "T",    "T",    "T",    "T",    "TD"],
                // Fila 4
                ["IT",  "D",    "D",    "D",    " ",    "TD",   "T",    "T",    "T",    "TD",   "D"],
                // Fila 5
                ["I",   "T",    "D",    "D",    "TD-O", "D",    " ",    "IT",   "D",    "T",    "D"],
                // Fila 6
                ["I-E", "IT",   "T",    "D",    "D",    "D",    " ",    "ID",   "T",    "D",    "D"],
                // Fila 7
                ["I",   "T",    "D",    "T",    "D",    "D",    " ",    "IT",   "D",    "TD",   "D"],
                // Fila 8
                ["IT",  "TD",   "T",    "D",    "T",    "D",    " ",    "I",    "IT",   " ",    "D-E"],
                // Fila 9
                ["ID",  "D",    " -E",  "T",    " ",    "T",    " ",    "I",    "ID",   "D",    "TD-O"],
                // Fila 10
                ["D-M", "D",    "T",    "T",    "ID",   "T",    "T",    "I",    "TD",   "D",    "D"],
                // Fila 11
                ["ITB", "B",    "BD",   "B",    "TB",   "BD",   "B",    "TB",   "BD",   "B",    "BD"]
            ]
        }
    ]
};