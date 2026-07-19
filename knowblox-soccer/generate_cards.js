const fs = require('fs');
const path = require('path');

// Colors and themes for each category
const CATEGORIES = {
  "Argentina": { color: "#75aadb", theme: "sky-blue" },
  "Brasil": { color: "#fbc02d", theme: "yellow" },
  "Portugal": { color: "#d32f2f", theme: "red" },
  "Francia": { color: "#0d47a1", theme: "blue" },
  "España": { color: "#c62828", theme: "red-yellow" },
  "Alemania": { color: "#1e1e1e", theme: "black-white" },
  "Inglaterra": { color: "#eeeeee", theme: "white-red" },
  "Italia": { color: "#1565c0", theme: "azure" },
  "Norteamérica": { color: "#2e7d32", theme: "green" },
  "Centroamérica": { color: "#ff8f00", theme: "orange" },
  "Asia": { color: "#ad1457", theme: "magenta" },
  "África": { color: "#2e7d32", theme: "green" },
  "Europa": { color: "#512da8", theme: "purple" },
  "Historia": { color: "#795548", theme: "brown" },
  "Mundiales": { color: "#ffd700", theme: "gold" },
  "Champions League": { color: "#0288d1", theme: "light-blue" }
};

const cards = [];

// Helper to push player card
function addPlayer(category, title, position, goals, champions, worldCups, iso, number, rarity, fact, themeClass) {
  cards.push({
    id: `${category.toLowerCase().replace(/[^a-z]/g, '')}_${title.toLowerCase().replace(/[^a-z]/g, '')}`,
    title,
    fact,
    rarity,
    category,
    color: CATEGORIES[category].color,
    themeClass: themeClass || (rarity === 'legendary' ? 'diamante' : (rarity === 'epic' ? 'oro' : (rarity === 'rare' ? 'plata' : 'bronce'))),
    position,
    goals,
    champions,
    worldCups,
    iso,
    number
  });
}

// Helper to push moment/history card
function addMoment(category, title, year, achievement, detail, rarity, themeClass) {
  cards.push({
    id: `${category.toLowerCase().replace(/[^a-z]/g, '')}_${title.toLowerCase().replace(/[^a-z]/g, '')}`,
    title,
    fact: detail,
    rarity,
    category,
    color: CATEGORIES[category].color,
    themeClass: themeClass || (rarity === 'legendary' ? 'diamante' : (rarity === 'epic' ? 'oro' : (rarity === 'rare' ? 'plata' : 'bronce'))),
    year,
    achievement,
    iso: "cup" // code to render a trophy/logo icon instead of a player face
  });
}

// ==================== ARGENTINA (25 CARDS) ====================
addPlayer("Argentina", "Lionel Messi", "DEL", 830, 4, 1, "ar", 10, "legendary", "Ganador de 8 Balones de Oro. Lideró a Argentina para ganar el Mundial de Qatar 2022 anotando en todas las fases.", "diamante");
addPlayer("Argentina", "Diego Maradona", "DEL", 345, 0, 1, "ar", 10, "legendary", "El 'Pibe de Oro' anotó el 'Gol del Siglo' y la 'Mano de Dios' contra Inglaterra en el Mundial de México 1986.", "diamante");
addPlayer("Argentina", "Alfredo Di Stéfano", "DEL", 512, 5, 0, "ar", 9, "legendary", "Mito de la historia del fútbol y único ganador del Súper Balón de Oro.", "diamante");
addPlayer("Argentina", "Ángel Di María", "MED", 165, 1, 1, "ar", 11, "epic", "Anotó los goles decisivos en las finales de los Juegos Olímpicos 2008, Copa América 2021 y el Mundial 2022.", "oro");
addPlayer("Argentina", "Mario Kempes", "DEL", 328, 0, 1, "ar", 10, "epic", "El 'Matador' fue goleador y figura indiscutida de Argentina campeona del mundo en 1978.", "oro");
addPlayer("Argentina", "Daniel Passarella", "DEF", 134, 0, 2, "ar", 19, "epic", "Único argentino bicampeón del mundo y uno de los mejores defensores cabeceadores de la historia.", "oro");
addPlayer("Argentina", "Gabriel Batistuta", "DEL", 300, 0, 0, "ar", 9, "epic", "'Batigol', poseedor de uno de los disparos más violentos y goleador letal en los años 90.", "oro");
addPlayer("Argentina", "Javier Zanetti", "DEF", 31, 1, 0, "ar", 4, "epic", "El 'Pupi', récord de presencias e icono absoluto de lealtad en el Inter de Milán.", "oro");
addPlayer("Argentina", "Emiliano Martínez", "POR", 0, 0, 1, "ar", 23, "rare", "Clave en la tanda de penales del Mundial 2022 con una legendaria atajada en el minuto 123 de la final.", "plata");
addPlayer("Argentina", "Lautaro Martínez", "DEL", 190, 0, 1, "ar", 22, "rare", "Goleador incansable de la Serie A y pieza clave de la Scaloneta.", "plata");
addPlayer("Argentina", "Alexis Mac Allister", "MED", 45, 0, 1, "ar", 20, "rare", "Cerebro y conductor del mediocampo de la selección y del Liverpool.", "plata");
addPlayer("Argentina", "Enzo Fernández", "MED", 25, 0, 1, "ar", 24, "rare", "Elegido mejor jugador joven en el Mundial de Qatar 2022.", "plata");
addPlayer("Argentina", "Rodrigo De Paul", "MED", 43, 0, 1, "ar", 7, "common", "El motor físico y protector incansable del mediocampo de la selección argentina.", "bronce");
addPlayer("Argentina", "Julián Álvarez", "DEL", 95, 1, 1, "ar", 9, "common", "El 'Araña', jugador con gran movilidad que ganó Mundial y Champions a muy temprana edad.", "bronce");
addPlayer("Argentina", "Cristian Romero", "DEF", 15, 0, 1, "ar", 13, "common", "El 'Cuti', defensor agresivo y tiempista, pilar de la zaga central albiceleste.", "bronce");
addPlayer("Argentina", "Nicolás Otamendi", "DEF", 25, 0, 1, "ar", 19, "common", "Veterano guerrero del área y capitán clave en las batallas defensivas.", "bronce");
addPlayer("Argentina", "Nahuel Molina", "DEF", 12, 0, 1, "ar", 26, "common", "Lateral derecho rápido que marcó un gran gol ante Países Bajos en el Mundial 2022.", "bronce");
addPlayer("Argentina", "Marcos Acuña", "DEF", 10, 0, 1, "ar", 8, "common", "El 'Huevo', defensor de gran empuje y resistencia por la banda izquierda.", "bronce");
addPlayer("Argentina", "Leandro Paredes", "MED", 18, 0, 1, "ar", 5, "common", "Distribuidor de juego clásico y mediocampista de corte elegante.", "bronce");
addPlayer("Argentina", "Giovani Lo Celso", "MED", 12, 0, 0, "ar", 16, "common", "Mediocampista creativo, asistidor en el gol de la Copa América 2024.", "bronce");
addPlayer("Argentina", "Nicolás Tagliafico", "DEF", 8, 0, 1, "ar", 3, "common", "Defensor regular y tácticamente disciplinado en la banda izquierda.", "bronce");
addPlayer("Argentina", "Paulo Dybala", "DEL", 150, 0, 1, "ar", 21, "common", "La 'Joya', atacante zurdo de exquisita pegada y técnica fina.", "bronce");
addPlayer("Argentina", "Gonzalo Higuaín", "DEL", 335, 0, 0, "ar", 9, "common", "Goleador histórico del Real Madrid, Nápoles y Juventus.", "bronce");
addPlayer("Argentina", "Sergio Agüero", "DEL", 380, 0, 0, "ar", 10, "common", "El 'Kun', leyenda máxima del Manchester City con goles agónicos históricos.", "bronce");
addPlayer("Argentina", "Franco Armani", "POR", 0, 0, 1, "ar", 1, "common", "Multicampeón arquero de River Plate y soporte de la selección.", "bronce");

