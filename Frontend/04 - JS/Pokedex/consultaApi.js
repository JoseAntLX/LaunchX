

const fetchPokemon = async () => {

    let nombre = document.getElementById('nombrep');
    let pokeInput = document.getElementById('pokeInput');
    let pokeName = pokeInput.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    let data = await fetch(url).then((res) => {
        if (res.status != "200") {
            limpiaDatos();
            pokeImage("./Img/pokemon-sad.gif");
            nombre.innerHTML = "No encontrado";
        }
        else {
            return res.json();
        }
    });

    if (data) {
        console.log(data);
        nombre.innerHTML = data.name;
        let pokeImg = data.sprites.other.dream_world.front_default;
        let pokeInfo = data.abilities;
        let pokeType = data.types;
        let pokeStadists = data.stats;
        let pokeMov = data.moves;
        pokeImage(pokeImg);
        pokeData(pokeInfo);
        dataTypes(pokeType);
        pokeStats(pokeStadists);
        pokeMoves(pokeMov);
    }
}

// Imagen
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("img-poke");

    // Condicional, si el pokemon no tiene foto
    url === null ? pokePhoto.src = "./Img/pokeball.png" : pokePhoto.src = url;

    pokePhoto.style.height = "70%";
    pokePhoto.style.objectFit = "cover";
    pokePhoto.style.top = "10%";
    pokePhoto.style.position = "absolute";
}

// Habilidades del pokemon
const pokeData = (abilities) => {
    const pokeAbilities = document.getElementById("abilities");
    const abilitiesName = abilities.map((item) => item.ability.name);
    pokeAbilities.innerHTML = abilitiesName;
}

// Tipo
const dataTypes = (types) => {
    const pokeType = document.getElementById('pokeType');
    const typesName = types.map((item) => item.type.name);
    pokeType.innerHTML = typesName;
}

// Estadísticas
const pokeStats = (stadistics) => {
    const pokeStat = document.getElementById('estadisticas');
    const statsName = stadistics.map((item) => item.stat.name + ": " + item.base_stat);
    pokeStat.innerHTML = statsName;
}

// Movimientos
const pokeMoves = (moves) => {
    const pokeMove = document.getElementById('pokeMovs');
    const movesName = moves.map((item) => item.move.name);
    pokeMove.innerHTML = movesName;
}


// Borrar los datos cuando se recargue
function limpiaDatos() {

    // Nombre 
    const nombre = document.getElementById('nombrep');
    nombre.innerHTML = "";

    // Habilidades
    const pokeAbilities = document.getElementById("abilities");
    pokeAbilities.innerHTML = "";

    // Imagen
    const pokePhoto = document.getElementById("img-poke");
    pokePhoto.src = "";

    // Tipo
    const pokeType = document.getElementById('pokeType');
    pokeType.innerHTML = "";

    // Estadisticas
    const pokeStats = document.getElementById('estadisticas');
    pokeStats.innerHTML = "";

    // Movimientos
    const pokeMovs = document.getElementById('pokeMovs');
    pokeMovs.innerHTML = "";
    pokeMovs.style.backgroundColor
}

// Cambiar el color cuando se de click
function clicB(obj) {
    obj.style.color = "#3688f9";
    obj.style.backgroundColor = "#3688f9";

    setTimeout(() => {
        obj.style.color = "white";
        obj.style.backgroundColor = "#222222";
    }, 50);
}

// Deshabilitar el boton si no se ha ingresado nada
function validarInput() {
    document.getElementById('btn-buscar').disabled = !document.getElementById('pokeInput').value.length;
}

// cuando se pulse enter en el input de click al boton
function llamaBoton() {
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          document.getElementById("btn-buscar").click();
        }
      });
}