// ==================== BRASIL (25 CARDS) ====================
addPlayer("Brasil", "Pelé", "DEL", 757, 0, 3, "br", 10, "legendary", "El único jugador en la historia en ganar 3 Copas del Mundo. Anotó más de 1000 goles en total en su vida.", "diamante");
addPlayer("Brasil", "Garrincha", "DEL", 232, 0, 2, "br", 7, "legendary", "La 'Alegría del Pueblo', regateador imposible con las piernas arqueadas que lideró el Mundial 1962.", "diamante");
addPlayer("Brasil", "Zico", "MED", 476, 0, 0, "br", 10, "legendary", "El 'Pelé Blanco', maestro del tiro libre y creador de juego exquisito de la década de los 80.", "diamante");
addPlayer("Brasil", "Ronaldo Nazário", "DEL", 414, 0, 2, "br", 9, "legendary", "El fenómeno. Fuerza física y velocidad arrolladora, máximo goleador del Mundial 2002.", "oro");
addPlayer("Brasil", "Ronaldinho Gaúcho", "MED", 266, 1, 1, "br", 10, "epic", "El mago del regate e inventor del Joga Bonito. Ganó todo divirtiéndose en la cancha.", "oro");
addPlayer("Brasil", "Neymar Jr", "DEL", 436, 1, 0, "br", 10, "epic", "Máximo goleador histórico oficial de Brasil, heredero de la fantasía del fútbol callejero.", "oro");
addPlayer("Brasil", "Romário", "DEL", 772, 0, 1, "br", 11, "epic", "El rey de la definición de puntín y devorador implacable del área en el Mundial 1994.", "oro");
addPlayer("Brasil", "Cafú", "DEF", 16, 0, 2, "br", 2, "epic", "Lateral derecho incansable, único jugador en disputar tres finales consecutivas de Mundiales.", "oro");
addPlayer("Brasil", "Roberto Carlos", "DEF", 113, 3, 1, "br", 6, "epic", "El cañón humano. Famoso por sus tiros libres que desafiaban las leyes de la física.", "oro");
addPlayer("Brasil", "Rivaldo", "MED", 353, 1, 1, "br", 10, "epic", "Zurda mágica, Balón de Oro y pieza clave del tridente fantástico del Mundial 2002.", "oro");
addPlayer("Brasil", "Kaká", "MED", 207, 1, 1, "br", 8, "epic", "Último mortal en ganar el Balón de Oro en la era previa al dominio de Messi y Cristiano.", "oro");
addPlayer("Brasil", "Socrates", "MED", 224, 0, 0, "br", 8, "epic", "El 'Doctor', líder intelectual de la Democracia Corinthiana y genio del pase de taco.", "oro");
addPlayer("Brasil", "Vinícius Jr", "DEL", 108, 2, 0, "br", 7, "rare", "Anotó goles decisivos en las finales de Champions League 2022 y 2024 con el Real Madrid.", "plata");
addPlayer("Brasil", "Rodrygo Goes", "DEL", 85, 2, 0, "br", 11, "rare", "Joven estrella del Real Madrid famoso por sus remontadas épicas en Champions.", "plata");
addPlayer("Brasil", "Casemiro", "MED", 55, 5, 0, "br", 5, "rare", "El muro defensivo de los cinco títulos de Champions del Real Madrid.", "plata");
addPlayer("Brasil", "Thiago Silva", "DEF", 37, 1, 0, "br", 3, "rare", "El 'Monstruo', defensor elegante y líder indiscutido del Chelsea y Milan.", "plata");
addPlayer("Brasil", "Alisson Becker", "POR", 1, 1, 0, "br", 1, "common", "Guardameta seguro de reflejos felinos y excelente juego de pies en el Liverpool.", "bronce");
addPlayer("Brasil", "Ederson Moraes", "POR", 0, 1, 0, "br", 23, "common", "Portero del Manchester City con el mejor pase largo de precisión de Europa.", "bronce");
addPlayer("Brasil", "Marquinhos", "DEF", 38, 0, 0, "br", 4, "common", "Capitán del PSG y mariscal de la zaga defensiva de Brasil.", "bronce");
addPlayer("Brasil", "Éder Militão", "DEF", 12, 2, 0, "br", 14, "common", "Defensor central veloz y con gran juego aéreo.", "bronce");
addPlayer("Brasil", "Bruno Guimarães", "MED", 22, 0, 0, "br", 8, "common", "Mediocampista dinámico y constructor de juego en el Newcastle.", "bronce");
addPlayer("Brasil", "Lucas Paquetá", "MED", 35, 0, 0, "br", 10, "common", "Creativo mediocampista de enlace dotado de gran habilidad técnica.", "bronce");
addPlayer("Brasil", "Gabriel Martinelli", "DEL", 45, 0, 0, "br", 11, "common", "Extremo del Arsenal con tremenda explosividad y definición rápida.", "bronce");
addPlayer("Brasil", "Raphinha", "DEL", 50, 0, 0, "br", 11, "common", "Extremo incansable del Barcelona de potente pegada de media distancia.", "bronce");
addPlayer("Brasil", "Richarlison", "DEL", 88, 0, 0, "br", 9, "common", "El 'Palomo', delantero de área que anotó el gol más hermoso del Mundial 2022.", "bronce");

// ==================== PORTUGAL (15 CARDS) ====================
addPlayer("Portugal", "Cristiano Ronaldo", "DEL", 890, 5, 0, "pt", 7, "legendary", "El máximo goleador de la historia del fútbol profesional y de la Champions League.", "diamante");
addPlayer("Portugal", "Eusébio", "DEL", 621, 1, 0, "pt", 9, "legendary", "La 'Pantera Negra', máximo goleador del Mundial 1966 e icono histórico de la nación.", "diamante");
addPlayer("Portugal", "Luís Figo", "MED", 133, 1, 0, "pt", 7, "epic", "Uno de los extremos más elegantes de la historia y ganador del Balón de Oro en el año 2000.", "oro");
addPlayer("Portugal", "Rui Costa", "MED", 97, 1, 0, "pt", 10, "epic", "El 'Maestro', el clásico enganche de técnica depurada que brilló en el AC Milan y Benfica.", "oro");
addPlayer("Portugal", "Deco", "MED", 74, 2, 0, "pt", 20, "epic", "Cerebro creativo que ganó Champions con Oporto y Barcelona con un juego sublime.", "oro");
addPlayer("Portugal", "Pepe", "DEF", 18, 3, 0, "pt", 3, "epic", "Leyenda defensiva eterna de agresividad táctica incomparable y longevidad única.", "oro");
addPlayer("Portugal", "Bernardo Silva", "MED", 93, 1, 0, "pt", 10, "rare", "El cerebral director de orquesta del mediocampo portugués y pieza clave del Manchester City.", "plata");
addPlayer("Portugal", "Bruno Fernandes", "MED", 152, 0, 0, "pt", 8, "rare", "Mediocampista ofensivo de gran pegada y líder del Manchester United.", "plata");
addPlayer("Portugal", "Rafael Leão", "DEL", 72, 0, 0, "pt", 17, "rare", "Extremo del AC Milan poseedor de una velocidad y zancada destructivas.", "plata");
addPlayer("Portugal", "Rúben Dias", "DEF", 17, 1, 0, "pt", 4, "common", "Muralla defensiva infranqueable nombrada mejor defensa de Europa en 2021.", "bronce");
addPlayer("Portugal", "Diogo Jota", "DEL", 98, 0, 0, "pt", 21, "common", "Atacante polivalente de gran olfato de gol en el Liverpool.", "bronce");
addPlayer("Portugal", "João Cancelo", "DEF", 26, 0, 0, "pt", 2, "common", "Lateral creativo con mentalidad de mediapunta ofensivo.", "bronce");
addPlayer("Portugal", "João Félix", "DEL", 75, 0, 0, "pt", 11, "common", "Atacante de gran talento natural y técnica depurada.", "bronce");
addPlayer("Portugal", "Nuno Mendes", "DEF", 6, 0, 0, "pt", 19, "common", "Lateral izquierdo ultra veloz del PSG de gran proyección.", "bronce");
addPlayer("Portugal", "Diogo Costa", "POR", 0, 0, 0, "pt", 22, "common", "Joven portero del Oporto que atajó 3 penales consecutivos en la Eurocopa 2024.", "bronce");

// ==================== FRANCIA (20 CARDS) ====================
addPlayer("Francia", "Zinedine Zidane", "MED", 156, 1, 1, "fr", 10, "legendary", "Anotó un legendario doblete de cabeza en la final del Mundial 1998 y una volea inolvidable en 2002.", "diamante");
addPlayer("Francia", "Michel Platini", "MED", 353, 1, 0, "fr", 10, "legendary", "Ganador de 3 Balones de Oro consecutivos y líder de la Eurocopa 1984.", "diamante");
addPlayer("Francia", "Just Fontaine", "DEL", 258, 0, 0, "fr", 9, "legendary", "Ostenta el récord de más goles en un solo Mundial: 13 goles en Suecia 1958.", "diamante");
addPlayer("Francia", "Kylian Mbappé", "DEL", 330, 0, 1, "fr", 10, "legendary", "Anotó un hat-trick en la final de Qatar 2022 y fue campeón mundial con 19 años en 2018.", "oro");
addPlayer("Francia", "Thierry Henry", "DEL", 411, 1, 1, "fr", 14, "epic", "Leyenda de los 'Invencibles' del Arsenal. Fusión de velocidad y definición clínica.", "oro");
addPlayer("Francia", "Patrick Vieira", "MED", 56, 0, 1, "fr", 4, "epic", "Mediocampista todoterreno defensivo de gran despliegue físico y capitanía.", "oro");
addPlayer("Francia", "Lilian Thuram", "DEF", 15, 0, 1, "fr", 15, "epic", "Defensor total que anotó sus dos únicos goles con Francia en la semifinal del Mundial 1998.", "oro");
addPlayer("Francia", "Franck Ribéry", "DEL", 168, 1, 0, "fr", 7, "epic", "'Scarface', extremo regateador letal que ganó el triplete con el Bayern de Múnich.", "oro");
addPlayer("Francia", "Karim Benzema", "DEL", 432, 5, 0, "fr", 9, "epic", "Ganador del Balón de Oro 2022 y pilar absoluto de la época moderna del Real Madrid.", "oro");
addPlayer("Francia", "Antoine Griezmann", "DEL", 244, 0, 1, "fr", 7, "rare", "Elegido MVP de la final del Mundial 2018. El cerebro táctico de 'Les Bleus'.", "plata");
addPlayer("Francia", "N'Golo Kanté", "MED", 25, 1, 1, "fr", 13, "rare", "Cubre el 70% del planeta. Ganó Premier con Leicester y Chelsea, Champions y Mundial.", "plata");
addPlayer("Francia", "Paul Pogba", "MED", 75, 0, 1, "fr", 6, "rare", "Mediocampista creativo de zancada imponente que anotó en la final del Mundial 2018.", "plata");
addPlayer("Francia", "Raphaël Varane", "DEF", 22, 4, 1, "fr", 4, "rare", "Defensor central elegante y sumamente veloz que lo ganó absolutamente todo.", "plata");
addPlayer("Francia", "Hugo Lloris", "POR", 0, 0, 1, "fr", 1, "common", "Portero y capitán legendario de la selección francesa campeona del mundo.", "bronce");
addPlayer("Francia", "Mike Maignan", "POR", 0, 0, 0, "fr", 16, "common", "'Magic Mike', portero de reflejos felinos y excelente atajador de penaltis del Milan.", "bronce");
addPlayer("Francia", "Theo Hernández", "DEF", 18, 0, 0, "fr", 22, "common", "Lateral izquierdo de zancada destructiva y gran capacidad ofensiva.", "bronce");
addPlayer("Francia", "William Saliba", "DEF", 5, 0, 0, "fr", 3, "common", "Joven zaguero central del Arsenal de excelente colocación y salida limpia.", "bronce");
addPlayer("Francia", "Aurélien Tchouaméni", "MED", 15, 1, 0, "fr", 8, "common", "Mediocampista defensivo de contención física en el Real Madrid.", "bronce");
addPlayer("Francia", "Eduardo Camavinga", "MED", 12, 2, 0, "fr", 6, "common", "Polivalente jugador de gran energía táctica que destaca en cualquier puesto.", "bronce");
addPlayer("Francia", "Ousmane Dembélé", "DEL", 65, 0, 1, "fr", 11, "common", "'El Mosquito', extremo desequilibrante por ambas bandas gracias a su ambidiestrismo.", "bronce");

// ==================== ESPAÑA (20 CARDS) ====================
addPlayer("España", "Andrés Iniesta", "MED", 93, 4, 1, "es", 6, "legendary", "Anotó el gol más importante de la historia de España en el minuto 116 de la final de Sudáfrica 2010.", "diamante");
addPlayer("España", "Xavi Hernández", "MED", 113, 4, 1, "es", 8, "legendary", "El metrónomo del tiqui-taca. Controló el ritmo del Barcelona y de la selección.", "diamante");
addPlayer("España", "Luis Suárez Miramontes", "MED", 172, 2, 0, "es", 10, "legendary", "El 'Arquitecto', único futbolista español masculino en ganar el Balón de Oro (1960).", "diamante");
addPlayer("España", "Iker Casillas", "POR", 0, 3, 1, "es", 1, "epic", "'San Iker', arquero milagroso que levantó el Mundial 2010 y dos Eurocopas.", "oro");
addPlayer("España", "Sergio Ramos", "DEF", 136, 4, 1, "es", 15, "epic", "Defensor ultra competitivo famoso por su agónico gol en el minuto 93 de la final de Champions 2014.", "oro");
addPlayer("España", "Raúl González", "DEL", 404, 3, 0, "es", 7, "epic", "El 'Ángel de Madrid', mítico goleador y capitán de pundonor del Real Madrid.", "oro");
addPlayer("España", "Carles Puyol", "DEF", 24, 3, 1, "es", 5, "epic", "'Tarzán', corazón, garra e integridad defensiva máxima de España y Barcelona.", "oro");
addPlayer("España", "David Villa", "DEL", 381, 1, 1, "es", 7, "epic", "'El Guaje', máximo goleador histórico de la selección y bota de plata de Sudáfrica 2010.", "oro");
addPlayer("España", "Fernando Torres", "DEL", 262, 1, 1, "es", 9, "epic", "'El Niño', anotó el gol decisivo en la final de la Eurocopa 2008 ante Alemania.", "oro");
addPlayer("España", "Rodri Hernández", "MED", 32, 1, 0, "es", 16, "rare", "El ancla moderna del fútbol, Balón de Oro y decisivo con sus goles en finales.", "plata");
addPlayer("España", "Sergio Busquets", "MED", 20, 3, 1, "es", 5, "rare", "Pivote defensivo táctico de inteligencia suprema para la salida limpia del balón.", "plata");
addPlayer("España", "Gerard Piqué", "DEF", 58, 4, 1, "es", 3, "rare", "Zaguero elegante del Barcelona multicampeón del sextete histórico.", "plata");
addPlayer("España", "Xabi Alonso", "MED", 82, 2, 1, "es", 14, "rare", "Precisión absoluta en pases de media y larga distancia y gran disparo de balón.", "plata");
addPlayer("España", "Dani Carvajal", "DEF", 18, 6, 0, "es", 2, "common", "Guerrero incansable de la banda derecha con seis copas de Champions League.", "bronce");
addPlayer("España", "Lamine Yamal", "DEL", 20, 0, 0, "es", 19, "common", "Sensacional joven prodigio que deslumbró y ganó la Eurocopa 2024 con solo 17 años.", "bronce");
addPlayer("España", "Nico Williams", "DEL", 35, 0, 0, "es", 17, "common", "Extremo del Athletic Club ultra rápido y revulsivo goleador de la Euro 2024.", "bronce");
addPlayer("España", "Álvaro Morata", "DEL", 215, 2, 0, "es", 7, "common", "Delantero de área batallador, capitán de la selección española campeona de la Euro 2024.", "bronce");
addPlayer("España", "Pedri González", "MED", 25, 0, 0, "es", 20, "common", "Conductor de juego de gran visión comparado constantemente con Iniesta.", "bronce");
addPlayer("España", "Gavi", "MED", 15, 0, 0, "es", 9, "common", "Corazón y empuje en el mediocampo barcelonista con entrega total al corte físico.", "bronce");
addPlayer("España", "Unai Simón", "POR", 0, 0, 0, "es", 23, "common", "Arquero seguro del Athletic de Bilbao clave en las tandas de penaltis internacionales.", "bronce");

// ==================== ALEMANIA (20 CARDS) ====================
addPlayer("Alemania", "Franz Beckenbauer", "DEF", 112, 3, 1, "de", 5, "legendary", "Creador del puesto de líbero moderno. Ganó el Mundial como jugador en 1974 y DT en 1990.", "diamante");
addPlayer("Alemania", "Gerd Müller", "DEL", 684, 3, 1, "de", 9, "legendary", "El torpedo. Anotó 68 goles en 62 partidos de selección y el gol decisivo en la final de 1974.", "diamante");
addPlayer("Alemania", "Lothar Matthäus", "MED", 204, 0, 1, "de", 10, "legendary", "El jugador con más partidos jugados en Copas del Mundo (25) y ganador del Balón de Oro 1990.", "diamante");
addPlayer("Alemania", "Oliver Kahn", "POR", 0, 1, 0, "de", 1, "epic", "El titán. Único arquero elegido Balón de Oro del Mundial por su actuación en 2002.", "oro");
addPlayer("Alemania", "Miroslav Klose", "DEL", 258, 0, 1, "de", 11, "epic", "El máximo goleador de la historia de las Copas del Mundo con 16 goles.", "oro");
addPlayer("Alemania", "Karl-Heinz Rummenigge", "DEL", 218, 2, 0, "de", 11, "epic", "Delantero veloz de gran pegada y dos veces ganador del Balón de Oro consecutivo.", "oro");
addPlayer("Alemania", "Philipp Lahm", "DEF", 22, 1, 1, "de", 16, "epic", "El lateral perfecto de inteligencia táctica absoluta que levantó la Copa de 2014.", "oro");
addPlayer("Alemania", "Bastian Schweinsteiger", "MED", 68, 1, 1, "de", 7, "epic", "'El Jefe', guerrero táctico que sangró en la épica final del Mundial de Brasil 2014.", "oro");
addPlayer("Alemania", "Toni Kroos", "MED", 73, 6, 1, "de", 8, "epic", "Precisión milimétrica pasadora alemana. Leyenda de seis Champions y el Mundial 2014.", "oro");
addPlayer("Alemania", "Thomas Müller", "MED", 270, 2, 1, "de", 25, "rare", "El 'Raumdeuter' (intérprete del espacio), pillo de área y gran anotador de Mundiales.", "plata");
addPlayer("Alemania", "Manuel Neuer", "POR", 0, 2, 1, "de", 1, "rare", "Revolucionó el rol del portero moderno actuando como líbero adelantado.", "plata");
addPlayer("Alemania", "Sepp Maier", "POR", 0, 3, 1, "de", 1, "rare", "Arquero del histórico Bayern y selección alemana campeona de los años 70.", "plata");
addPlayer("Alemania", "Michael Ballack", "MED", 145, 0, 0, "de", 13, "rare", "Mediocampista potente de gran cabezazo y remate de larga distancia.", "plata");
addPlayer("Alemania", "Joshua Kimmich", "MED", 40, 1, 0, "de", 6, "common", "Polivalente y tenaz jugador de gran carácter y despliegue del Bayern de Múnich.", "bronce");
addPlayer("Alemania", "İlkay Gündoğan", "MED", 90, 1, 0, "de", 21, "common", "Interior llegador de área que lideró el triplete histórico del Manchester City.", "bronce");
addPlayer("Alemania", "Leroy Sané", "DEL", 80, 0, 0, "de", 19, "common", "Extremo del Bayern de Múnich poseedor de una aceleración imparable.", "bronce");
addPlayer("Alemania", "Jamal Musiala", "MED", 45, 0, 0, "de", 10, "common", "'Bambi', joven talento del regate en espacios cortos del Bayern y Alemania.", "bronce");
addPlayer("Alemania", "Florian Wirtz", "MED", 35, 0, 0, "de", 10, "common", "Mago del mediocampo del histórico Bayer Leverkusen invicto de Xabi Alonso.", "bronce");
addPlayer("Alemania", "Antonio Rüdiger", "DEF", 18, 2, 0, "de", 2, "common", "Zaguero central del Real Madrid famoso por su agresividad e imponente fuerza física.", "bronce");
addPlayer("Alemania", "Marc-André ter Stegen", "POR", 0, 1, 0, "de", 22, "common", "Muro del Barcelona con excelente control de pies y reflejos mano a mano.", "bronce");

// ==================== INGLATERRA (20 CARDS) ====================
addPlayer("Inglaterra", "Bobby Charlton", "MED", 249, 1, 1, "gb-eng", 9, "legendary", "Leyenda del Manchester United y superviviente de Múnich. Campeón del mundo en 1966.", "diamante");
addPlayer("Inglaterra", "Bobby Moore", "DEF", 27, 0, 1, "gb-eng", 6, "legendary", "Capitán ejemplar y legendario defensor alabado por Pelé como el más limpio del mundo.", "diamante");
addPlayer("Inglaterra", "Gary Lineker", "DEL", 281, 0, 0, "gb-eng", 10, "legendary", "Goleador máximo del Mundial México 1986 y caballero del juego (nunca vio una tarjeta).", "diamante");
addPlayer("Inglaterra", "David Beckham", "MED", 127, 1, 0, "gb-eng", 7, "epic", "Famoso por su golpeo curvo de tiros libres 'Bend it like Beckham' y sus pases largos.", "oro");
addPlayer("Inglaterra", "Wayne Rooney", "DEL", 313, 1, 0, "gb-eng", 10, "epic", "'Wazza', icono de fuerza y goles espectaculares del Manchester United.", "oro");
addPlayer("Inglaterra", "Steven Gerrard", "MED", 186, 1, 0, "gb-eng", 8, "epic", "El eterno capitán de Anfield que lideró la milagrosa remontada en Estambul 2005.", "oro");
addPlayer("Inglaterra", "Frank Lampard", "MED", 274, 1, 0, "gb-eng", 8, "epic", "El mediocampista más goleador de la historia de la Premier League con el Chelsea.", "oro");
addPlayer("Inglaterra", "Alan Shearer", "DEL", 379, 0, 0, "gb-eng", 9, "epic", "El máximo goleador de toda la historia de la Premier League con 260 goles oficiales.", "oro");
addPlayer("Inglaterra", "Paul Gascoigne", "MED", 110, 0, 0, "gb-eng", 19, "epic", "'Gazza', el genio rebelde del mediocampo inglés de talento indomable y carismático.", "oro");
addPlayer("Inglaterra", "Harry Kane", "DEL", 380, 0, 0, "gb-eng", 9, "rare", "Máximo anotador histórico de la selección inglesa y Bota de Oro del Mundial 2018.", "plata");
addPlayer("Inglaterra", "Jude Bellingham", "MED", 65, 1, 0, "gb-eng", 10, "rare", "Estrella estelar que conquistó al Real Madrid ganando Champions y Liga a corta edad.", "plata");
addPlayer("Inglaterra", "John Terry", "DEF", 41, 1, 0, "gb-eng", 26, "rare", "Capitán aguerrido y líder defensivo indiscutido de la época dorada del Chelsea.", "plata");
addPlayer("Inglaterra", "Rio Ferdinand", "DEF", 15, 1, 0, "gb-eng", 5, "rare", "Zaguero central imponente de gran salida y técnica en el Manchester United.", "plata");
addPlayer("Inglaterra", "Bukayo Saka", "DEL", 75, 0, 0, "gb-eng", 7, "common", "Extremo estrella del Arsenal de gran desborde y carisma en la selección.", "bronce");
addPlayer("Inglaterra", "Phil Foden", "MED", 85, 1, 0, "gb-eng", 11, "common", "El 'Stockport Messi', hábil atacante de gran golpeo de zurda y regate en el City.", "bronce");
addPlayer("Inglaterra", "Declan Rice", "MED", 25, 0, 0, "gb-eng", 4, "common", "Pulmón defensivo y destructor del mediocampo del Arsenal.", "bronce");
addPlayer("Inglaterra", "Cole Palmer", "MED", 40, 0, 0, "gb-eng", 20, "common", "'Cold Palmer', especialista en penales de asombrosa frialdad ofensiva.", "bronce");
addPlayer("Inglaterra", "Kyle Walker", "DEF", 10, 1, 0, "gb-eng", 2, "common", "El lateral más veloz del mundo capaz de frenar a los extremos más rápidos.", "bronce");
addPlayer("Inglaterra", "Trent Alexander-Arnold", "DEF", 20, 1, 0, "gb-eng", 66, "common", "Lateral del Liverpool con una pegada y visión de juego idéntica a la de un mediocampista.", "bronce");
addPlayer("Inglaterra", "Jordan Pickford", "POR", 0, 0, 0, "gb-eng", 1, "common", "Arquero titular inglés especialista en parar penaltis en fases finales.", "bronce");

// ==================== ITALIA (20 CARDS) ====================
addPlayer("Italia", "Paolo Maldini", "DEF", 40, 5, 0, "it", 3, "legendary", "Símbolo de lealtad extrema al AC Milan durante 25 temporadas y 5 Copas de Europa.", "diamante");
addPlayer("Italia", "Roberto Baggio", "DEL", 291, 0, 0, "it", 10, "legendary", "El 'Codino' (Coleta Divina), genio del regate y fantasía pura que rozó el Mundial 94.", "diamante");
addPlayer("Italia", "Gianni Rivera", "MED", 160, 2, 0, "it", 10, "legendary", "El 'Golden Boy', primer balón de oro italiano de nacimiento y leyenda de la Copa de Europa.", "diamante");
addPlayer("Italia", "Gianluigi Buffon", "POR", 0, 0, 1, "it", 1, "epic", "Leyenda de los tres postes con más presencias e historia en la Serie A y campeón 2006.", "oro");
addPlayer("Italia", "Andrea Pirlo", "MED", 86, 2, 1, "it", 21, "epic", "El maestro del tiro libre y pase milimétrico sin mirar que dirigió el Mundial 2006.", "oro");
addPlayer("Italia", "Alessandro Del Piero", "DEL", 343, 1, 1, "it", 10, "epic", "'Pinturicchio', definidor del tiro con rosca y emblema total de la Juventus.", "oro");
addPlayer("Italia", "Francesco Totti", "DEL", 307, 0, 1, "it", 10, "epic", "El eterno Emperador de la Roma que ganó el Mundial 2006 con su cuchara clásica.", "oro");
addPlayer("Italia", "Franco Baresi", "DEF", 31, 3, 0, "it", 6, "epic", "Líbero legendario que dirigió la zaga defensiva perfecta del Milan de Sacchi.", "oro");
addPlayer("Italia", "Fabio Cannavaro", "DEF", 18, 0, 1, "it", 5, "epic", "'El Muro de Berlín', Balón de Oro 2006 tras una actuación defensiva perfecta.", "oro");
addPlayer("Italia", "Dino Zoff", "POR", 0, 0, 1, "it", 1, "epic", "El arquero más longevo en coronarse campeón del mundo con 40 años en España 1982.", "oro");
addPlayer("Italia", "Gennaro Gattuso", "MED", 17, 2, 1, "it", 8, "rare", "'Ringhio', gladiador del mediocampo de entrega física intimidante.", "plata");
addPlayer("Italia", "Giorgio Chiellini", "DEF", 44, 0, 0, "it", 3, "rare", "Guerrero de mil batallas de férrea marca y campeón de la Eurocopa 2020.", "plata");
addPlayer("Italia", "Leonardo Bonucci", "DEF", 35, 0, 0, "it", 19, "rare", "Zaguero de gran pase largo que anotó en la final de la Eurocopa 2020.", "plata");
addPlayer("Italia", "Gianluca Zambrotta", "DEF", 12, 0, 1, "it", 19, "common", "Lateral polivalente de excelente proyección campeón del mundo en 2006.", "bronce");
addPlayer("Italia", "Marco Verratti", "MED", 15, 0, 0, "it", 6, "common", "Volante mixto de retención de balón y regate en su propia área.", "bronce");
addPlayer("Italia", "Nicolò Barella", "MED", 35, 0, 0, "it", 18, "common", "Motor del mediocampo del Inter campeón del Scudetto y de la Euro 2020.", "bronce");
addPlayer("Italia", "Federico Chiesa", "DEL", 55, 0, 0, "it", 14, "common", "Atacante eléctrico de gran desborde y empuje en el área.", "bronce");
addPlayer("Italia", "Gianluigi Donnarumma", "POR", 0, 0, 0, "it", 1, "common", "Héroe en la tanda de penales y MVP de la Eurocopa 2020 con solo 22 años.", "bronce");
addPlayer("Italia", "Alessandro Bastoni", "DEF", 8, 0, 0, "it", 95, "common", "Joven zaguero de gran envergadura física y salida refinada.", "bronce");
addPlayer("Italia", "Ciro Immobile", "DEL", 200, 0, 0, "it", 17, "common", "Goleador implacable ganador de la Bota de Oro de Europa en 2020.", "bronce");

// ==================== NORTEAMÉRICA (10 CARDS) ====================
addPlayer("Norteamérica", "Hugo Sánchez", "DEL", 400, 0, 0, "mx", 9, "legendary", "Pentapichichi mexicano. Maestro indiscutido de las chilenas y remates al primer toque en el Madrid.", "diamante");
addPlayer("Norteamérica", "Alphonso Davies", "DEF", 25, 1, 0, "ca", 19, "epic", "El correcaminos canadiense de banda izquierda, multicampeón con el Bayern.", "oro");
addPlayer("Norteamérica", "Christian Pulisic", "DEL", 80, 1, 0, "us", 11, "rare", "'Capitán América', veloz extremo campeón de Champions con el Chelsea.", "plata");
addPlayer("Norteamérica", "Clint Dempsey", "DEL", 125, 0, 0, "us", 8, "rare", "Goleador histórico de EE.UU. con un carácter aguerrido inolvidable en la Premier.", "plata");
addPlayer("Norteamérica", "Landon Donovan", "MED", 145, 0, 0, "us", 10, "rare", "'Captain Landy', icono de la MLS y pesadilla constante en los clásicos de Concacaf.", "plata");
addPlayer("Norteamérica", "Rafael Márquez", "DEF", 35, 2, 0, "mx", 4, "epic", "El 'Káiser de Michoacán', defensor elegante multicampeón con el Barcelona.", "oro");
addPlayer("Norteamérica", "Guillermo Ochoa", "POR", 0, 0, 0, "mx", 13, "common", "'Memo', portero mundialista que se agiganta con atajadas imposibles en Copas del Mundo.", "bronce");
addPlayer("Norteamérica", "Javier Hernández", "DEL", 210, 0, 0, "mx", 14, "common", "'Chicharito', máximo goleador histórico de México y oportunista de área.", "bronce");
addPlayer("Norteamérica", "Weston McKennie", "MED", 30, 0, 0, "us", 8, "common", "Volante todoterreno estadounidense de gran presencia física y juego aéreo.", "bronce");
addPlayer("Norteamérica", "Jonathan David", "DEL", 92, 0, 0, "ca", 9, "common", "Letal delantero canadiense goleador constante de la Ligue 1.", "bronce");

// ==================== CENTROAMÉRICA (10 CARDS) ====================
addPlayer("Centroamérica", "Mágico González", "DEL", 120, 0, 0, "sv", 10, "legendary", "Genio del regate indomable que maravilló a España jugando en el Cádiz. Admirado por Maradona.", "diamante");
addPlayer("Centroamérica", "Keylor Navas", "POR", 0, 3, 0, "cr", 1, "legendary", "El 'Halcón', arquero costarricense del tricampeonato consecutivo de Champions del Madrid.", "diamante");
addPlayer("Centroamérica", "Dwight Yorke", "DEL", 175, 1, 0, "tt", 19, "epic", "El sonriente delantero de Trinidad y Tobago clave en el histórico triplete del Manchester United.", "oro");
addPlayer("Centroamérica", "Julio Dely Valdés", "DEL", 150, 0, 0, "pa", 9, "rare", "'El Panagol', uno de los mejores cabeceadores que ha jugado en LaLiga.", "plata");
addPlayer("Centroamérica", "Bryan Ruiz", "MED", 110, 0, 0, "cr", 10, "rare", "La 'Comadreja', capitán elegante que lideró a Costa Rica al histórico quinto partido en 2014.", "plata");
addPlayer("Centroamérica", "Amado Guevara", "MED", 88, 0, 0, "hn", 20, "common", "El 'Lobo', leyenda y gran capitán del mediocampo de la selección de Honduras.", "bronce");
addPlayer("Centroamérica", "Carlos Ruiz", "DEL", 133, 0, 0, "gt", 20, "common", "'El Pescadito', máximo anotador de la historia de las eliminatorias mundialistas.", "bronce");
addPlayer("Centroamérica", "Waston Kendall", "DEF", 15, 0, 0, "cr", 19, "common", "Torre costarricense de gran envergadura temible en los balones parados.", "bronce");
addPlayer("Centroamérica", "Alberth Elis", "DEL", 55, 0, 0, "hn", 7, "common", "'La Panterita', delantero hondureño de tremenda zancada y velocidad por banda.", "bronce");
addPlayer("Centroamérica", "Adalberto Carrasquilla", "MED", 15, 0, 0, "pa", 8, "common", "El cerebral mediocampista panameño revelación de la Copa Oro.", "bronce");

// ==================== ASIA (10 CARDS) ====================
addPlayer("Asia", "Son Heung-min", "DEL", 210, 0, 0, "kr", 7, "legendary", "Extremo surcoreano de velocidad y definición ambidiestra estelar en el Tottenham.", "diamante");
addPlayer("Asia", "Hidetoshi Nakata", "MED", 45, 0, 0, "jp", 7, "epic", "Icono absoluto del fútbol asiático que triunfó con estilo en la Serie A italiana.", "oro");
addPlayer("Asia", "Park Ji-sung", "MED", 58, 1, 0, "kr", 13, "epic", "El hombre con tres pulmones. El comodín defensivo predilecto de Alex Ferguson.", "oro");
addPlayer("Asia", "Shunsuke Nakamura", "MED", 90, 0, 0, "jp", 10, "rare", "Genio del balón parado con una zurda milimétrica legendaria en el Celtic.", "plata");
addPlayer("Asia", "Keisuke Honda", "MED", 85, 0, 0, "jp", 4, "rare", "Único jugador japonés en marcar en tres Copas del Mundo diferentes.", "plata");
addPlayer("Asia", "Mehdi Taremi", "DEL", 185, 0, 0, "ir", 9, "common", "Goleador iraní letal en el área con gran rendimiento en la Champions.", "bronce");
addPlayer("Asia", "Kaoru Mitoma", "DEL", 45, 0, 0, "jp", 7, "common", "Extremo que estudió una tesis universitaria sobre el arte del regate uno contra uno.", "bronce");
addPlayer("Asia", "Takefusa Kubo", "DEL", 38, 0, 0, "jp", 14, "common", "'Take', habilidoso mediapunta japonés dotado de un regate escurridizo.", "bronce");
addPlayer("Asia", "Wataru Endo", "MED", 15, 0, 0, "jp", 3, "common", "Incansable recuperador de balones y guerrero táctico del Liverpool.", "bronce");
addPlayer("Asia", "Sardar Azmoun", "DEL", 82, 0, 0, "ir", 20, "common", "Delantero iraní apodado el 'Messi de Irán' por su gran juego aéreo y agilidad.", "bronce");

// ==================== ÁFRICA (20 CARDS) ====================
addPlayer("África", "Didier Drogba", "DEL", 362, 1, 0, "ci", 11, "legendary", "El rey de las finales en Wembley que detuvo una guerra civil en Costa de Marfil con su voz.", "diamante");
addPlayer("África", "Samuel Eto'o", "DEL", 426, 3, 0, "cm", 9, "legendary", "El 'León Indomable', delantero letal ganador de dos tripletes seguidos (Barça e Inter).", "diamante");
addPlayer("África", "George Weah", "DEL", 193, 0, 0, "lr", 9, "legendary", "Único futbolista africano en ganar el Balón de Oro en toda la historia (1995).", "diamante");
addPlayer("África", "Mohamed Salah", "DEL", 280, 1, 0, "eg", 11, "epic", "El 'Faraón', rey del gol en la Premier League y leyenda moderna del Liverpool.", "oro");
addPlayer("África", "Sadio Mané", "DEL", 210, 1, 0, "sn", 10, "epic", "Delantero veloz que llevó a Senegal a coronarse campeona histórica de África en 2022.", "oro");
addPlayer("África", "Yaya Touré", "MED", 105, 1, 0, "ci", 42, "epic", "Poderío físico y técnica exquisita combinados en el histórico mediocampo del City y Barça.", "oro");
addPlayer("África", "Michael Essien", "MED", 45, 1, 0, "gh", 8, "epic", "'El Búfalo', centrocampista devastador en la recuperación y disparo en el Chelsea.", "oro");
addPlayer("África", "Roger Milla", "DEL", 405, 0, 0, "cm", 9, "epic", "Famoso por sus bailes en el córner tras anotar con 42 años en el Mundial 1994.", "oro");
addPlayer("África", "Riyad Mahrez", "DEL", 120, 1, 0, "dz", 26, "rare", "Extremo argelino de zurda de seda que obró el milagro del Leicester en 2016.", "plata");
addPlayer("África", "Victor Osimhen", "DEL", 114, 0, 0, "ng", 9, "rare", "Delantero nigeriano con máscara protectora que lideró al Nápoles campeón tras 33 años.", "plata");
addPlayer("África", "Achraf Hakimi", "DEF", 32, 0, 0, "ma", 2, "rare", "Lateral derecho ultra veloz pilar del Marruecos semifinalista de Qatar 2022.", "plata");
addPlayer("África", "Yassine Bounou", "POR", 1, 0, 0, "ma", 1, "rare", "'Bono', portero marroquí héroe de las tandas de penaltis del Sevilla y del Mundial.", "plata");
addPlayer("África", "Thomas Partey", "MED", 25, 0, 0, "gh", 5, "common", "Mediocampista de contención ghanés de juego limpio y despliegue físico.", "bronce");
addPlayer("África", "Sébastien Haller", "DEL", 118, 0, 0, "ci", 22, "common", "Delantero marfileño de área que superó el cáncer para anotar el gol campeón de África.", "bronce");
addPlayer("África", "Kalidou Koulibaly", "DEF", 18, 0, 0, "sn", 3, "common", "Mariscal defensivo senegalés de gran fortaleza y capitanía.", "bronce");
addPlayer("África", "Pierre-Emerick Aubameyang", "DEL", 312, 0, 0, "ga", 14, "common", "Goleador gabonés veloz y acrobático, bota de oro en Alemania e Inglaterra.", "bronce");
addPlayer("África", "Vincent Aboubakar", "DEL", 145, 0, 0, "cm", 10, "common", "Delantero camerunés de potencia de fuego física y goles increíbles.", "bronce");
addPlayer("África", "Edouard Mendy", "POR", 0, 1, 0, "sn", 16, "common", "Portero senegalés elegido el mejor de Europa tras ganar la Champions con el Chelsea.", "bronce");
addPlayer("África", "Sofyan Amrabat", "MED", 8, 0, 0, "ma", 4, "common", "Incansable tractor defensivo marroquí, revelación táctica de Qatar 2022.", "bronce");
addPlayer("África", "Wilfried Zaha", "DEL", 95, 0, 0, "ci", 11, "common", "Habilidoso extremo marfileño especialista en desbordes y regates.", "bronce");

// ==================== EUROPA RESTO (25 CARDS) ====================
addPlayer("Europa", "Luka Modrić", "MED", 90, 6, 0, "hr", 10, "legendary", "El genio croata del exterior del pie. Ganador de 6 Champions y Balón de Oro en 2018.", "diamante");
addPlayer("Europa", "Johan Cruyff", "DEL", 401, 3, 0, "nl", 14, "legendary", "El padre del fútbol total. Tres Balones de Oro y creador de la escuela del Barcelona.", "diamante");
addPlayer("Europa", "Marco van Basten", "DEL", 301, 3, 0, "nl", 9, "legendary", "El cisne de Utrecht. Anotó una volea imposible en la final de la Euro 1988.", "diamante");
addPlayer("Europa", "Zlatan Ibrahimović", "DEL", 496, 0, 0, "se", 11, "legendary", "El cinturón negro del gol. Goles acrobáticos imposibles y carácter gigante.", "diamante");
addPlayer("Europa", "Robert Lewandowski", "DEL", 560, 1, 0, "pl", 9, "legendary", "Máquina polaca del gol, anotó 5 goles en 9 minutos con el Bayern de Múnich.", "oro");
addPlayer("Europa", "Ruud Gullit", "MED", 175, 2, 0, "nl", 10, "epic", "Potencia, polivalencia y peinado rasta. Lideró al Milan de los holandeses.", "oro");
addPlayer("Europa", "Andriy Shevchenko", "DEL", 326, 1, 0, "ua", 7, "epic", "El bólido de Kiev, Balón de Oro y definidor temible del AC Milan.", "oro");
addPlayer("Europa", "Erling Haaland", "DEL", 225, 1, 0, "no", 9, "epic", "El cyborg noruego del gol. Récord absoluto de goles en una temporada de Premier.", "oro");
addPlayer("Europa", "Ferenc Puskás", "DEL", 746, 3, 0, "hu", 10, "legendary", "El cañoncito pum. Zurda demoledora con promedios goleadores insuperables.", "diamante");
addPlayer("Europa", "Gareth Bale", "DEL", 185, 5, 0, "gb-wls", 11, "epic", "El expreso de Cardiff, famoso por su gol de chalaca en la final de Champions 2018.", "oro");
addPlayer("Europa", "George Best", "DEL", 205, 1, 0, "gb-nir", 7, "epic", "El quinto Beatle. Habilidad mágica de regate en campos de barro con el United.", "oro");
addPlayer("Europa", "Jan Oblak", "POR", 0, 0, 0, "si", 13, "rare", "Muro esloveno del Atlético de Madrid, cinco veces trofeo Zamora de LaLiga.", "plata");
addPlayer("Europa", "Christian Eriksen", "MED", 110, 0, 0, "dk", 10, "rare", "Volante creativo danés con golpeo clínico de tiro libre y visión periférica.", "plata");
addPlayer("Europa", "David Alaba", "DEF", 45, 3, 0, "at", 4, "rare", "Defensor polivalente austriaco que brilla de central, lateral y mediocampista.", "plata");
addPlayer("Europa", "Arjen Robben", "DEL", 209, 1, 0, "nl", 10, "epic", "Famoso por su jugada patentada de recortar hacia adentro y disparar al segundo palo.", "oro");
addPlayer("Europa", "Wesley Sneijder", "MED", 95, 1, 0, "nl", 10, "epic", "El francotirador neerlandés que rozó el Mundial y ganó el triplete con Inter en 2010.", "oro");
addPlayer("Europa", "Peter Schmeichel", "POR", 1, 1, 0, "dk", 1, "epic", "El gran danés. Presencia intimidante bajo los tres palos del United campeón del triplete.", "oro");
addPlayer("Europa", "Virgil van Dijk", "DEF", 30, 1, 0, "nl", 4, "rare", "El defensor central más completo de la Premier moderna por colocación y fuerza.", "plata");
addPlayer("Europa", "Henrikh Mkhitaryan", "MED", 115, 0, 0, "am", 22, "common", "Mediocampista creativo armenio de gran inteligencia de juego en el Inter.", "bronce");
addPlayer("Europa", "Dušan Vlahović", "DEL", 88, 0, 0, "rs", 9, "common", "Goleador serbio letal de gran presencia física en la Juventus.", "bronce");
addPlayer("Europa", "Alexander Isak", "DEL", 78, 0, 0, "se", 14, "common", "Delantero sueco de zancada rápida y hábil regate en el Newcastle.", "bronce");
addPlayer("Europa", "Dominik Szoboszlai", "MED", 45, 0, 0, "hu", 8, "common", "Conductor húngaro del Liverpool de potente pegada de balón parado.", "bronce");
addPlayer("Europa", "Josko Gvardiol", "DEF", 15, 1, 0, "hr", 4, "common", "Joven zaguero croata de gran versatilidad física del Manchester City.", "bronce");
addPlayer("Europa", "Martin Ødegaard", "MED", 48, 0, 0, "no", 10, "common", "Capitán creativo y director de juego indispensable del Arsenal.", "bronce");
addPlayer("Europa", "Khvicha Kvaratskhelia", "DEL", 48, 0, 0, "ge", 77, "common", "'Kvaradona', extremo georgiano de regate impredecible campeón con el Nápoles.", "bronce");

// ==================== HISTORIA (40 CARDS) ====================
addMoment("Historia", "Reglas de Sheffield", 1857, "Primer Reglamento", "Se definieron el tiro libre indirecto, los tiros de esquina y el primer club: Sheffield FC.", "legendary");
addMoment("Historia", "Nace la FIFA", 1904, "Fundación", "Siete países fundan en París la Federación Internacional de Fútbol Asociación.", "legendary");
addMoment("Historia", "La Tragedia de Superga", 1949, "Homenaje", "El accidente aéreo que extinguió al 'Grande Torino', el mejor equipo italiano de la época.", "epic");
addMoment("Historia", "El Desastre de Múnich", 1958, "Homenaje", "Trágico accidente del Manchester United de los 'Busby Babes'. De las cenizas renació el club.", "epic");
addMoment("Historia", "Fútbol en TV", 1937, "Transmisión", "Primer partido de fútbol televisado de la historia: un partido de práctica del Arsenal.", "rare");
addMoment("Historia", "El Balón de Oro", 1956, "Premio", "Creado por France Football. Stanley Matthews fue el primer ganador histórico.", "rare");
addMoment("Historia", "Las Tarjetas Roja y Amarilla", 1970, "Arbitraje", "Propuestas por Ken Aston e inspiradas en semáforos, debutaron en el Mundial de México.", "rare");
addMoment("Historia", "La Ley Bosman", 1995, "Fútbol Moderno", "El Tribunal de la UE autoriza el libre tránsito de jugadores comunitarios sin cupo extranjero.", "rare");
addMoment("Historia", "La Tragedia de Hillsborough", 1989, "Homenaje", "Trágico suceso en Sheffield que reformó para siempre la seguridad en estadios del mundo.", "rare");
addMoment("Historia", "El Primer Club Femenil", 1894, "Fútbol Femenil", "Fundación del British Ladies' Football Club, pionero de las mujeres en este deporte.", "epic");
addMoment("Historia", "Tiro Libre con Barrera", 1913, "Regla", "Se oficializa que los defensores deben situarse a 9.15 metros del balón en tiros libres.", "common");
addMoment("Historia", "Pelota de Cuero Pesada", 1930, "Equipamiento", "Los primeros balones se cosían a mano y al mojarse duplicaban su peso original.", "common");
addMoment("Historia", "Los Primeros Guantes", 1970, "Equipamiento", "Los porteros no solían usar guantes hasta los años 70. Se usaban de lana en climas fríos.", "common");
addMoment("Historia", "Botines con Tapones", 1954, "Equipamiento", "Alemania ganó el Mundial 54 gracias a botines con tacos intercambiables contra la lluvia.", "rare");
addMoment("Historia", "Introducción del VAR", 2018, "Tecnología", "El Árbitro de Asistente de Video debuta oficialmente en un Mundial de Fútbol.", "common");
addMoment("Historia", "Gol Fantasma de Wembley", 1966, "Polémica", "El balón que pegó en el travesaño en la final de 1966 y validó el título inglés sin entrar.", "rare");
addMoment("Historia", "El Rey Pelé debuta", 1956, "Debut Legendario", "Pelé debuta a los 15 años con el Santos marcando un gol inmediato.", "epic");
addMoment("Historia", "Cinco Goles de Lewandowski", 2015, "Récord", "El delantero polaco anota 5 goles en 9 minutos saliendo desde el banquillo.", "epic");
addMoment("Historia", "El Partido de los Tres Tiempos", 1921, "Curiosidad", "En Inglaterra se jugaron 3 tiempos de 30 minutos debido a un malentendido de hora.", "common");
addMoment("Historia", "Tregua de Navidad", 1914, "Paz", "Soldados alemanes y británicos detuvieron la Primera Guerra Mundial para jugar al fútbol.", "legendary");
addMoment("Historia", "La Copa Jules Rimet", 1930, "Trofeo", "El trofeo original del Mundial, robado y fundido en Brasil en el año 1983.", "rare");
addMoment("Historia", "El Estadio de Wembley", 1923, "Estadio Mítico", "Inaugurado con la final de la Copa del Caballo Blanco con más de 120,000 espectadores.", "epic");
addMoment("Historia", "La Bombonera", 1940, "Estadio Mítico", "El famoso estadio de Boca Juniors conocido porque tiembla debido a su estructura.", "common");
addMoment("Historia", "El Santiago Bernabéu", 1947, "Estadio Mítico", "Catedral blanca del Real Madrid nombrada en honor a su mítico presidente gestor.", "common");
addMoment("Historia", "El Camp Nou", 1957, "Estadio Mítico", "El coliseo del Barcelona, el estadio con mayor capacidad de toda Europa.", "common");
addMoment("Historia", "Maracaná Gigante", 1950, "Estadio Mítico", "Llegó a albergar casi 200,000 personas en la final del Mundial de 1950.", "epic");
addMoment("Historia", "El Calcio Fiorentino", 1500, "Antecedente", "Juego medieval italiano muy violento antecesor del fútbol moderno en Florencia.", "common");
addMoment("Historia", "El Gol 1000 de Pelé", 1969, "Hito", "Pelé anota su gol número mil de penal en un estadio Maracaná que estalló de júbilo.", "epic");
addMoment("Historia", "Fundación del Real Madrid", 1902, "Club de Leyenda", "Nace el Madrid Football Club, el equipo más laureado del siglo XX según la FIFA.", "epic");
addMoment("Historia", "La Tragedia de Múnich 1972", 1972, "Homenaje", "El fútbol se solidariza con las víctimas olímpicas de la delegación israelí.", "common");
addMoment("Historia", "Sextete del Barcelona", 2009, "Hito", "El Barça de Guardiola gana los 6 títulos posibles en un solo año natural.", "epic");
addMoment("Historia", "Los Invencibles del Arsenal", 2004, "Hito", "El Arsenal gana la Premier League invicto con 26 victorias y 12 empates.", "epic");
addMoment("Historia", "Leicester Campeón", 2016, "Milagro", "El modesto club inglés gana la Premier desafiando las apuestas de 5000 a 1.", "epic");
addMoment("Historia", "Gol número 100 de Messi", 2018, "Hito", "Lionel Messi alcanza cifras goleadoras insólitas en la historia del Barcelona.", "common");
addMoment("Historia", "El Escupitajo de Rijkaard", 1990, "Polémica", "Famoso incidente entre Frank Rijkaard y Rudi Völler en el Mundial de Italia 90.", "common");
addMoment("Historia", "El Arbitraje de Al Ghandour", 2002, "Polémica", "Polémico arbitraje contra España en los cuartos de final del Mundial 2002.", "common");
addMoment("Historia", "El Gol de Escorpión", 1995, "Malabar", "El portero René Higuita despeja un balón en Wembley haciendo el salto del escorpión.", "epic");
addMoment("Historia", "La Rabona de Borghi", 1980, "Malabar", "Claudio Borghi popularizó el pase cruzando las piernas para sorprender defensas.", "common");
addMoment("Historia", "El Cabezazo de Zidane", 2006, "Polémica", "La agresión de Zinedine Zidane a Materazzi en su último partido como profesional.", "rare");
addMoment("Historia", "VAR y el Fuera de Juego", 2022, "Tecnología", "Introducción del fuera de juego semiautomatizado mediante sensores en el balón.", "common");

// ==================== MUNDIALES (40 CARDS) ====================
addMoment("Mundiales", "Uruguay 1930", 1930, "Primer Mundial", "Uruguay organiza y gana el primer Mundial venciendo a Argentina 4-2 en la final.", "legendary");
addMoment("Mundiales", "El Maracanazo", 1950, "Batacazo", "Uruguay vence 2-1 a Brasil en su propio estadio con gol de Ghiggia enmudeciendo al país.", "legendary");
addMoment("Mundiales", "El Milagro de Berna", 1954, "Batacazo", "Alemania Occidental vence 3-2 a la invencible Hungría de Puskás ganando su primer Mundial.", "legendary");
addMoment("Mundiales", "La Mano de Dios", 1986, "Hito", "Maradona anota un gol con el puño cerrado simulando un cabezazo contra Inglaterra.", "legendary");
addMoment("Mundiales", "El Gol del Siglo", 1986, "Hito", "Maradona elude a 6 jugadores ingleses desde mitad de cancha anotando el gol más bello.", "legendary");
addMoment("Mundiales", "Pelé de 17 años", 1958, "Hito", "El joven Pelé asombra al mundo anotando un triplete en semis y un doblete en la final.", "epic");
addMoment("Mundiales", "La Italia del 34 y 38", 1938, "Bicampeón", "Vittorio Pozzo dirige a Italia para lograr el primer bicampeonato seguido de la historia.", "epic");
addMoment("Mundiales", "El Gol de Iniesta", 2010, "Hito", "Andrés Iniesta anota el gol del triunfo en el minuto 116 ante Holanda dando el primer título a España.", "epic");
addMoment("Mundiales", "El 7-1 de Brasil", 2014, "Batacazo", "Alemania golea 7-1 al anfitrión Brasil en semifinales en la mayor humillación histórica.", "epic");
addMoment("Mundiales", "Francia Campeón 98", 1998, "Primer Título", "Francia gana su primer Mundial en casa goleando a Brasil 3-0 de la mano de Zidane.", "epic");
addMoment("Mundiales", "Qatar 2022", 2022, "Mundial Épico", "Considerada la mejor final de la historia. Messi levanta la Copa del Mundo.", "epic");
addMoment("Mundiales", "Récord de Klose", 2014, "Hito Goleador", "Miroslav Klose anota ante Brasil su gol 16 en Mundiales, superando a Ronaldo Nazário.", "rare");
addMoment("Mundiales", "El Gol de Maradona 94", 1994, "Polémica", "Maradona le grita su gol a la cámara con furia antes de dar positivo por dopaje.", "rare");
addMoment("Mundiales", "La Batalla de Santiago", 1962, "Polémica", "Violento partido entre Chile e Italia con expulsados, puñetazos e intervención policial.", "rare");
addMoment("Mundiales", "La Batalla de Núremberg", 2006, "Polémica", "Partido entre Portugal y Holanda con récord de tarjetas: 16 amarillas y 4 rojas.", "rare");
addMoment("Mundiales", "La Naranja Mecánica", 1974, "Fútbol Total", "La Holanda de Cruyff deslumbra con su fútbol total aunque pierde la final ante Alemania.", "epic");
addMoment("Mundiales", "El Récord de Roger Milla", 1994, "Hito", "El camerunés anota ante Rusia con 42 años y 39 días, siendo el más viejo en marcar.", "rare");
addMoment("Mundiales", "Cinco Goles de Salenko", 1994, "Hito", "El ruso Oleg Salenko anota 5 goles en un solo partido ante Camerún.", "rare");
addMoment("Mundiales", "Atajada de Gordon Banks", 1970, "Hito Portero", "Gordon Banks le hace a Pelé la que es calificada como 'la atajada del siglo'.", "epic");
addMoment("Mundiales", "La tapada del Dibu", 2022, "Hito Portero", "Emiliano Martínez ataja con la pierna izquierda en el 123' el mano a mano a Kolo Muani.", "epic");
addMoment("Mundiales", "El Penal de Baggio", 1994, "Tragedia", "Roberto Baggio vuela su penal sobre el travesaño coronando a Brasil campeón del mundo.", "rare");
addMoment("Mundiales", "El Pulpo Paul", 2010, "Curiosidad", "El pulpo que adivinó con 100% de efectividad todos los partidos de España en el Mundial.", "common");
addMoment("Mundiales", "Camerún vence a Argentina", 1990, "Sorpresa", "Los Leones Indomables derrotan 1-0 al campeón defensor de Maradona en el debut.", "common");
addMoment("Mundiales", "Senegal vence a Francia", 2002, "Sorpresa", "Debutante Senegal derrota al campeón reinante Francia en el partido inaugural.", "common");
addMoment("Mundiales", "El Mordisco de Suárez", 2014, "Polémica", "Luis Suárez muerde al defensor italiano Chiellini y es sancionado por meses por FIFA.", "rare");
addMoment("Mundiales", "El Récord de Cafú", 2002, "Hito", "Único jugador en disputar consecutivamente las finales de 1994, 1998 y 2002.", "rare");
addMoment("Mundiales", "El Gol de Götze", 2014, "Hito", "Mario Götze anota el gol del triunfo en el minuto 113 dando el cuarto título a Alemania.", "common");
addMoment("Mundiales", "Zidane y el Panenka", 2006, "Malabar", "Zidane le pica el penal a Buffon en la final del Mundial 2006 dando en el poste y entrando.", "epic");
addMoment("Mundiales", "La Bota de Oro de James", 2014, "Hito", "El colombiano James Rodríguez deslumbra y gana la bota de oro con 6 goles.", "rare");
addMoment("Mundiales", "La Batalla de Burdeos", 1938, "Polémica", "Partido extremadamente físico y violento entre Brasil y Checoslovaquia con lesionados graves.", "common");
addMoment("Mundiales", "Inglaterra 1966", 1966, "Campeón en Casa", "El único título de la selección de los tres leones de la mano de Bobby Moore.", "common");
addMoment("Mundiales", "Brasil de 1970", 1970, "Mejor Equipo", "La selección brasileña de Pelé, Tostão y Rivelino es catalogada como el mejor equipo de siempre.", "epic");
addMoment("Mundiales", "Gol de Grosso", 2006, "Hito", "Fabio Grosso anota en el 119' contra Alemania desatando la locura italiana hacia la final.", "common");
addMoment("Mundiales", "El Hat-trick de Rossi", 1982, "Hito", "Paolo Rossi anota tres goles contra el súper Brasil eliminándolo del Mundial.", "epic");
addMoment("Mundiales", "Corea del Sur Semifinal", 2002, "Hito", "La primera selección asiática en llegar a las semifinales de una Copa del Mundo.", "common");
addMoment("Mundiales", "Marruecos en Semifinales", 2022, "Hito", "Marruecos se convierte en la primera selección africana de la historia en llegar a semis.", "epic");
addMoment("Mundiales", "El Gol de Escopetazo", 1994, "Hito", "Haid Al-Owairan de Arabia Saudí dribla a toda Bélgica anotando un gol maradoniano.", "rare");
addMoment("Mundiales", "El Autogol de Andrés Escobar", 1994, "Tragedia", "La trágica eliminación de Colombia que llevó a la muerte del defensor colombiano.", "common");
addMoment("Mundiales", "Sudáfrica 2010", 2010, "Primer Mundial en África", "El Mundial de las Vuvuzelas y el himno Waka Waka de Shakira.", "common");
addMoment("Mundiales", "Mundial de Tres Países", 2026, "Futuro", "La primera Copa del Mundo coorganizada por tres países: EE.UU., México y Canadá.", "common");

// ==================== CHAMPIONS LEAGUE (40 CARDS) ====================
addMoment("Champions League", "Las 5 Copas de Di Stéfano", 1960, "Récord", "El Real Madrid gana las primeras 5 Copas de Europa de forma consecutiva liderado por la Saeta Rubia.", "legendary");
addMoment("Champions League", "El Milagro de Estambul", 2005, "Remontada", "El Liverpool remonta un 3-0 en el segundo tiempo contra el Milan ganando en penaltis.", "legendary");
addMoment("Champions League", "La Volea de Zidane", 2002, "Hito", "Zidane anota un golazo de volea con la pierna zurda en Hampden Park ganando la Novena.", "legendary");
addMoment("Champions League", "El Gol de Solskjær", 1999, "Remontada", "Manchester United da la vuelta al marcador en el descuento (91' y 93') ante el Bayern ganando el triplete.", "legendary");
addMoment("Champions League", "La Décima del Madrid", 2014, "Hito", "Sergio Ramos empata de cabeza en el 92:48 forzando la prórroga y ganando la ansiada Décima.", "legendary");
addMoment("Champions League", "El Triplete de Guardiola", 2009, "Hito", "El Barcelona de Lionel Messi vence al Manchester United de Cristiano en Roma ganando el triplete.", "epic");
addMoment("Champions League", "La Chilena de Cristiano", 2018, "Hito", "Cristiano Ronaldo anota una espectacular chilena ante la Juventus recibiendo aplausos del estadio rival.", "epic");
addMoment("Champions League", "La Chilena de Bale", 2018, "Hito", "Gareth Bale anota de chilena en la final de Kiev ante el Liverpool ganando la Decimotercera.", "epic");
addMoment("Champions League", "La Remontada del Barça", 2017, "Milagro", "El Barcelona remonta un 4-0 al PSG ganando 6-1 en el Camp Nou con gol agónico de Sergi Roberto.", "epic");
addMoment("Champions League", "El Oporto de Mourinho", 2004, "Sorpresa", "José Mourinho sorprende a Europa ganando la Champions League con un modesto Oporto.", "epic");
addMoment("Champions League", "La Chilena de Ronaldinho", 2005, "Hito", "Ronaldinho baila en la frontal del área y saca un disparo sin espacio anotando ante el Chelsea.", "rare");
addMoment("Champions League", "El Gol de Droga", 2012, "Milagro", "Didier Drogba empata en el 88' y anota el penal decisivo dando su primera Champions al Chelsea.", "epic");
addMoment("Champions League", "El Récord de Goles de CR7", 2014, "Récord", "Cristiano Ronaldo establece el récord de más goles en una sola edición de Champions con 17 goles.", "rare");
addMoment("Champions League", "Remontada del Liverpool", 2019, "Remontada", "El Liverpool golea 4-0 al Barcelona en Anfield remontando el 3-0 de la ida con córner rápido.", "epic");
addMoment("Champions League", "El Chelsea de Tuchel", 2021, "Hito", "Thomas Tuchel levanta la orejona con una zaga defensiva impenetrable superando al Manchester City.", "rare");
addMoment("Champions League", "La Chilena de Mandžukić", 2017, "Hito", "Mario Mandžukić anota un golazo de chilena en la final aunque no le bastó a la Juventus.", "common");
addMoment("Champions League", "El Ajax de 1995", 1995, "Fútbol Joven", "Louis van Gaal campeona de Europa con un Ajax lleno de jóvenes canteranos de oro.", "epic");
addMoment("Champions League", "La Volea de Robben", 2010, "Hito", "Arjen Robben anota una fantástica volea de córner ante el Manchester United en Old Trafford.", "rare");
addMoment("Champions League", "El Gol de Koeman", 1992, "Primer Título", "Ronald Koeman de libre directo da al Barcelona su primera Copa de Europa en Wembley.", "epic");
addMoment("Champions League", "Remontada del Madrid 2022", 2022, "Milagro", "Rodrygo anota dos goles en los minutos 90 y 91 remontando al City de Guardiola camino a la Catorce.", "epic");
addMoment("Champions League", "El Nottingham Forest", 1979, "Hazaña", "El club inglés gana dos Copas de Europa seguidas con Brian Clough tras ascender de segunda división.", "epic");
addMoment("Champions League", "La Atajada de Dudek", 2005, "Hito Portero", "Jerzy Dudek hace una increíble doble parada a Shevchenko a bocajarro en el minuto 118.", "rare");
addMoment("Champions League", "San Siro Mítico", 2001, "Final Histórica", "La final del Bayern e Valencia resuelta por tandas de penaltis con Kahn como héroe.", "common");
addMoment("Champions League", "El Triplete del Inter", 2010, "Hito", "Mourinho guía al Inter a derrotar al Bayern en Madrid logrando el primer triplete italiano.", "epic");
addMoment("Champions League", "El Gol de Iniesta en Stamford Bridge", 2009, "Hito", "Iniesta mete a Barcelona en la final con un 'Iniestazo' en el 93' silenciando al Chelsea.", "epic");
addMoment("Champions League", "Mönchengladbach Dinastía", 1977, "Dinastía", "La gran época dorada del club alemán que disputó el trono europeo al Liverpool.", "common");
addMoment("Champions League", "La Batalla del Old Trafford", 2003, "Final Italiana", "Milan y Juventus empatan sin goles en una final ultra táctica decidida por penaltis de Shevchenko.", "common");
addMoment("Champions League", "Los Tres de Raúl", 2000, "Hito", "Raúl corre desde mitad del campo y elude al arquero de Valencia sellando el título de la Octava.", "common");
addMoment("Champions League", "La Champions del Marsella", 1993, "Primer Título", "El único equipo francés en tener una Champions en sus vitrinas.", "common");
addMoment("Champions League", "El Milan de Sacchi", 1989, "Fútbol Perfecto", "Golea 4-0 al Steaua de Bucarest consolidándose como uno de los mejores de la historia.", "epic");
addMoment("Champions League", "El Gol de Messi de Cabeza", 2009, "Hito", "Lionel Messi anota elevándose por encima de Ferdinand ganando el duelo directo a CR7.", "rare");
addMoment("Champions League", "La Era de los Galácticos", 2002, "Hito", "El Real Madrid de Figo, Zidane, Raúl y Roberto Carlos gana la Novena.", "common");
addMoment("Champions League", "Héctor Cúper y el Valencia", 2001, "Tragedia", "El Valencia disputa dos finales de Champions consecutivas perdiendo ambas por milímetros.", "common");
addMoment("Champions League", "El Dortmund de 1997", 1997, "Hito", "Lars Ricken anota a los 16 segundos de ingresar a la cancha sellando el título ante la Juventus.", "rare");
addMoment("Champions League", "El Primer Gol de Mbappé", 2017, "Hito", "Un joven Mbappé de 18 años sorprende a Europa marcando goles seguidos con el Mónaco.", "common");
addMoment("Champions League", "La Lesión de Salah", 2018, "Polémica", "Sergio Ramos choca con Salah sacándolo del partido y condicionando la final de Kiev.", "common");
addMoment("Champions League", "La Juventus de Lippi", 1996, "Campeón", "El último título de Champions de la Vecchia Signora derrotando al Ajax en penaltis.", "epic");
addMoment("Champions League", "El Celtic de Lisboa", 1967, "Hazaña", "Los 'Lisbon Lions' ganan la Copa de Europa con jugadores todos nacidos a menos de 50km del estadio.", "epic");
addMoment("Champions League", "Steaua de Bucarest 1986", 1986, "Hazaña", "El arquero Helmuth Duckadam ataja los 4 penales del Barcelona en la tanda final coronando al Steaua.", "epic");
addMoment("Champions League", "El Primer Gol en Champions", 1992, "Hito", "Daniel Amokachi marca el primer gol en la historia bajo el formato oficial moderno de Champions.", "common");

// Write to cards_db.json
const destPath = path.join(__dirname, 'cards_db.json');
fs.writeFileSync(destPath, JSON.stringify(cards, null, 2));

console.log(`Generated ${cards.length} cards successfully!`);
